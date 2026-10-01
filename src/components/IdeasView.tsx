import { useEffect, useMemo, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Move,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { Philosopher } from "../data/types";
import { activeAt, formatYear, LANES, laneFor, lifeDates } from "../lib/atlas";
import type { ViewProps } from "./viewTypes";
import "./IdeasView.css";

type Vec3 = [number, number, number];
type Lens = keyof Philosopher["coordinates"];
type Camera = { yaw: number; pitch: number; zoom: number };
type Projected = { x: number; y: number; depth: number; perspective: number };
type PointChoice = { ids: string[]; x: number; y: number; coincident: boolean };
const DEFAULT_CAMERA: Camera = { yaw: -0.61, pitch: 0.38, zoom: 1 };
const WIDTH = 960;
const HEIGHT = 540;
const AXES: {
  id: Lens;
  name: string;
  low: string;
  high: string;
  direction: Vec3;
}[] = [
  {
    id: "reality",
    name: "Reality",
    low: "Matter",
    high: "Mind",
    direction: [1, 0, 0],
  },
  {
    id: "knowledge",
    name: "Knowledge",
    low: "Experience",
    high: "Reason",
    direction: [0, 1, 0],
  },
  {
    id: "ethics",
    name: "Ethics",
    low: "Personal agency",
    high: "Social relations",
    direction: [0, 0, 1],
  },
];
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
const vector = (p: Philosopher): Vec3 => [
  p.coordinates.reality,
  p.coordinates.knowledge,
  p.coordinates.ethics,
];
const scaleVector = (v: Vec3, amount: number): Vec3 => [
  v[0] * amount,
  v[1] * amount,
  v[2] * amount,
];

function project(v: Vec3, camera: Camera): Projected {
  const x = v[0] * Math.cos(camera.yaw) + v[2] * Math.sin(camera.yaw);
  const z = -v[0] * Math.sin(camera.yaw) + v[2] * Math.cos(camera.yaw);
  const y = v[1] * Math.cos(camera.pitch) - z * Math.sin(camera.pitch);
  const depth = v[1] * Math.sin(camera.pitch) + z * Math.cos(camera.pitch);
  const perspective = 5.5 / (5.5 - depth);
  const size = 137 * camera.zoom * perspective;
  return {
    x: WIDTH / 2 + x * size,
    y: HEIGHT / 2 - y * size,
    depth,
    perspective,
  };
}

const CORNERS: Vec3[] = [-1, 1].flatMap((x) =>
  [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as Vec3)),
);
const EDGES = CORNERS.flatMap((a, i) =>
  CORNERS.slice(i + 1)
    .filter((b) => a.filter((n, k) => n !== b[k]).length === 1)
    .map((b) => [a, b] as [Vec3, Vec3]),
);
const GRID: [Vec3, Vec3][] = [-0.5, 0, 0.5].flatMap(
  (n) =>
    [
      [
        [-1, -1, n],
        [1, -1, n],
      ],
      [
        [n, -1, -1],
        [n, -1, 1],
      ],
    ] as [Vec3, Vec3][],
);

function lensPosition(p: Philosopher, lens: Lens) {
  const value = p.coordinates[lens];
  const axis = AXES.find((a) => a.id === lens)!;
  return Math.abs(value) < 0.17
    ? "Across both perspectives"
    : `Leans toward ${value < 0 ? axis.low.toLowerCase() : axis.high.toLowerCase()}`;
}

export default function IdeasView({
  philosophers,
  selectedId,
  year,
  onSelect,
}: ViewProps) {
  const [camera, setCamera] = useState<Camera>(DEFAULT_CAMERA);
  const [preset, setPreset] = useState("3D");
  const [atTime, setAtTime] = useState(false);
  const [allLabels, setAllLabels] = useState(false);
  const [colorMode, setColorMode] = useState<"question" | "reality">(
    "question",
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [compact, setCompact] = useState(false);
  const [comparisonId, setComparisonId] = useState("");
  const [pointChoice, setPointChoice] = useState<PointChoice | null>(null);
  const drag = useRef<{
    x: number;
    y: number;
    yaw: number;
    pitch: number;
    moved: boolean;
  } | null>(null);
  const canvas = useRef<SVGSVGElement>(null);
  const chooser = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const pointerPosition = useRef<{ x: number; y: number } | null>(null);
  const visible = useMemo(
    () => philosophers.filter((p) => !atTime || activeAt(p, year)),
    [philosophers, atTime, year],
  );
  const projected = useMemo(
    () =>
      visible
        .map((p) => ({ p, ...project(vector(p), camera) }))
        .sort((a, b) => a.depth - b.depth),
    [visible, camera],
  );
  const selected = philosophers.find((p) => p.id === selectedId);
  const hovered = philosophers.find((p) => p.id === hoveredId);
  const first = selected ?? philosophers[0];
  const second =
    philosophers.find((p) => p.id === comparisonId && p.id !== first?.id) ??
    philosophers.find((p) => p.id !== first?.id);
  const tooltipPoint = projected.find((point) => point.p.id === hoveredId);
  const tooltipCluster = tooltipPoint
    ? projected.filter(
        (point) =>
          Math.hypot(point.x - tooltipPoint.x, point.y - tooltipPoint.y) <
          0.001,
      )
    : [];
  const pointColor = (p: Philosopher) =>
    colorMode === "question"
      ? laneFor(p.questionLane).color
      : `hsl(${222 + (p.coordinates.reality + 1) * 34}, 38%, 48%)`;

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const zoom = (event: WheelEvent) => {
      event.preventDefault();
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1);
      setCamera((c) => ({
        ...c,
        zoom: clamp(
          c.zoom * Math.exp(-delta * (event.ctrlKey ? 0.008 : 0.001)),
          0.65,
          1.5,
        ),
      }));
    };
    element.addEventListener("wheel", zoom, { passive: false });
    const observer = new ResizeObserver((entries) =>
      setCompact(entries[0].contentRect.width < 560),
    );
    observer.observe(element);
    return () => {
      element.removeEventListener("wheel", zoom);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (pointChoice)
      chooser.current
        ?.querySelector<HTMLButtonElement>("[data-choice-id]")
        ?.focus();
  }, [pointChoice]);

  function nearestPoints(clientX: number, clientY: number) {
    const matrix = canvas.current?.getScreenCTM();
    if (!matrix) return [];
    const position = new DOMPoint(clientX, clientY).matrixTransform(
      matrix.inverse(),
    );
    const screenScale = Math.hypot(matrix.a, matrix.b);
    return projected
      .map((point) => ({
        ...point,
        distance:
          Math.hypot(position.x - point.x, position.y - point.y) * screenScale,
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  function focusPoint(id: string) {
    canvas.current
      ?.querySelector<SVGGElement>(
        `.is-point[data-thinker-id="${CSS.escape(id)}"]`,
      )
      ?.focus({ preventScroll: true });
  }

  function selectNearest(event: ReactMouseEvent<SVGSVGElement>) {
    if (suppressClick.current) {
      pointerPosition.current = null;
      return;
    }
    // Assistive technology can activate a point without a physical pointer location.
    if (event.detail === 0 && event.clientX === 0 && event.clientY === 0) {
      const id = (event.target as Element)
        .closest("[data-thinker-id]")
        ?.getAttribute("data-thinker-id");
      if (id) onSelect(id);
      return;
    }
    // Mouse click coordinates are integer-rounded in Chromium. Pointer events
    // retain the subpixel location, which matters for tightly spaced mobile dots.
    const position = pointerPosition.current ?? {
      x: event.clientX,
      y: event.clientY,
    };
    pointerPosition.current = null;
    const nearest = nearestPoints(position.x, position.y);
    const firstPoint = nearest[0];
    setPointChoice(null);
    if (!firstPoint || firstPoint.distance > (compact ? 25 : 14)) return;
    const coincident = nearest.filter(
      (point) =>
        Math.hypot(point.x - firstPoint.x, point.y - firstPoint.y) < 0.001,
    );
    // A unique dot center wins even when nearby touch targets overlap. Off-center
    // touches that are equally near several points offer explicit named choices.
    const ambiguous =
      firstPoint.distance > 0.15
        ? nearest.filter(
            (point) =>
              point.distance - firstPoint.distance < 2 &&
              point.distance < (compact ? 25 : 14),
          )
        : [];
    const choices = coincident.length > 1 ? coincident : ambiguous;
    if (choices.length > 1) {
      const stage = canvas.current?.parentElement?.getBoundingClientRect();
      if (!stage) return;
      setHoveredId(null);
      setPointChoice({
        ids: choices.map((point) => point.p.id),
        x: clamp(position.x - stage.left, 125, stage.width - 125),
        y: clamp(position.y - stage.top + 14, 42, stage.height - 150),
        coincident: coincident.length > 1,
      });
    } else {
      onSelect(firstPoint.p.id);
      focusPoint(firstPoint.p.id);
    }
  }

  function setView(name: string, yaw: number, pitch: number) {
    setPointChoice(null);
    setPreset(name);
    setCamera({ yaw, pitch, zoom: 1 });
  }
  function rotate(yaw: number, pitch: number) {
    setPointChoice(null);
    setPreset("Custom");
    setCamera((c) => ({
      ...c,
      yaw: c.yaw + yaw,
      pitch: clamp(c.pitch + pitch, -1.48, 1.48),
    }));
  }
  function startDrag(event: ReactPointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      yaw: camera.yaw,
      pitch: camera.pitch,
      moved: false,
    };
    suppressClick.current = false;
    pointerPosition.current = { x: event.clientX, y: event.clientY };
    setPointChoice(null);
  }
  function moveDrag(event: ReactPointerEvent<SVGSVGElement>) {
    if (!drag.current) {
      const nearest = nearestPoints(event.clientX, event.clientY)[0];
      setHoveredId(nearest && nearest.distance < 12 ? nearest.p.id : null);
      return;
    }
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      if (!event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.setPointerCapture(event.pointerId);
      drag.current.moved = true;
      setDragging(true);
      setHoveredId(null);
      setPreset("Custom");
      setCamera((c) => ({
        ...c,
        yaw: drag.current!.yaw + dx * 0.008,
        pitch: clamp(drag.current!.pitch + dy * 0.008, -1.48, 1.48),
      }));
    }
  }
  function endDrag(event: ReactPointerEvent<SVGSVGElement>) {
    pointerPosition.current = { x: event.clientX, y: event.clientY };
    suppressClick.current = drag.current?.moved ?? false;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  const occupied: { x: number; y: number }[] = [];
  const labelIds = new Set<string>();
  const important = projected.filter(
    (p) =>
      p.p.id === selectedId ||
      p.p.id === hoveredId ||
      (comparing && p.p.id === second?.id),
  );
  for (const p of important) {
    labelIds.add(p.p.id);
    occupied.push(p);
  }
  if (allLabels) {
    for (const p of [...projected].reverse()) {
      if (
        !occupied.some(
          (o) => Math.abs(o.x - p.x) < 110 && Math.abs(o.y - p.y) < 24,
        )
      ) {
        labelIds.add(p.p.id);
        occupied.push(p);
      }
    }
  }
  const captionBoxes = AXES.flatMap((axis) => {
    const a = project(scaleVector(axis.direction, -1.23), camera);
    const b = project(scaleVector(axis.direction, 1.23), camera);
    if (Math.hypot(a.x - b.x, a.y - b.y) < 35) return [];
    return [-1, 1].map((side) => {
      const position = project(
        scaleVector(axis.direction, side * 1.44),
        camera,
      );
      const x = clamp(position.x, 85, WIDTH - 85);
      const y = clamp(position.y, 22, HEIGHT - 22);
      const halfWidth =
        Math.max(
          axis.name.length * (compact ? 8 : 4),
          (side < 0 ? axis.low : axis.high).length * (compact ? 11 : 6),
        ) /
          2 +
        10;
      return {
        left: x - halfWidth,
        right: x + halfWidth,
        top: y - 26,
        bottom: y + 14,
      };
    });
  });
  const labelPlacements = new Map<
    string,
    { x: number; y: number; anchor: "start" | "end" | "middle" }
  >();
  for (const point of [
    ...important,
    ...projected.filter((p) => !important.includes(p)),
  ]) {
    if (!labelIds.has(point.p.id)) continue;
    const radius = 5.5 * point.perspective;
    const width = point.p.name.length * (compact ? 8.5 : 6);
    const candidates: {
      x: number;
      y: number;
      anchor: "start" | "end" | "middle";
    }[] = [
      { x: point.x + radius + 10, y: point.y + 4, anchor: "start" },
      { x: point.x - radius - 10, y: point.y + 4, anchor: "end" },
      { x: point.x, y: point.y - radius - 12, anchor: "middle" },
      { x: point.x, y: point.y + radius + 21, anchor: "middle" },
    ];
    const scores = candidates.map((candidate) => {
      const left =
        candidate.x -
        (candidate.anchor === "end"
          ? width
          : candidate.anchor === "middle"
            ? width / 2
            : 0);
      const box = {
        left,
        right: left + width,
        top: candidate.y - 12,
        bottom: candidate.y + 4,
      };
      const overlaps = captionBoxes.filter(
        (other) =>
          box.left < other.right &&
          box.right > other.left &&
          box.top < other.bottom &&
          box.bottom > other.top,
      ).length;
      return {
        candidate,
        box,
        score: overlaps + (box.left < 10 || box.right > WIDTH - 10 ? 10 : 0),
      };
    });
    const choice = scores.reduce((best, next) =>
      next.score < best.score ? next : best,
    );
    labelPlacements.set(point.p.id, choice.candidate);
    captionBoxes.push(choice.box);
  }

  return (
    <section
      className="is-view"
      aria-label="Three-dimensional philosophy idea space"
    >
      <div className="is-heading">
        <div>
          <div className="is-eyebrow">AN ATLAS OF IDEAS</div>
          <h2>Where ideas meet.</h2>
          <p>
            Explore philosophical affinities through three interpretive lenses.
          </p>
        </div>
        <button
          className={`is-compare-button ${comparing ? "is-active" : ""}`}
          type="button"
          aria-expanded={comparing}
          disabled={philosophers.length < 2}
          title={
            philosophers.length < 2
              ? "Show at least two thinkers to compare perspectives"
              : undefined
          }
          onClick={() => setComparing(!comparing)}
        >
          <span className="is-two-points" aria-hidden="true">
            ● <span>●</span>
          </span>{" "}
          Compare ideas
        </button>
      </div>

      <div className="is-toolbar">
        <div className="is-presets" aria-label="Camera views">
          <button
            className={preset === "3D" ? "is-active" : ""}
            aria-pressed={preset === "3D"}
            onClick={() =>
              setView("3D", DEFAULT_CAMERA.yaw, DEFAULT_CAMERA.pitch)
            }
          >
            3D
          </button>
          <button
            className={preset === "Reality × knowledge" ? "is-active" : ""}
            aria-pressed={preset === "Reality × knowledge"}
            onClick={() => setView("Reality × knowledge", 0, 0)}
          >
            Reality × knowledge
          </button>
          <button
            className={preset === "Knowledge × ethics" ? "is-active" : ""}
            aria-pressed={preset === "Knowledge × ethics"}
            onClick={() => setView("Knowledge × ethics", -Math.PI / 2, 0)}
          >
            Knowledge × ethics
          </button>
        </div>
        <label className="is-time-toggle">
          <input
            type="checkbox"
            checked={atTime}
            onChange={(event) => setAtTime(event.target.checked)}
          />{" "}
          At this time <span>{formatYear(year)}</span>
        </label>
      </div>

      {selectedId &&
        (!selected || !visible.some((p) => p.id === selectedId)) && (
          <div className="is-hidden-selection" role="status">
            <span className="is-note-mark">i</span>
            <span>
              {selected
                ? `${selected.name} is outside the selected year, ${formatYear(year)}, and is hidden from this plot.`
                : "The selected thinker is outside the current filters and is hidden from this plot."}{" "}
              {selected && (
                <button onClick={() => setAtTime(false)}>Show all years</button>
              )}
            </span>
          </div>
        )}

      <div className="is-stage">
        <div className="is-stage-top">
          <span>
            <i /> {visible.length} thinkers in view
          </span>
          <label>
            <input
              type="checkbox"
              checked={allLabels}
              onChange={(event) => setAllLabels(event.target.checked)}
            />{" "}
            Show names
          </label>
        </div>
        <svg
          ref={canvas}
          className={`is-canvas ${compact ? "is-compact" : ""} ${dragging ? "is-dragging" : ""}`}
          viewBox={compact ? `180 0 600 ${HEIGHT}` : `0 0 ${WIDTH} ${HEIGHT}`}
          role="group"
          aria-label="Interactive 3D Cartesian plot. Drag to orbit, use arrow keys to rotate, and select a philosopher to read their ideas."
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => {
            if (!drag.current) setHoveredId(null);
          }}
          onClick={selectNearest}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            const turns: Record<string, [number, number]> = {
              ArrowLeft: [-0.12, 0],
              ArrowRight: [0.12, 0],
              ArrowUp: [0, -0.12],
              ArrowDown: [0, 0.12],
            };
            if (turns[event.key]) {
              event.preventDefault();
              rotate(...turns[event.key]);
            } else if (event.key === "+" || event.key === "=") {
              event.preventDefault();
              setCamera((c) => ({
                ...c,
                zoom: clamp(c.zoom + 0.1, 0.65, 1.5),
              }));
            } else if (event.key === "-") {
              event.preventDefault();
              setCamera((c) => ({
                ...c,
                zoom: clamp(c.zoom - 0.1, 0.65, 1.5),
              }));
            }
          }}
        >
          <defs>
            <radialGradient id="is-space-background">
              <stop offset="0%" stopColor="#f3f0e9" />
              <stop offset="100%" stopColor="#fbfaf6" />
            </radialGradient>
          </defs>
          <rect
            width={WIDTH}
            height={HEIGHT}
            fill="url(#is-space-background)"
          />
          <g className="is-grid" aria-hidden="true">
            {GRID.map(([a, b], i) => {
              const start = project(a, camera);
              const end = project(b, camera);
              return (
                <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
              );
            })}
          </g>
          <g className="is-cube" aria-hidden="true">
            {EDGES.map(([a, b], i) => {
              const start = project(a, camera);
              const end = project(b, camera);
              return (
                <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
              );
            })}
          </g>
          {AXES.map((axis) => {
            const a = project(scaleVector(axis.direction, -1.23), camera);
            const b = project(scaleVector(axis.direction, 1.23), camera);
            const low = project(scaleVector(axis.direction, -1.44), camera);
            const high = project(scaleVector(axis.direction, 1.44), camera);
            // The third axis is edge-on in a two-axis preset; its caption remains in the lens key below.
            const edgeOn = Math.hypot(a.x - b.x, a.y - b.y) < 35;
            return (
              <g
                className={`is-axis is-axis-${axis.id}`}
                key={axis.id}
                aria-hidden="true"
              >
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                <circle cx={a.x} cy={a.y} r="2.5" />
                <circle cx={b.x} cy={b.y} r="2.5" />
                {!edgeOn && (
                  <>
                    <text
                      x={clamp(low.x, 85, WIDTH - 85)}
                      y={clamp(low.y, 22, HEIGHT - 22)}
                      textAnchor="middle"
                    >
                      <tspan
                        className="is-axis-name"
                        x={clamp(low.x, 85, WIDTH - 85)}
                        dy="-10"
                      >
                        {axis.name.toUpperCase()}
                      </tspan>
                      <tspan x={clamp(low.x, 85, WIDTH - 85)} dy="18">
                        {axis.low}
                      </tspan>
                    </text>
                    <text
                      x={clamp(high.x, 85, WIDTH - 85)}
                      y={clamp(high.y, 22, HEIGHT - 22)}
                      textAnchor="middle"
                    >
                      <tspan
                        className="is-axis-name"
                        x={clamp(high.x, 85, WIDTH - 85)}
                        dy="-10"
                      >
                        {axis.name.toUpperCase()}
                      </tspan>
                      <tspan x={clamp(high.x, 85, WIDTH - 85)} dy="18">
                        {axis.high}
                      </tspan>
                    </text>
                  </>
                )}
              </g>
            );
          })}
          {comparing &&
            first &&
            second &&
            visible.some((p) => p.id === first.id) &&
            visible.some((p) => p.id === second.id) &&
            (() => {
              const a = project(vector(first), camera);
              const b = project(vector(second), camera);
              return (
                <line
                  className="is-comparison-line"
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                />
              );
            })()}
          {projected.map((point) => {
            const { p, x, y, perspective, depth } = point;
            const active = p.id === selectedId;
            const paired = comparing && p.id === second?.id;
            const radius = 5.5 * perspective;
            const cluster = projected.filter(
              (other) => Math.hypot(other.x - x, other.y - y) < 0.001,
            );
            const marksCluster =
              cluster.length > 1 && cluster[cluster.length - 1].p.id === p.id;
            return (
              <g
                className={`is-point ${active ? "is-selected" : ""}`}
                key={p.id}
                role="button"
                tabIndex={0}
                data-thinker-id={p.id}
                aria-label={`${p.name}, ${laneFor(p.questionLane).label}. ${p.coreIdea}`}
                aria-pressed={active}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setPointChoice(null);
                    onSelect(p.id);
                  }
                }}
                onFocus={() => setHoveredId(p.id)}
                onBlur={() => setHoveredId(null)}
              >
                <title>
                  {p.name} · {laneFor(p.questionLane).label}
                </title>
                <circle
                  className="is-hit-area"
                  cx={x}
                  cy={y}
                  r={Math.max(compact ? 22 : 13, radius + 5)}
                />
                {(active || paired || p.id === hoveredId) && (
                  <circle
                    className={
                      paired && !active ? "is-paired-ring" : "is-selection-ring"
                    }
                    cx={x}
                    cy={y}
                    r={radius + 5}
                    stroke={pointColor(p)}
                  />
                )}
                <circle
                  className="is-point-dot"
                  data-thinker-id={p.id}
                  data-testid="idea-point"
                  cx={x}
                  cy={y}
                  r={active ? radius + 1 : radius}
                  fill={pointColor(p)}
                  opacity={
                    active || paired || p.id === hoveredId
                      ? 1
                      : clamp(0.74 + depth * 0.1, 0.55, 0.96)
                  }
                />
                {marksCluster && (
                  <g className="is-cluster-marker" aria-hidden="true">
                    <circle cx={x} cy={y} r={radius + 3} />
                    <text x={x + radius + 4} y={y - radius - 2}>
                      {cluster.length}
                    </text>
                  </g>
                )}
                {labelPlacements.has(p.id) && (
                  <text
                    className={`is-point-label ${active ? "is-selected-label" : ""}`}
                    x={labelPlacements.get(p.id)!.x}
                    y={labelPlacements.get(p.id)!.y}
                    textAnchor={labelPlacements.get(p.id)!.anchor}
                  >
                    {p.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {pointChoice && (
          <div
            className="is-point-chooser"
            ref={chooser}
            role="dialog"
            aria-label="Choose a thinker at this position"
            style={{ left: pointChoice.x, top: pointChoice.y }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setPointChoice(null);
                canvas.current?.focus();
              }
            }}
          >
            <div className="is-chooser-heading">
              <strong>
                {pointChoice.coincident
                  ? "A shared position"
                  : "A few nearby thinkers"}
              </strong>
              <button
                aria-label="Close thinker choices"
                onClick={() => {
                  setPointChoice(null);
                  canvas.current?.focus();
                }}
              >
                <X size={13} />
              </button>
            </div>
            <p>
              {pointChoice.coincident
                ? "These thinkers overlap in this projection. Choose one to explore."
                : "Choose the thinker you meant to explore."}
            </p>
            <div>
              {pointChoice.ids.map((id) => {
                const p = philosophers.find((person) => person.id === id)!;
                return (
                  <button
                    key={id}
                    data-choice-id={id}
                    onClick={() => {
                      onSelect(id);
                      setPointChoice(null);
                      focusPoint(id);
                    }}
                  >
                    <i style={{ background: pointColor(p) }} />
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {laneFor(p.questionLane).label} · {lifeDates(p)}
                      </small>
                    </span>
                    <ArrowUpRight size={12} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {visible.length === 0 && (
          <div className="is-empty">
            <strong>
              No thinkers alive in {formatYear(year)} in this selection.
            </strong>
            <p>Move through time, or explore the full idea space.</p>
            <button onClick={() => setAtTime(false)}>Show all thinkers</button>
          </div>
        )}
        {hovered && tooltipPoint && !dragging && !pointChoice && (
          <div
            className="is-tooltip"
            style={{
              left: `${clamp(((tooltipPoint.x - (compact ? 180 : 0)) / (compact ? 600 : WIDTH)) * 100, compact ? 30 : 18, compact ? 70 : 78)}%`,
              top: `${clamp((tooltipPoint.y / HEIGHT) * 100 + 8, 15, compact ? 37 : 64)}%`,
            }}
            aria-hidden="true"
          >
            <span>
              {tooltipCluster.length > 1
                ? "Shared position"
                : laneFor(hovered.questionLane).label}
            </span>
            <strong>
              {tooltipCluster.length > 1
                ? `${tooltipCluster.length} thinkers share this position`
                : hovered.name}
            </strong>
            <small>
              {tooltipCluster.length > 1
                ? tooltipCluster.map((point) => point.p.name).join(" · ")
                : lifeDates(hovered)}
            </small>
            <p>
              {tooltipCluster.length > 1
                ? "Their editorial positions overlap in this projection. Click to choose a thinker."
                : hovered.coreIdea}
            </p>
            <em>
              {tooltipCluster.length > 1
                ? "Choose a thinker"
                : "Click to explore this thinker"}{" "}
              <ArrowUpRight size={12} />
            </em>
          </div>
        )}
        <div className="is-stage-bottom">
          <span>
            <Move size={13} /> Drag to orbit{" "}
            <span className="is-help-divider">·</span> Scroll to zoom
          </span>
          <div className="is-camera-controls">
            <button
              onClick={() => rotate(-0.2, 0)}
              aria-label="Rotate view left"
              title="Rotate left"
            >
              <ArrowDownLeft size={15} />
            </button>
            <button
              onClick={() => rotate(0.2, 0)}
              aria-label="Rotate view right"
              title="Rotate right"
            >
              <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() =>
                setCamera((c) => ({
                  ...c,
                  zoom: clamp(c.zoom - 0.1, 0.65, 1.5),
                }))
              }
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() =>
                setCamera((c) => ({
                  ...c,
                  zoom: clamp(c.zoom + 0.1, 0.65, 1.5),
                }))
              }
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() =>
                setView("3D", DEFAULT_CAMERA.yaw, DEFAULT_CAMERA.pitch)
              }
              aria-label="Reset 3D view"
              title="Reset view"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="is-legend">
        <div
          className="is-lane-key"
          aria-label="Colors represent philosophical questions"
        >
          {colorMode === "question" ? (
            LANES.map((lane) => (
              <span key={lane.id}>
                <i style={{ background: lane.color }} />
                {lane.label}
              </span>
            ))
          ) : (
            <span className="is-gradient-key">
              <i /> Matter <span>↔</span> Mind
            </span>
          )}
        </div>
        <label className="is-color-select">
          Color by{" "}
          <select
            aria-label="Color points by"
            value={colorMode}
            onChange={(event) =>
              setColorMode(event.target.value as "question" | "reality")
            }
          >
            <option value="question">Question</option>
            <option value="reality">Reality lens</option>
          </select>
          <ChevronDown size={12} />
        </label>
      </div>

      <div className="is-editorial-note">
        <span className="is-note-mark">i</span>
        <p>
          <strong>A map for thinking, not a measure of truth.</strong> Positions
          are editorial interpretations, not scores or settled classifications.
          The ethics lens traces personal agency to social relations; it does
          not rank moral value. Nearby points may share a lens while disagreeing
          profoundly. Numbered dots contain multiple thinkers; click to choose.
        </p>
      </div>

      {selected && !comparing && (
        <div className="is-selected-context">
          <span>
            <i style={{ background: pointColor(selected) }} />
            <strong>{selected.name}</strong> · interpreting this position
          </span>
          <details className="is-position-reasoning" key={selected.id}>
            <summary>
              Why this position? <ChevronDown size={13} />
            </summary>
            <div>
              {AXES.map((axis) => (
                <article key={axis.id}>
                  <div>
                    <strong>{axis.name}</strong>
                    <span>
                      {axis.low} ↔ {axis.high}
                    </span>
                  </div>
                  <p>{selected.coordinateRationale[axis.id]}</p>
                </article>
              ))}
              <p className="is-reasoning-footnote">
                These editorial readings simplify a complex body of thought.
                Read the works and reference sources for context.
              </p>
            </div>
          </details>
          <button
            disabled={philosophers.length < 2}
            onClick={() => setComparing(true)}
          >
            Compare perspectives <ArrowUpRight size={14} />
          </button>
        </div>
      )}

      {comparing && !second && (
        <div className="is-editorial-note">
          <p>
            Show at least two thinkers in your filters to compare their
            perspectives.
          </p>
        </div>
      )}

      {comparing && first && second && (
        <div
          className="is-comparison"
          role="region"
          aria-label="Compare philosophical perspectives"
        >
          <div className="is-comparison-heading">
            <div>
              <div className="is-eyebrow">READ THE DIFFERENCES</div>
              <h3>Two thinkers, three lenses.</h3>
            </div>
            <button
              onClick={() => setComparing(false)}
              aria-label="Close comparison"
            >
              Close
            </button>
          </div>
          <div className="is-comparison-pickers">
            <label>
              <span>First thinker</span>
              <select
                aria-label="First comparison thinker"
                value={first.id}
                onChange={(event) => onSelect(event.target.value)}
              >
                {philosophers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <span className="is-versus">↔</span>
            <label>
              <span>Second thinker</span>
              <select
                aria-label="Second comparison thinker"
                value={second.id}
                onChange={(event) => setComparisonId(event.target.value)}
              >
                {philosophers
                  .filter((p) => p.id !== first.id)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          {AXES.map((axis) => (
            <div className="is-comparison-row" key={axis.id}>
              <div className="is-comparison-lens">
                <span>{axis.name}</span>
                <small>
                  {axis.low} ↔ {axis.high}
                </small>
              </div>
              <article>
                <h4>{first.name}</h4>
                <span className="is-lens-position">
                  <Check size={11} /> {lensPosition(first, axis.id)}
                </span>
                <p>{first.coordinateRationale[axis.id]}</p>
              </article>
              <article>
                <h4>{second.name}</h4>
                <span className="is-lens-position">
                  <Check size={11} /> {lensPosition(second, axis.id)}
                </span>
                <p>{second.coordinateRationale[axis.id]}</p>
              </article>
            </div>
          ))}
          <p className="is-comparison-footnote">
            These are qualitative readings. Proximity in the plot is not
            evidence of influence, agreement, or historical contact.
          </p>
        </div>
      )}
    </section>
  );
}

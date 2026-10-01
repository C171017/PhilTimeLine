import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Crosshair,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import type { Philosopher, HistoricalEvent, Work } from "../data/types";
import {
  LANES,
  MIN_YEAR,
  MAX_YEAR,
  formatYear,
  focusYear,
  lifeDates,
  endYearFor,
} from "../lib/atlas";
import type { ViewProps } from "./viewTypes";
import "./TimelineView.css";

type WindowRange = { start: number; end: number };
type Placement = { philosopher: Philosopher; y: number };
type Influence = {
  from: Philosopher;
  to: Philosopher;
  note: string;
  url: string;
};
type Popup =
  | { kind: "event"; event: HistoricalEvent }
  | { kind: "influence"; edge: Influence }
  | { kind: "works"; philosopher: Philosopher; works: Work[] };
const HISTORY = MAX_YEAR - MIN_YEAR;
const MIN_SPAN = 65;
const ERAS = [
  { start: -650, end: 500, name: "ANTIQUITY" },
  { start: 500, end: 1400, name: "MEDIEVAL WORLDS" },
  { start: 1400, end: 1650, name: "RENAISSANCE" },
  { start: 1650, end: 1800, name: "ENLIGHTENMENT" },
  { start: 1800, end: 1900, name: "19TH CENTURY" },
  { start: 1900, end: 2026, name: "MODERN & CONTEMPORARY" },
];

function constrain(start: number, span: number): WindowRange {
  const safeSpan = Math.max(MIN_SPAN, Math.min(HISTORY, span));
  const safeStart = Math.max(MIN_YEAR, Math.min(MAX_YEAR - safeSpan, start));
  return { start: safeStart, end: safeStart + safeSpan };
}
function activate(event: KeyboardEvent, action: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.stopPropagation();
    action();
  }
}

export default function TimelineView({
  philosophers,
  events,
  selectedId,
  year,
  onSelect,
  onYearChange,
}: ViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(1000);
  const [viewport, setViewport] = useState({ height: 0, immersive: false });
  const [range, setRange] = useState<WindowRange>({ start: 1450, end: 2026 });
  const [showEvents, setShowEvents] = useState(true);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [dragging, setDragging] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drag = useRef<{
    mode: "pan" | "year";
    x: number;
    range: WindowRange;
    moved: boolean;
  } | null>(null);
  const pointers = useRef(new Map<number, number>());
  const pinch = useRef<{
    distance: number;
    range: WindowRange;
    anchor: number;
  } | null>(null);
  const left = width < 650 ? 99 : 145;
  const right = width - 25;
  const plotTop = viewport.immersive ? (width < 650 ? 260 : 290) : 81;
  const axisOffset = plotTop - 81;
  const bottomSpace = viewport.immersive ? (width <= 1000 ? 305 : 155) : 0;
  const overviewWidth = viewport.immersive
    ? Math.max(
        200,
        Math.min(650, width - (width < 650 ? 32 : width <= 1000 ? 48 : 440)) -
          32,
      )
    : width - 40;
  const plotWidth = Math.max(100, right - left);
  const span = range.end - range.start;
  const level = span > 1400 ? "eras" : span > 420 ? "thinkers" : "works";
  const x = useCallback(
    (date: number) => left + ((date - range.start) / span) * plotWidth,
    [left, range.start, span, plotWidth],
  );
  const yearAt = (position: number) =>
    Math.round(
      Math.max(
        MIN_YEAR,
        Math.min(
          MAX_YEAR,
          range.start + ((position - left) / plotWidth) * span,
        ),
      ),
    );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const bounds = entries[0].contentRect;
      setWidth(Math.max(280, bounds.width));
      setViewport({
        height: bounds.height,
        immersive: !!node.closest(".immersive"),
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const zoom = useCallback((factor: number, anchorRatio = 0.5) => {
    setRange((previous) => {
      const oldSpan = previous.end - previous.start;
      const newSpan = Math.max(MIN_SPAN, Math.min(HISTORY, oldSpan * factor));
      return constrain(
        previous.start + oldSpan * anchorRatio - newSpan * anchorRatio,
        newSpan,
      );
    });
  }, []);
  const pan = useCallback(
    (fraction: number) =>
      setRange((previous) =>
        constrain(
          previous.start + (previous.end - previous.start) * fraction,
          previous.end - previous.start,
        ),
      ),
    [],
  );

  useEffect(() => {
    const node = svgRef.current;
    if (!node) return;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const position = event.clientX - node.getBoundingClientRect().left;
        zoom(
          Math.exp(event.deltaY * 0.008),
          Math.max(0, Math.min(1, (position - left) / plotWidth)),
        );
      } else if (
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        event.preventDefault();
        const delta = event.shiftKey
          ? event.deltaY || event.deltaX
          : event.deltaX;
        pan((delta / plotWidth) * (event.deltaMode === 1 ? 16 : 1));
      }
    };
    node.addEventListener("wheel", wheel, { passive: false });
    return () => node.removeEventListener("wheel", wheel);
  }, [left, plotWidth, pan, zoom]);

  useEffect(() => {
    if (drag.current || pinch.current) return;
    setRange((previous) =>
      year < previous.start || year > previous.end
        ? constrain(
            year - (previous.end - previous.start) / 2,
            previous.end - previous.start,
          )
        : previous,
    );
  }, [year]);

  const layout = useMemo(() => {
    let laneTop = plotTop;
    const laneMinimum = viewport.immersive
      ? Math.max(
          65,
          (viewport.height - plotTop - bottomSpace - (showEvents ? 72 : 22)) /
            LANES.length,
        )
      : 91;
    const placements: Placement[] = [];
    const lanes = LANES.map((lane) => {
      const rowEnds: number[] = [];
      const placementStart = placements.length;
      const members = philosophers
        .filter(
          (p) =>
            p.questionLane === lane.id &&
            ((p.birthYear <= range.end && endYearFor(p) >= range.start) ||
              p.works.some(
                (work) => work.year >= range.start && work.year <= range.end,
              )),
        )
        .sort((a, b) => a.birthYear - b.birthYear);
      for (const philosopher of members) {
        const firstVisibleWork = philosopher.works.find(
          (work) => work.year >= range.start && work.year <= range.end,
        );
        const lifeIsVisible = endYearFor(philosopher) >= range.start;
        const startX = Math.max(
          left + 5,
          x(
            lifeIsVisible
              ? philosopher.birthYear
              : (firstVisibleWork?.year ?? philosopher.birthYear),
          ),
        );
        const lifeEnd = x(
          Math.max(
            endYearFor(philosopher),
            ...philosopher.works.map((work) => work.year),
          ),
        );
        const labelEnd =
          startX +
          (level === "eras" && philosopher.id !== selectedId
            ? 14
            : Math.min(210, philosopher.name.length * 7 + 20));
        let row = rowEnds.findIndex((end) => end + 15 < startX);
        if (row === -1) row = rowEnds.length;
        rowEnds[row] = Math.max(lifeEnd, labelEnd);
        placements.push({
          philosopher,
          y: laneTop + 38 + row * (level === "works" ? 48 : 35),
        });
      }
      const naturalHeight = rowEnds.length * (level === "works" ? 48 : 35) + 47;
      const height = Math.max(laneMinimum, naturalHeight);
      // Sparse lanes occupy the available mural, while dense lanes retain their
      // readable row spacing and can scroll vertically.
      if (viewport.immersive)
        for (let index = placementStart; index < placements.length; index++)
          placements[index].y += Math.max(0, height - naturalHeight) / 2;
      const result = { ...lane, top: laneTop, height, count: members.length };
      laneTop += height;
      return result;
    });
    return { lanes, placements, end: laneTop };
  }, [
    philosophers,
    range,
    left,
    x,
    level,
    selectedId,
    plotTop,
    viewport,
    bottomSpace,
    showEvents,
  ]);
  const height = Math.max(
    viewport.immersive ? viewport.height : 0,
    layout.end + (showEvents ? 72 : 22) + bottomSpace,
  );
  const tickStep =
    span > 2200
      ? 500
      : span > 1000
        ? 200
        : span > 480
          ? 100
          : span > 230
            ? 50
            : span > 110
              ? 25
              : 10;
  const ticks: number[] = [];
  for (
    let date = Math.ceil(range.start / tickStep) * tickStep;
    date <= range.end;
    date += tickStep
  )
    ticks.push(date);
  const selected = philosophers.find((p) => p.id === selectedId);
  const visibleSelected = layout.placements.some(
    (p) => p.philosopher.id === selectedId,
  );
  const visibleEvents = events
    .filter(
      (event) => event.startYear >= range.start && event.startYear <= range.end,
    )
    .sort((a, b) => a.startYear - b.startYear);
  const eventLabels = new Map<string, number>();
  const eventLabelEnds = [-Infinity, -Infinity];
  for (const event of visibleEvents) {
    const labelX = x(event.startYear) + 7;
    const row = eventLabelEnds.findIndex((end) => end + 10 < labelX);
    if (row !== -1) {
      eventLabels.set(event.id, row);
      eventLabelEnds[row] = labelX + Math.min(24, event.title.length) * 4;
    }
  }

  const influences = useMemo(() => {
    const definitions = [
      [
        "Hume",
        "Kant",
        "Kant credits Hume with interrupting his “dogmatic slumber”; his account of causation answers Hume’s challenge.",
        "https://plato.stanford.edu/entries/kant-hume-causality/",
      ],
      [
        "Plato",
        "Aristotle",
        "Aristotle studied in Plato’s Academy for about twenty years, developing his philosophy in dialogue with Plato.",
        "https://plato.stanford.edu/entries/aristotle/",
      ],
      [
        "Kant",
        "Hegel",
        "Hegel’s idealism develops through a sustained critical engagement with Kant’s philosophy.",
        "https://plato.stanford.edu/entries/hegel/",
      ],
    ];
    return definitions.flatMap(([fromName, toName, note, url]) => {
      const from = philosophers.find((p) => p.name.includes(fromName));
      const to = philosophers.find((p) => p.name.includes(toName));
      return from && to && (selectedId === from.id || selectedId === to.id)
        ? [{ from, to, note, url }]
        : [];
    });
  }, [philosophers, selectedId]);

  const choose = (philosopher: Philosopher, workYear?: number) => {
    onSelect(philosopher.id);
    onYearChange(workYear ?? focusYear(philosopher));
  };
  const localX = (event: ReactPointerEvent<SVGSVGElement>) =>
    event.clientX - event.currentTarget.getBoundingClientRect().left;
  const pointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if ((event.target as Element).closest("[data-interactive]")) return;
    if (event.button !== 0) return;
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, localX(event));
    if (pointers.current.size === 2) {
      const positions = [...pointers.current.values()];
      const center = (positions[0] + positions[1]) / 2;
      pinch.current = {
        distance: Math.abs(positions[1] - positions[0]),
        range,
        anchor: range.start + ((center - left) / plotWidth) * span,
      };
      drag.current = null;
    } else {
      const mode = (event.target as Element).closest("[data-year-handle]")
        ? "year"
        : "pan";
      drag.current = { mode, x: localX(event), range, moved: false };
    }
    setDragging(true);
  };
  const pointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const position = localX(event);
    pointers.current.set(event.pointerId, position);
    if (pinch.current && pointers.current.size === 2) {
      const positions = [...pointers.current.values()];
      const distance = Math.max(10, Math.abs(positions[1] - positions[0]));
      const center = (positions[0] + positions[1]) / 2;
      const newSpan = Math.max(
        MIN_SPAN,
        Math.min(
          HISTORY,
          ((pinch.current.range.end - pinch.current.range.start) *
            pinch.current.distance) /
            distance,
        ),
      );
      setRange(
        constrain(
          pinch.current.anchor - ((center - left) / plotWidth) * newSpan,
          newSpan,
        ),
      );
    } else if (drag.current) {
      if (Math.abs(position - drag.current.x) > 3) drag.current.moved = true;
      if (drag.current.mode === "year") onYearChange(yearAt(position));
      else
        setRange(
          constrain(
            drag.current.range.start -
              ((position - drag.current.x) / plotWidth) *
                (drag.current.range.end - drag.current.range.start),
            drag.current.range.end - drag.current.range.start,
          ),
        );
    }
  };
  const pointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (drag.current && !drag.current.moved)
      onYearChange(yearAt(localX(event)));
    pointers.current.delete(event.pointerId);
    drag.current = null;
    pinch.current = null;
    setDragging(false);
  };
  const pointerCancel = (event: ReactPointerEvent<SVGSVGElement>) => {
    pointers.current.delete(event.pointerId);
    drag.current = null;
    pinch.current = null;
    setDragging(false);
  };
  const keyboard = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      pan(event.key === "ArrowLeft" ? -0.15 : 0.15);
    }
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoom(0.7);
    }
    if (event.key === "-") {
      event.preventDefault();
      zoom(1.4);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setRange({ start: MIN_YEAR, end: MAX_YEAR });
    }
    if (event.key === "Escape") setPopup(null);
  };

  return (
    <section
      className="tl-view"
      aria-label="Philosophy timeline"
      ref={containerRef}
    >
      <div className="tl-toolbar">
        <div className="tl-range">
          <span className="tl-eyebrow">A HISTORY OF IDEAS</span>
          <div>
            {formatYear(range.start)} <ArrowRight size={15} />{" "}
            {formatYear(range.end)}
          </div>
        </div>
        <div className="tl-controls">
          <span className="tl-level">
            {level === "eras"
              ? "Era view"
              : level === "thinkers"
                ? "Thinker view"
                : "Works view"}
          </span>
          <button
            aria-label="Zoom out timeline"
            onClick={() => zoom(1.45)}
            disabled={span >= HISTORY}
          >
            <Minus size={16} />
          </button>
          <button
            aria-label="Zoom in timeline"
            onClick={() => zoom(0.7)}
            disabled={span <= MIN_SPAN}
          >
            <Plus size={16} />
          </button>
          <button
            className="tl-fit"
            aria-label="Fit all history"
            onClick={() => setRange({ start: MIN_YEAR, end: MAX_YEAR })}
          >
            <RotateCcw size={14} /> Fit all
          </button>
        </div>
        <label className="tl-event-toggle tl-mobile-events">
          <input
            type="checkbox"
            checked={showEvents}
            onChange={(event) => setShowEvents(event.target.checked)}
          />
          Historical events
        </label>
      </div>
      <div
        className={`tl-canvas-wrap ${dragging ? "tl-dragging" : ""} ${scrolled ? "is-scrolled" : ""}`}
        onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 40)}
      >
        <svg
          ref={svgRef}
          className="tl-canvas"
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          tabIndex={0}
          role="group"
          aria-label="Interactive timeline. Drag or horizontal scroll to pan through time. Vertical scroll explores question lanes. Pinch or use plus and minus to zoom. Arrow keys pan; Home fits all history."
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerCancel}
          onKeyDown={keyboard}
        >
          <defs>
            <clipPath id="tl-plot-clip">
              <rect x={left} y={0} width={plotWidth} height={height} />
            </clipPath>
            <marker
              id="tl-arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6" fill="none" stroke="#9a9487" />
            </marker>
          </defs>
          <rect width={width} height={height} fill="transparent" />
          {layout.lanes.map((lane) => (
            <g key={lane.id} className="tl-lane">
              <rect
                x={0}
                y={lane.top}
                width={width}
                height={lane.height}
                fill={lane.color}
                opacity={0.023}
              />
              <line
                x1={0}
                x2={width}
                y1={lane.top}
                y2={lane.top}
                className="tl-separator"
              />
              <rect
                x={19}
                y={lane.top + 22}
                width={3}
                height={22}
                rx={1.5}
                fill={lane.color}
              />
              <text x={30} y={lane.top + 31} className="tl-lane-name">
                {lane.label}
              </text>
              {width >= 650 && (
                <text x={30} y={lane.top + 49} className="tl-lane-question">
                  {lane.question}
                </text>
              )}
            </g>
          ))}
          <g clipPath="url(#tl-plot-clip)">
            {ERAS.filter(
              (era) => era.end > range.start && era.start < range.end,
            ).map((era) => {
              const start = Math.max(left, x(era.start)),
                end = Math.min(right, x(era.end));
              return (
                <g key={era.name}>
                  <rect
                    x={start}
                    y={12 + axisOffset}
                    width={Math.max(0, end - start)}
                    height={22}
                    fill={viewport.immersive ? "#dfccb04d" : "#eeede5"}
                  />
                  {end - start > 70 && (
                    <text
                      x={(start + end) / 2}
                      y={26 + axisOffset}
                      textAnchor="middle"
                      className="tl-era-label"
                    >
                      {era.name}
                    </text>
                  )}
                </g>
              );
            })}
            {ticks.map((date) => (
              <g key={date}>
                <line
                  x1={x(date)}
                  x2={x(date)}
                  y1={55 + axisOffset}
                  y2={layout.end + (showEvents ? 64 : 14)}
                  className="tl-grid"
                />
                <text
                  x={x(date)}
                  y={58 + axisOffset}
                  textAnchor="middle"
                  className="tl-tick"
                >
                  {formatYear(date)}
                </text>
                <line
                  x1={x(date)}
                  x2={x(date)}
                  y1={65 + axisOffset}
                  y2={71 + axisOffset}
                  stroke="#bebcaf"
                />
              </g>
            ))}
            {influences.map((edge) => {
              const from = layout.placements.find(
                  (p) => p.philosopher.id === edge.from.id,
                ),
                to = layout.placements.find(
                  (p) => p.philosopher.id === edge.to.id,
                );
              if (!from || !to) return null;
              const x1 = x(focusYear(edge.from)),
                x2 = x(focusYear(edge.to));
              const path = `M ${x1} ${from.y + 7} C ${x1 + 50} ${from.y + 35}, ${x2 - 50} ${to.y + 35}, ${x2} ${to.y + 7}`;
              return (
                <g
                  key={`${edge.from.id}-${edge.to.id}`}
                  data-interactive="true"
                  role="button"
                  tabIndex={0}
                  className="tl-influence"
                  aria-label={`Referenced connection: ${edge.from.name} to ${edge.to.name}`}
                  onClick={() => setPopup({ kind: "influence", edge })}
                  onKeyDown={(event) =>
                    activate(event, () => setPopup({ kind: "influence", edge }))
                  }
                >
                  <title>{edge.note}</title>
                  <path
                    d={path}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={13}
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="#a7a296"
                    strokeWidth={1}
                    strokeDasharray="3 4"
                    markerEnd="url(#tl-arrow)"
                  />
                </g>
              );
            })}
            {layout.placements.map(({ philosopher: p, y }) => {
              const lane = LANES.find((item) => item.id === p.questionLane)!;
              const isSelected = p.id === selectedId;
              const start = x(p.birthYear),
                end = x(endYearFor(p));
              const firstVisibleWork = p.works.find(
                (work) => work.year >= range.start && work.year <= range.end,
              );
              const labelX = Math.max(
                left + 5,
                end < left ? x(firstVisibleWork?.year ?? p.birthYear) : start,
              );
              const labelCharacters = Math.max(
                1,
                Math.floor((right - labelX) / 8),
              );
              const displayName =
                viewport.immersive &&
                width < 650 &&
                p.name.length > labelCharacters
                  ? `${p.name.slice(0, Math.max(0, labelCharacters - 1)).trimEnd()}…`
                  : p.name;
              const highlightedWork = p.works.reduce(
                (best, work, index) =>
                  Math.abs(work.year - year) <
                  Math.abs((p.works[best]?.year ?? Infinity) - year)
                    ? index
                    : best,
                0,
              );
              const workClusters: { work: Work; index: number }[][] = [];
              for (const entry of p.works
                .map((work, index) => ({ work, index }))
                .filter(
                  (entry) =>
                    entry.work.year >= range.start &&
                    entry.work.year <= range.end,
                )
                .sort((a, b) => a.work.year - b.work.year)) {
                const lastCluster = workClusters[workClusters.length - 1];
                if (
                  lastCluster &&
                  x(entry.work.year) -
                    x(lastCluster[lastCluster.length - 1].work.year) <
                    20
                )
                  lastCluster.push(entry);
                else workClusters.push([entry]);
              }
              return (
                <g
                  key={p.id}
                  className={`tl-person ${isSelected ? "tl-person-selected" : ""}`}
                >
                  <g
                    data-interactive="true"
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name}, ${lifeDates(p)}. Select philosopher.`}
                    onClick={() => choose(p)}
                    onKeyDown={(event) => activate(event, () => choose(p))}
                  >
                    <title>
                      {p.name} · {lifeDates(p)} · {p.coreIdea}
                    </title>
                    <rect
                      x={Math.max(left, start) - 3}
                      y={y - 23}
                      width={Math.max(
                        15,
                        Math.min(right, end) - Math.max(left, start) + 9,
                      )}
                      height={35}
                      fill="transparent"
                    />
                    {isSelected && (
                      <rect
                        x={Math.max(left, start) - 5}
                        y={y - 23}
                        width={Math.max(
                          26,
                          Math.min(right, end) - Math.max(left, start) + 11,
                        )}
                        height={35}
                        fill={lane.color}
                        opacity={0.075}
                        rx={5}
                      />
                    )}
                    {(level !== "eras" || isSelected) && (
                      <text
                        x={labelX}
                        y={y - 7}
                        className="tl-person-name"
                        fill={isSelected ? "#303c33" : "#484a43"}
                      >
                        {displayName}
                      </text>
                    )}
                    {!p.birthYearUnknown && (
                      <line
                        data-life-mark={p.id}
                        x1={start}
                        x2={end}
                        y1={y}
                        y2={y}
                        stroke={lane.color}
                        strokeWidth={isSelected ? 4 : 2.5}
                        strokeLinecap="round"
                        strokeDasharray={p.deathYearUnknown ? "3 3" : undefined}
                        opacity={isSelected ? 1 : 0.55}
                      />
                    )}
                    <circle
                      data-activity-mark={p.birthYearUnknown ? p.id : undefined}
                      cx={start}
                      cy={y}
                      r={p.birthYearUnknown ? 4 : 2.5}
                      fill={p.birthYearUnknown ? "#faf9f4" : lane.color}
                      stroke={p.birthYearUnknown ? lane.color : undefined}
                      strokeWidth={1.5}
                    />
                    {p.birthYearUnknown ? (
                      <text
                        x={start + 7}
                        y={y + 3}
                        fill={lane.color}
                        className="tl-date-uncertain"
                      >
                        fl.
                      </text>
                    ) : p.deathYearUnknown ? (
                      <text
                        x={end + 5}
                        y={y + 3}
                        fill={lane.color}
                        className="tl-date-uncertain"
                      >
                        ?
                      </text>
                    ) : (
                      p.deathYear !== null && (
                        <line
                          x1={end}
                          x2={end}
                          y1={y - 3}
                          y2={y + 3}
                          stroke={lane.color}
                          opacity={0.6}
                        />
                      )
                    )}
                  </g>
                  {level !== "eras" &&
                    workClusters.map((cluster) => {
                      if (cluster.length > 1) {
                        const clusterX =
                          cluster.reduce(
                            (sum, entry) => sum + x(entry.work.year),
                            0,
                          ) / cluster.length;
                        const openCluster = () =>
                          setPopup({
                            kind: "works",
                            philosopher: p,
                            works: cluster.map((entry) => entry.work),
                          });
                        const firstYear = cluster[0].work.year,
                          lastYear = cluster[cluster.length - 1].work.year;
                        return (
                          <g
                            key={`cluster-${cluster[0].index}`}
                            data-interactive="true"
                            data-work-cluster={p.id}
                            tabIndex={0}
                            role="button"
                            className="tl-work tl-work-cluster"
                            aria-label={`${p.name}: ${cluster.length} works, ${formatYear(firstYear)}${firstYear !== lastYear ? ` to ${formatYear(lastYear)}` : ""}. Open work list.`}
                            onClick={openCluster}
                            onKeyDown={(event) => activate(event, openCluster)}
                          >
                            <title>
                              {cluster
                                .map(
                                  (entry) =>
                                    `${entry.work.title} · ${formatYear(entry.work.year)}`,
                                )
                                .join("\n")}
                              \nSelect to choose a work.
                            </title>
                            <rect
                              x={clusterX - 9}
                              y={y - 9}
                              width={18}
                              height={18}
                              fill="transparent"
                            />
                            <line
                              x1={x(firstYear)}
                              x2={x(lastYear)}
                              y1={y}
                              y2={y}
                              stroke={lane.color}
                              strokeWidth={4}
                            />
                            <rect
                              x={clusterX - 7}
                              y={y - 7}
                              width={14}
                              height={14}
                              rx={3}
                              fill="#faf9f4"
                              stroke={lane.color}
                              strokeWidth={1.2}
                            />
                            <text
                              x={clusterX}
                              y={y + 3}
                              textAnchor="middle"
                              fill={lane.color}
                              className="tl-cluster-count"
                            >
                              {cluster.length}
                            </text>
                          </g>
                        );
                      }
                      const { work, index } = cluster[0];
                      return (
                        <g
                          key={`${work.title}-${index}`}
                          data-interactive="true"
                          data-work-mark={`${p.id}:${work.year}:${index}`}
                          tabIndex={0}
                          role="button"
                          className="tl-work"
                          aria-label={`${p.name}: ${work.title}, ${work.approximate ? "circa " : ""}${formatYear(work.year)}, ${work.dateKind}`}
                          onClick={() => choose(p, work.year)}
                          onKeyDown={(event) =>
                            activate(event, () => choose(p, work.year))
                          }
                        >
                          <title>
                            {work.title} · {work.approximate ? "c. " : ""}
                            {formatYear(work.year)} · {work.dateKind}
                            {work.note ? `\n${work.note}` : ""}
                          </title>
                          <rect
                            x={x(work.year) - 7}
                            y={y - 7}
                            width={14}
                            height={14}
                            fill="transparent"
                          />
                          <path
                            d={`M ${x(work.year)} ${y - 4.5} l 4.5 4.5 l -4.5 4.5 l -4.5 -4.5 z`}
                            fill={isSelected ? lane.color : "#faf9f4"}
                            stroke={lane.color}
                            strokeWidth={1.3}
                          />
                          {level === "works" &&
                            isSelected &&
                            index === highlightedWork && (
                              <>
                                <rect
                                  x={x(work.year) + 5}
                                  y={y + 7}
                                  width={
                                    Math.min(work.title.length, 33) * 4.4 + 8
                                  }
                                  height={15}
                                  fill="transparent"
                                />
                                <text
                                  x={x(work.year) + 7}
                                  y={y + 17}
                                  className="tl-work-label"
                                >
                                  {work.title.length > 33
                                    ? `${work.title.slice(0, 31)}…`
                                    : work.title}
                                </text>
                              </>
                            )}
                        </g>
                      );
                    })}
                </g>
              );
            })}
            {year >= range.start && year <= range.end && (
              <g
                className="tl-year-cursor"
                data-year-handle="true"
                role="slider"
                tabIndex={0}
                aria-label="Selected year"
                aria-valuemin={MIN_YEAR}
                aria-valuemax={MAX_YEAR}
                aria-valuenow={year}
                aria-valuetext={formatYear(year)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    event.stopPropagation();
                    onYearChange(
                      Math.max(
                        MIN_YEAR,
                        Math.min(
                          MAX_YEAR,
                          year +
                            (event.key === "ArrowLeft" ? -1 : 1) *
                              (event.shiftKey ? 10 : 1),
                        ),
                      ),
                    );
                  }
                }}
              >
                <line
                  x1={x(year)}
                  x2={x(year)}
                  y1={34 + axisOffset}
                  y2={layout.end + (showEvents ? 64 : 14)}
                  stroke="#38584b"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.6}
                />
                <rect
                  x={x(year) - 32}
                  y={37 + axisOffset}
                  width={64}
                  height={24}
                  rx={4}
                  fill="#38584b"
                />
                <text
                  x={x(year)}
                  y={53 + axisOffset}
                  textAnchor="middle"
                  className="tl-year-label"
                >
                  {formatYear(year)}
                </text>
              </g>
            )}
          </g>
          {showEvents && (
            <g>
              <line
                x1={0}
                x2={width}
                y1={layout.end}
                y2={layout.end}
                className="tl-separator"
              />
              <text x={20} y={layout.end + 30} className="tl-event-row-label">
                THE WORLD
              </text>
              <text x={20} y={layout.end + 46} className="tl-lane-question">
                Historical context
              </text>
              <g clipPath="url(#tl-plot-clip)">
                {visibleEvents.map((event, index) => (
                  <g
                    key={event.id}
                    data-interactive="true"
                    role="button"
                    tabIndex={0}
                    className="tl-event"
                    aria-label={`Historical event: ${event.title}, ${formatYear(event.startYear)}`}
                    onClick={() => {
                      setPopup({ kind: "event", event });
                      onYearChange(event.startYear);
                    }}
                    onKeyDown={(key) =>
                      activate(key, () => {
                        setPopup({ kind: "event", event });
                        onYearChange(event.startYear);
                      })
                    }
                  >
                    <title>
                      {event.title} · {formatYear(event.startYear)}\n
                      {event.description}
                    </title>
                    <rect
                      x={x(event.startYear) - 8}
                      y={
                        layout.end +
                        16 +
                        (eventLabels.get(event.id) ?? index % 2) * 20
                      }
                      width={
                        span < 900 && eventLabels.has(event.id)
                          ? Math.min(24, event.title.length) * 4 + 17
                          : 16
                      }
                      height={20}
                      fill="transparent"
                    />
                    <line
                      x1={x(event.startYear)}
                      x2={x(event.startYear)}
                      y1={
                        layout.end +
                        20 +
                        (eventLabels.get(event.id) ?? index % 2) * 20
                      }
                      y2={
                        layout.end +
                        24 +
                        (eventLabels.get(event.id) ?? index % 2) * 20
                      }
                      stroke="#9b9a8d"
                    />
                    <circle
                      cx={x(event.startYear)}
                      cy={
                        layout.end +
                        26 +
                        (eventLabels.get(event.id) ?? index % 2) * 20
                      }
                      r={3}
                      fill="#9b9a8d"
                    />
                    {span < 900 && eventLabels.has(event.id) && (
                      <text
                        x={x(event.startYear) + 7}
                        y={layout.end + 29 + eventLabels.get(event.id)! * 20}
                        className="tl-event-label"
                      >
                        {event.title.length > 24
                          ? `${event.title.slice(0, 22)}…`
                          : event.title}
                      </text>
                    )}
                  </g>
                ))}
              </g>
            </g>
          )}
        </svg>
        {philosophers.length === 0 && (
          <div className="tl-empty">
            <strong>No philosophers match these filters.</strong>
            <span>Try another question, tradition, or search.</span>
          </div>
        )}
        {philosophers.length > 0 && layout.placements.length === 0 && (
          <div className="tl-empty">
            <strong>No lives in this period.</strong>
            <button
              onClick={() => setRange({ start: MIN_YEAR, end: MAX_YEAR })}
            >
              Explore all history <ArrowRight size={14} />
            </button>
          </div>
        )}
        {selected && !visibleSelected && (
          <button
            className="tl-return"
            onClick={() =>
              setRange(constrain(focusYear(selected) - span / 2, span))
            }
          >
            <Crosshair size={14} /> Show {selected.name}
          </button>
        )}
      </div>
      {popup && (
        <aside
          className="tl-popup"
          aria-label={
            popup.kind === "event"
              ? "Historical event details"
              : popup.kind === "works"
                ? `${popup.philosopher.name} work list`
                : "Influence details"
          }
        >
          <button
            className="tl-popup-close"
            aria-label="Close timeline details"
            onClick={() => setPopup(null)}
          >
            <X size={16} />
          </button>
          <span className="tl-eyebrow">
            {popup.kind === "event"
              ? `${popup.event.category} · ${formatYear(popup.event.startYear)}`
              : popup.kind === "works"
                ? `${popup.works.length} WORKS · CLOSE DATES`
                : "REFERENCED CONNECTION"}
          </span>
          <h3>
            {popup.kind === "event"
              ? popup.event.title
              : popup.kind === "works"
                ? popup.philosopher.name
                : `${popup.edge.from.name} → ${popup.edge.to.name}`}
          </h3>
          {popup.kind === "event" ? (
            <>
              <span className="tl-popup-region">
                {popup.event.region}
                {popup.event.approximate ? " · approximate date" : ""}
              </span>
              <p>{popup.event.description}</p>
              {(popup.event.relatedPhilosopherIds ?? [])
                .map((id) => philosophers.find((p) => p.id === id))
                .filter((p): p is Philosopher => !!p)
                .map((p) => (
                  <button
                    key={p.id}
                    className="tl-related"
                    onClick={() => {
                      choose(p);
                      setPopup(null);
                    }}
                  >
                    Explore {p.name}
                    <ArrowRight size={13} />
                  </button>
                ))}
              <div className="tl-popup-sources">
                {popup.event.sources.map((source) => (
                  <div key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                      <ArrowUpRight size={12} />
                    </a>
                    <span className="tl-source-status">
                      {source.verified
                        ? "Reference link · checked"
                        : "Reference link · verification pending"}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : popup.kind === "works" ? (
            <>
              <p>
                These dates sit close together at this scale. Select a work to
                explore its ideas and sources.
              </p>
              <div className="tl-work-choices">
                {popup.works.map((work, index) => (
                  <button
                    key={`${work.title}-${index}`}
                    data-work-choice={work.title}
                    className="tl-work-choice"
                    aria-label={`${popup.philosopher.name}: ${work.title}, ${formatYear(work.year)}, ${work.dateKind}`}
                    onClick={() => {
                      choose(popup.philosopher, work.year);
                      setPopup(null);
                    }}
                  >
                    <span>{work.title}</span>
                    <small>
                      {work.approximate ? "c. " : ""}
                      {formatYear(work.year)} · {work.dateKind}
                    </small>
                    {work.note && <em>{work.note}</em>}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p>{popup.edge.note}</p>
              <a
                href={popup.edge.url}
                target="_blank"
                rel="noreferrer"
                className="tl-source-link"
              >
                Stanford Encyclopedia of Philosophy <ArrowUpRight size={12} />
              </a>
              <span className="tl-source-status">Reference link · checked</span>
            </>
          )}
        </aside>
      )}
      <div className="tl-bottom-bar">
        <div className="tl-legend">
          <span>
            <i className="tl-life-swatch" /> Life
          </span>
          <span>
            <i className="tl-work-swatch" /> Work
          </span>
          <span>
            <i className="tl-influence-swatch" /> Referenced connection
          </span>
        </div>
        <label className="tl-event-toggle">
          <input
            type="checkbox"
            checked={showEvents}
            onChange={(event) => setShowEvents(event.target.checked)}
          />{" "}
          Historical events
        </label>
      </div>
      <div className="tl-overview">
        <span className="tl-eyebrow">THE WHOLE PICTURE</span>
        <svg
          className="tl-overview-chart"
          width="100%"
          height={44}
          viewBox={`0 0 ${overviewWidth} 44`}
          role="slider"
          tabIndex={0}
          aria-label="Timeline overview navigator"
          aria-valuemin={MIN_YEAR}
          aria-valuemax={MAX_YEAR}
          aria-valuenow={Math.round((range.start + range.end) / 2)}
          aria-valuetext={`${formatYear(range.start)} to ${formatYear(range.end)}`}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              pan(event.key === "ArrowLeft" ? -0.2 : 0.2);
            }
          }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            const ratio =
              (event.clientX -
                event.currentTarget.getBoundingClientRect().left) /
              event.currentTarget.getBoundingClientRect().width;
            setRange(constrain(MIN_YEAR + ratio * HISTORY - span / 2, span));
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
            const ratio =
              (event.clientX -
                event.currentTarget.getBoundingClientRect().left) /
              event.currentTarget.getBoundingClientRect().width;
            setRange(constrain(MIN_YEAR + ratio * HISTORY - span / 2, span));
          }}
        >
          <rect
            x={0}
            y={0}
            width={overviewWidth}
            height={28}
            rx={3}
            fill="#eeeee7"
          />
          {philosophers.map((p) => (
            <line
              key={p.id}
              x1={((p.birthYear - MIN_YEAR) / HISTORY) * overviewWidth}
              x2={
                (((p.birthYearUnknown ? p.birthYear : endYearFor(p)) -
                  MIN_YEAR) /
                  HISTORY) *
                overviewWidth
              }
              y1={5 + LANES.findIndex((lane) => lane.id === p.questionLane) * 4}
              y2={5 + LANES.findIndex((lane) => lane.id === p.questionLane) * 4}
              stroke={LANES.find((lane) => lane.id === p.questionLane)?.color}
              strokeWidth={p.birthYearUnknown ? 3 : 2}
              strokeLinecap="round"
              strokeDasharray={
                p.deathYearUnknown && !p.birthYearUnknown ? "2 2" : undefined
              }
              opacity={0.5}
            />
          ))}
          <rect
            x={((range.start - MIN_YEAR) / HISTORY) * overviewWidth}
            y={0}
            width={(span / HISTORY) * overviewWidth}
            height={28}
            rx={3}
            fill="#38584b"
            fillOpacity={0.08}
            stroke="#6c8476"
          />
          <text x={0} y={42} className="tl-overview-year">
            {formatYear(MIN_YEAR)}
          </text>
          <text
            x={overviewWidth}
            y={42}
            textAnchor="end"
            className="tl-overview-year"
          >
            {formatYear(MAX_YEAR)}
          </text>
        </svg>
      </div>
      <div className="tl-gesture-hint">
        <span>Drag or two-finger horizontal scroll to travel through time</span>
        <span>Vertical scroll explores question lanes · pinch to zoom</span>
      </div>
    </section>
  );
}

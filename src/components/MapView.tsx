import { useEffect, useMemo, useRef, useState } from "react";
import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Globe2,
  Layers3,
  MapPin,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Route,
} from "lucide-react";
import type { Topology } from "topojson-specification";
import type { GeoJsonProperties, Geometry, FeatureCollection } from "geojson";
import type {
  InfluenceRegion,
  LocationPeriod,
  Philosopher,
} from "../data/types";
import type { ViewProps } from "./viewTypes";
import type { CSSProperties } from "react";
import {
  activeAt,
  clampYear,
  endYearFor,
  formatYear,
  laneFor,
  locationAt,
  MAX_YEAR,
  MIN_YEAR,
} from "../lib/atlas";
import "./MapView.css";

const WIDTH = 960;
const HEIGHT = 535;
const projection = geoNaturalEarth1()
  .rotate([-10, 0])
  .fitExtent(
    [
      [24, 35],
      [WIDTH - 24, HEIGHT - 28],
    ],
    { type: "Sphere" },
  );
const path = geoPath(projection);
const topology = world as unknown as Topology;
const countries = feature(
  topology,
  topology.objects.countries,
) as FeatureCollection<Geometry, GeoJsonProperties>;
const landPaths = countries.features.map((country, index) => ({
  id: String(country.id ?? `unidentified-territory-${index}`),
  path: path(country) ?? "",
}));
const spherePath = path({ type: "Sphere" }) ?? "";
const graticulePath = path(geoGraticule10()) ?? "";
type MapCamera = { x: number; y: number; k: number };
type Pin = {
  philosopher: Philosopher;
  location: LocationPeriod;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
};
type MapPoint = { x: number; y: number };
const WORLD_CAMERA: MapCamera = { x: 0, y: 0, k: 1 };
const regionShapes: Record<
  string,
  {
    name: string;
    center: [number, number];
    extent: [number, number, number, number];
  }
> = {
  "east-asia": {
    name: "East Asia",
    center: [112, 35],
    extent: [92, 140, 15, 52],
  },
  "south-asia": {
    name: "South Asia",
    center: [77, 21],
    extent: [60, 94, 5, 37],
  },
  "middle-east-north-africa": {
    name: "Middle East & North Africa",
    center: [30, 28],
    extent: [-17, 62, 13, 40],
  },
  europe: { name: "Europe", center: [15, 49], extent: [-13, 41, 35, 65] },
  "sub-saharan-africa": {
    name: "Sub-Saharan Africa",
    center: [20, -7],
    extent: [-17, 48, -35, 17],
  },
  "north-america": {
    name: "North America",
    center: [-100, 39],
    extent: [-135, -65, 22, 57],
  },
  "latin-america": {
    name: "Latin America",
    center: [-68, -15],
    extent: [-105, -35, -52, 18],
  },
  mediterranean: {
    name: "Mediterranean",
    center: [18, 36],
    extent: [-6, 38, 28, 46],
  },
};

function canonicalRegion(region: string) {
  const id = region
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
  return (
    (
      {
        "middle-east-and-north-africa": "middle-east-north-africa",
        "middle-east-&-north-africa": "middle-east-north-africa",
        "subsaharan-africa": "sub-saharan-africa",
        worldwide: "global",
      } as Record<string, string>
    )[id] ?? id
  );
}

function receptionShape(region: InfluenceRegion) {
  const id = canonicalRegion(region.region);
  if (id === "global") return undefined;
  const fallback = regionShapes[id];
  const extent = region.extent
    ? [
        region.extent.west,
        region.extent.east,
        region.extent.south,
        region.extent.north,
      ]
    : fallback?.extent;
  const center: [number, number] | undefined = region.center
    ? [region.center.lon, region.center.lat]
    : extent
      ? [(extent[0] + extent[1]) / 2, (extent[2] + extent[3]) / 2]
      : fallback?.center;
  if (!center) return undefined;
  const projected = projection(center)!;
  const west = projection([extent?.[0] ?? center[0], center[1]])!;
  const east = projection([extent?.[1] ?? center[0], center[1]])!;
  const south = projection([center[0], extent?.[2] ?? center[1]])!;
  const north = projection([center[0], extent?.[3] ?? center[1]])!;
  return {
    x: projected[0],
    y: projected[1],
    rx: extent ? Math.max(12, Math.abs(east[0] - west[0]) / 2) : 6,
    ry: extent ? Math.max(12, Math.abs(south[1] - north[1]) / 2) : 6,
    name: fallback?.name ?? region.region,
    point: !extent,
  };
}

function mapPoint(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): MapPoint {
  const matrix = svg.getScreenCTM();
  const point = matrix
    ? new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse())
    : { x: clientX, y: clientY };
  return { x: point.x, y: point.y };
}

const periodLabel = (location: LocationPeriod) =>
  `${location.approximate ? "c. " : ""}${formatYear(location.startYear)}–${formatYear(location.endYear)}`;

export default function MapView({
  philosophers,
  selectedId,
  year,
  onSelect,
  onYearChange,
}: ViewProps) {
  const [camera, setCamera] = useState<MapCamera>(() => {
    if (window.innerWidth > 700) return WORLD_CAMERA;
    const thinker = philosophers.find((entry) => entry.id === selectedId);
    const location = thinker ? locationAt(thinker, year) : undefined;
    const center = projection(
      location ? [location.lon, location.lat] : [14, 48],
    )!;
    const k = 2.8;
    return { k, x: WIDTH / 2 - center[0] * k, y: HEIGHT / 2 - center[1] * k };
  });
  const [showReach, setShowReach] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [mapBounds, setMapBounds] = useState({
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT,
  });
  const [playing, setPlaying] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [screenScale, setScreenScale] = useState(1);
  const mapRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ x: number; y: number; camera: MapCamera } | null>(
    null,
  );
  const pointersRef = useRef(new Map<number, MapPoint>());
  const pinchRef = useRef<{
    distance: number;
    center: MapPoint;
    camera: MapCamera;
  } | null>(null);
  const yearRef = useRef(year);
  const yearChangeRef = useRef(onYearChange);
  yearRef.current = year;
  yearChangeRef.current = onYearChange;
  const selected = philosophers.find(
    (philosopher) => philosopher.id === selectedId,
  );
  const currentLocation = selected ? locationAt(selected, year) : undefined;
  const journeyStatus = !selected
    ? ""
    : currentLocation
      ? `At ${currentLocation.city} in ${formatYear(year)}`
      : activeAt(selected, year)
        ? "No recorded location at this date"
        : year < selected.birthYear
          ? "birthYearUnknown" in selected && selected.birthYearUnknown
            ? "Before recorded activity"
            : "Before their lifetime"
          : year > endYearFor(selected)
            ? selected.deathYearUnknown
              ? "Beyond recorded activity"
              : "Beyond their lifetime"
            : "Outside recorded activity";
  const selectedColor = selected
    ? laneFor(selected.questionLane).color
    : "#96733c";
  const living = philosophers.filter((philosopher) =>
    activeAt(philosopher, year),
  );
  const unknownCount = living.filter(
    (philosopher) => !locationAt(philosopher, year),
  ).length;
  const reach =
    selected?.influenceRegions.filter(
      (region) => year >= region.startYear && year <= region.endYear,
    ) ?? [];
  const reception = reach.map((region) => ({
    region,
    shape: receptionShape(region),
    global: canonicalRegion(region.region) === "global",
  }));
  const unmappedReach = reception.filter(
    (entry) => !entry.shape && !entry.global,
  );
  const globalReach = reception.some((entry) => entry.global);

  const pins = useMemo(() => {
    const seen = new Map<string, number>();
    return philosophers.flatMap((philosopher) => {
      const location = locationAt(philosopher, year);
      if (!location) return [];
      const [x, y] = projection([location.lon, location.lat])!;
      const key = `${Math.round(x / 10)}:${Math.round(y / 10)}`;
      const index = seen.get(key) ?? 0;
      seen.set(key, index + 1);
      const angle = (index - 1) * 2.4;
      const radius = index === 0 ? 0 : 28 + Math.floor(index / 5) * 14;
      return [
        {
          philosopher,
          location,
          x,
          y,
          offsetX: Math.cos(angle) * radius,
          offsetY: Math.sin(angle) * radius,
        },
      ];
    });
  }, [philosophers, year]);
  const sortedPins = [...pins].sort(
    (a, b) =>
      Number(a.philosopher.id === selectedId) -
      Number(b.philosopher.id === selectedId),
  );
  const hovered = pins.find((pin) => pin.philosopher.id === hoveredId);
  const stops = useMemo(
    () =>
      selected
        ? [...selected.locations].sort((a, b) => a.startYear - b.startYear)
        : [],
    [selected],
  );
  const pastStops = stops.filter((stop) => stop.startYear <= year);
  const routePath = pastStops
    .map((stop, index) => {
      const point = projection([stop.lon, stop.lat])!;
      return `${index === 0 ? "M" : "L"}${point[0]},${point[1]}`;
    })
    .join(" ");

  useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;
    const updateScale = () => {
      const { width, height } = svg.getBoundingClientRect();
      if (!width || !height) return;
      const aspect = width / height;
      const viewWidth = Math.max(WIDTH, HEIGHT * aspect);
      const viewHeight = Math.max(HEIGHT, WIDTH / aspect);
      setMapBounds({
        x: (WIDTH - viewWidth) / 2,
        y: (HEIGHT - viewHeight) / 2,
        width: viewWidth,
        height: viewHeight,
      });
      setScreenScale(width / viewWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      if (yearRef.current >= MAX_YEAR) {
        setPlaying(false);
        return;
      }
      yearChangeRef.current(clampYear(yearRef.current + 5));
    }, 750);
    return () => window.clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const { x: px, y: py } = mapPoint(svg, event.clientX, event.clientY);
      setCamera((previous) => {
        if (!event.ctrlKey && (Math.abs(event.deltaX) > 2 || event.shiftKey)) {
          const scale = svg.getScreenCTM()?.a ?? 1;
          return {
            ...previous,
            x:
              previous.x -
              (event.shiftKey ? event.deltaY : event.deltaX) / scale,
            y: previous.y - (event.shiftKey ? 0 : event.deltaY) / scale,
          };
        }
        const k = Math.max(
          1,
          Math.min(8, previous.k * Math.exp(-event.deltaY * 0.0015)),
        );
        if (k === 1) return WORLD_CAMERA;
        return {
          k,
          x: px - ((px - previous.x) * k) / previous.k,
          y: py - ((py - previous.y) * k) / previous.k,
        };
      });
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, []);

  function zoom(factor: number) {
    setCamera((previous) => {
      const k = Math.max(1, Math.min(8, previous.k * factor));
      return k === 1
        ? WORLD_CAMERA
        : {
            k,
            x: WIDTH / 2 - ((WIDTH / 2 - previous.x) * k) / previous.k,
            y: HEIGHT / 2 - ((HEIGHT / 2 - previous.y) * k) / previous.k,
          };
    });
  }
  function focusEurope() {
    const point = projection([14, 48])!;
    setCamera({
      k: 3.4,
      x: WIDTH / 2 - point[0] * 3.4,
      y: HEIGHT / 2 - point[1] * 3.4,
    });
  }
  function pinAtPointer(clientX: number, clientY: number, fallback: Pin) {
    const svg = mapRef.current;
    if (!svg) return fallback;
    const point = mapPoint(svg, clientX, clientY);
    const markerScale = 1 / (camera.k * screenScale);
    let nearest = fallback;
    let distance = Infinity;
    for (const pin of pins) {
      const x = camera.x + (pin.x + pin.offsetX * markerScale) * camera.k;
      const y = camera.y + (pin.y + pin.offsetY * markerScale) * camera.k;
      const candidate = Math.hypot(point.x - x, point.y - y);
      if (candidate < distance) {
        nearest = pin;
        distance = candidate;
      }
    }
    return nearest;
  }
  function selectPin(pin: Pin) {
    setHoveredId(pin.philosopher.id);
    onSelect(pin.philosopher.id);
  }
  function endPointer(pointerId: number) {
    pointersRef.current.delete(pointerId);
    pinchRef.current = null;
    const remaining = [...pointersRef.current.values()][0];
    dragRef.current = remaining ? { ...remaining, camera } : null;
    setDragging(Boolean(remaining));
  }

  return (
    <section
      className={`mp-view ${notesOpen ? "has-open-notes" : ""}`}
      aria-label="Philosopher map"
    >
      <div className="mp-heading">
        <div>
          <div className="mp-eyebrow">A GEOGRAPHY OF THOUGHT</div>
          <h2>
            Ideas in place<span>.</span>
          </h2>
          <p>Follow lives across borders, and ideas beyond them.</p>
        </div>
        <div className="mp-layer-options">
          <button
            className={
              showReach ? "mp-reach-button is-active" : "mp-reach-button"
            }
            onClick={() => {
              setShowReach(!showReach);
              if (!showReach) setNotesOpen(true);
            }}
            aria-pressed={showReach}
          >
            <Layers3 size={15} /> Ideas’ reach{" "}
            {showReach && <Check size={13} />}
          </button>
          <span>Qualitative reception</span>
        </div>
      </div>
      <div className={`mp-map-card ${dragging ? "is-dragging" : ""}`}>
        <div className="mp-map-topline">
          <div className="mp-snapshot">
            <span className="mp-live-dot" /> WORLD AT{" "}
            <strong>{formatYear(year)}</strong>
            <span className="mp-snapshot-divider" />
            <span>
              {pins.length}{" "}
              {pins.length === 1 ? "known location" : "known locations"}
            </span>
          </div>
          <div className="mp-view-options">
            <button
              className={camera.k === 1 ? "is-active" : ""}
              onClick={() => setCamera(WORLD_CAMERA)}
            >
              <Globe2 size={12} />
              World
            </button>
            <button
              className={camera.k === 3.4 ? "is-active" : ""}
              onClick={focusEurope}
            >
              Europe
            </button>
          </div>
        </div>
        <svg
          ref={mapRef}
          className="mp-map"
          viewBox={`${mapBounds.x} ${mapBounds.y} ${mapBounds.width} ${mapBounds.height}`}
          role="group"
          aria-label={`World map of documented philosopher locations in ${formatYear(year)}. ${pins.length} located, ${unknownCount} living philosophers with unknown location.`}
          onPointerDown={(event) => {
            if (
              event.button !== 0 ||
              (event.target as Element).closest("[data-map-marker]")
            )
              return;
            const point = mapPoint(
              event.currentTarget,
              event.clientX,
              event.clientY,
            );
            pointersRef.current.set(event.pointerId, point);
            dragRef.current = { ...point, camera };
            if (pointersRef.current.size === 2) {
              const [first, second] = [...pointersRef.current.values()];
              pinchRef.current = {
                distance: Math.max(
                  1,
                  Math.hypot(second.x - first.x, second.y - first.y),
                ),
                center: {
                  x: (first.x + second.x) / 2,
                  y: (first.y + second.y) / 2,
                },
                camera,
              };
            }
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
            setHoveredId(null);
          }}
          onPointerMove={(event) => {
            if (!pointersRef.current.has(event.pointerId) || !mapRef.current)
              return;
            const point = mapPoint(
              event.currentTarget,
              event.clientX,
              event.clientY,
            );
            pointersRef.current.set(event.pointerId, point);
            if (pinchRef.current && pointersRef.current.size >= 2) {
              const [first, second] = [...pointersRef.current.values()];
              const pinch = pinchRef.current;
              const k = Math.max(
                1,
                Math.min(
                  8,
                  (pinch.camera.k *
                    Math.hypot(second.x - first.x, second.y - first.y)) /
                    pinch.distance,
                ),
              );
              const center = {
                x: (first.x + second.x) / 2,
                y: (first.y + second.y) / 2,
              };
              setCamera({
                k,
                x:
                  center.x -
                  ((pinch.center.x - pinch.camera.x) * k) / pinch.camera.k,
                y:
                  center.y -
                  ((pinch.center.y - pinch.camera.y) * k) / pinch.camera.k,
              });
            } else if (dragRef.current)
              setCamera({
                ...dragRef.current.camera,
                x: dragRef.current.camera.x + point.x - dragRef.current.x,
                y: dragRef.current.camera.y + point.y - dragRef.current.y,
              });
          }}
          onPointerUp={(event) => endPointer(event.pointerId)}
          onPointerCancel={(event) => endPointer(event.pointerId)}
        >
          <defs>
            <pattern
              id="mp-ocean-dots"
              width="13"
              height="13"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.6" fill="#8b7756" opacity="0.16" />
            </pattern>
            <clipPath id="mp-world-clip">
              <path d={spherePath} />
            </clipPath>
          </defs>
          <rect
            x={mapBounds.x}
            y={mapBounds.y}
            width={mapBounds.width}
            height={mapBounds.height}
            fill="#e7dcc3"
          />
          <rect
            x={mapBounds.x}
            y={mapBounds.y}
            width={mapBounds.width}
            height={mapBounds.height}
            fill="url(#mp-ocean-dots)"
          />
          <g
            className="mp-camera"
            transform={`translate(${camera.x} ${camera.y}) scale(${camera.k})`}
          >
            <path
              d={spherePath}
              fill="#ded8bf"
              stroke="#ac9570"
              strokeWidth={0.7 / camera.k}
            />
            <path
              className="mp-graticule"
              d={graticulePath}
              fill="none"
              stroke="#9a8662"
              strokeOpacity="0.23"
              strokeWidth={0.45 / camera.k}
              aria-hidden="true"
            />
            <g className="mp-land">
              {landPaths.map((country) => (
                <path
                  key={country.id}
                  d={country.path}
                  strokeWidth={0.7 / camera.k}
                />
              ))}
            </g>
            <g className="mp-geographic-labels" aria-hidden="true">
              <text x="224" y="208">
                NORTH AMERICA
              </text>
              <text x="333" y="364">
                SOUTH AMERICA
              </text>
              <text x="472" y="181">
                EUROPE
              </text>
              <text x="486" y="322">
                AFRICA
              </text>
              <text x="675" y="219">
                ASIA
              </text>
              <text x="780" y="420">
                OCEANIA
              </text>
            </g>
            {showReach && (
              <g clipPath="url(#mp-world-clip)" className="mp-reception">
                {reception.map(({ region, shape }, index) => {
                  if (!shape) return null;
                  return (
                    <g key={`${region.region}-${index}`}>
                      <ellipse
                        cx={shape.x}
                        cy={shape.y}
                        rx={shape.point ? shape.rx / camera.k : shape.rx}
                        ry={shape.point ? shape.ry / camera.k : shape.ry}
                        fill={selectedColor}
                        fillOpacity="0.10"
                        stroke={selectedColor}
                        strokeOpacity="0.4"
                        strokeDasharray={`${4 / camera.k} ${4 / camera.k}`}
                        strokeWidth={1 / camera.k}
                      >
                        <title>
                          {shape.name}: {region.note} (
                          {formatYear(region.startYear)}–
                          {formatYear(region.endYear)}). Schematic reception,
                          not measured intensity.
                        </title>
                      </ellipse>
                      <text
                        className="mp-region-name"
                        x={shape.x}
                        y={
                          shape.y + (shape.point ? 17 / camera.k : shape.ry - 5)
                        }
                        textAnchor="middle"
                        fill={selectedColor}
                        fontSize={9 / camera.k}
                      >
                        {shape.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
            {selected && pastStops.length > 1 && (
              <path
                d={routePath}
                fill="none"
                stroke={selectedColor}
                strokeWidth={1.6 / camera.k}
                strokeDasharray={`${3 / camera.k} ${5 / camera.k}`}
                opacity="0.6"
                className="mp-route"
              />
            )}
            {selected &&
              pastStops.map((stop, index) => {
                const [x, y] = projection([stop.lon, stop.lat])!;
                return (
                  <g key={`${stop.city}-${index}`} className="mp-route-stop">
                    <circle
                      cx={x}
                      cy={y}
                      r={3 / camera.k}
                      fill="#f5ebd8"
                      stroke={selectedColor}
                      strokeWidth={1.2 / camera.k}
                    >
                      <title>
                        {stop.city}, {stop.country}: {periodLabel(stop)}.{" "}
                        {stop.note}
                      </title>
                    </circle>
                  </g>
                );
              })}
            {sortedPins.map((pin) => {
              const isSelected = pin.philosopher.id === selectedId;
              const color = laneFor(pin.philosopher.questionLane).color;
              const markerScale = 1 / (camera.k * screenScale);
              const x = pin.x + pin.offsetX * markerScale;
              const y = pin.y + pin.offsetY * markerScale;
              const labelLeft = camera.x + x * camera.k > WIDTH * 0.63;
              const labelScale = markerScale;
              return (
                <g
                  key={pin.philosopher.id}
                  className={`mp-pin ${isSelected ? "is-selected" : ""}`}
                  data-map-marker="true"
                  role="button"
                  tabIndex={0}
                  aria-label={`${pin.philosopher.name}, ${pin.location.city}, ${pin.location.country}, ${periodLabel(pin.location)}. Approximate city coordinate: latitude ${pin.location.lat}, longitude ${pin.location.lon}. ${pin.location.note}`}
                  aria-pressed={isSelected}
                  onClick={(event) =>
                    selectPin(pinAtPointer(event.clientX, event.clientY, pin))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectPin(pin);
                    }
                  }}
                  onMouseEnter={(event) =>
                    setHoveredId(
                      pinAtPointer(event.clientX, event.clientY, pin)
                        .philosopher.id,
                    )
                  }
                  onMouseMove={(event) =>
                    setHoveredId(
                      pinAtPointer(event.clientX, event.clientY, pin)
                        .philosopher.id,
                    )
                  }
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(pin.philosopher.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  {(pin.offsetX !== 0 || pin.offsetY !== 0) && (
                    <line
                      x1={pin.x}
                      y1={pin.y}
                      x2={x}
                      y2={y}
                      stroke={color}
                      strokeWidth={0.85 * markerScale}
                      opacity="0.7"
                    />
                  )}
                  <circle
                    className="mp-pin-halo"
                    cx={x}
                    cy={y}
                    r={(isSelected ? 15 : 11) * markerScale}
                    fill={color}
                    fillOpacity={isSelected ? 0.15 : 0}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={(isSelected ? 6.5 : 5) * markerScale}
                    fill={color}
                    stroke="#fffef9"
                    strokeWidth={2 * markerScale}
                  />
                  <circle cx={x} cy={y} r={1.5 * markerScale} fill="#fffef9" />
                  <circle
                    cx={x}
                    cy={y}
                    r={22 * markerScale}
                    fill="transparent"
                  />
                  {isSelected && (
                    <g
                      className="mp-selected-caption"
                      textAnchor={labelLeft ? "end" : "start"}
                      transform={`translate(${x + (labelLeft ? -12 : 12) * labelScale} ${y - 10 * labelScale}) scale(${labelScale})`}
                    >
                      <text className="mp-selected-label" x="0" y="0">
                        {pin.philosopher.name}
                      </text>
                      <text className="mp-selected-city" x="0" y="14">
                        {pin.location.city}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        {hovered && (
          <div className="mp-map-tooltip" role="status">
            <span className="mp-tooltip-kicker">
              <MapPin size={12} /> {hovered.location.city},{" "}
              {hovered.location.country}
            </span>
            <strong>{hovered.philosopher.name}</strong>
            <span>
              {periodLabel(hovered.location)} · city{" "}
              {hovered.location.lat.toFixed(2)}°,{" "}
              {hovered.location.lon.toFixed(2)}°
            </span>
            <p>{hovered.location.note}</p>
          </div>
        )}
        {pins.length === 0 && (
          <div className="mp-map-empty">
            <MapPin size={20} />
            <strong>No documented locations at this date</strong>
            <span>
              Move through time to find a philosopher’s recorded place.
            </span>
          </div>
        )}
        {showReach && reach.length === 0 && (
          <div className="mp-reach-empty">
            {selected
              ? `No reception region is recorded for ${selected.name} at this date.`
              : "Select a philosopher to explore the reception of their ideas."}
          </div>
        )}
        {showReach && (globalReach || unmappedReach.length > 0) && (
          <div className="mp-reach-empty">
            {globalReach && (
              <span>
                <Globe2 size={11} /> Global reception · broad circulation, no
                uniform geographic extent
              </span>
            )}
            {unmappedReach.length > 0 && (
              <span>
                {unmappedReach.length}{" "}
                {unmappedReach.length === 1 ? "region has" : "regions have"} no
                mapped extent; see the field notes.
              </span>
            )}
          </div>
        )}
        <div className="mp-map-controls">
          <button onClick={() => zoom(1.4)} aria-label="Zoom in">
            <Plus size={16} />
          </button>
          <button onClick={() => zoom(1 / 1.4)} aria-label="Zoom out">
            <Minus size={16} />
          </button>
          <button
            onClick={() => setCamera(WORLD_CAMERA)}
            aria-label="Reset world map"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="mp-map-bottomline">
          <span>
            <span className="mp-small-pin" /> Documented place{" "}
            <span className="mp-dotted-line" /> Approximate route
          </span>
          <span>Modern basemap boundaries</span>
        </div>
      </div>
      <div className="mp-map-caption">
        <span>
          {unknownCount > 0
            ? `${unknownCount} living ${unknownCount === 1 ? "philosopher" : "philosophers"} · location unknown in this year`
            : `${living.length} living ${living.length === 1 ? "philosopher" : "philosophers"} in this selection`}
        </span>
        <span>
          {showReach
            ? "Schematic reception, not measured intensity"
            : "Locations show recorded periods; dates may be approximate."}
        </span>
      </div>
      <div className="mp-time-control">
        <button
          className={playing ? "is-playing" : ""}
          onClick={() => {
            if (!playing && year >= MAX_YEAR) onYearChange(MIN_YEAR);
            setPlaying(!playing);
          }}
          aria-label={playing ? "Pause map time" : "Play map through time"}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <div className="mp-time-label">
          <span>TRAVEL THROUGH TIME</span>
          <strong>{formatYear(year)}</strong>
        </div>
        <div className="mp-time-slider">
          <input
            aria-label="Map year"
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={year}
            onChange={(event) =>
              onYearChange(clampYear(Number(event.target.value)))
            }
            style={
              {
                "--mp-time-progress": `${((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100}%`,
              } as CSSProperties
            }
          />
          <div>
            <span>651 BCE</span>
            <span>2026</span>
          </div>
        </div>
      </div>
      <details
        className="mp-field-notes"
        open={notesOpen}
        onToggle={(event) => setNotesOpen(event.currentTarget.open)}
      >
        <summary>
          <Compass size={17} />
          <span>
            Field notes
            <small>{selected ? selected.name : "Lives & reception"}</small>
          </span>
          <ChevronDown size={15} />
        </summary>
        <div className="mp-notes-body">
          {selected ? (
            <div className="mp-journey">
              <div className="mp-journey-heading">
                <div>
                  <Route size={15} />
                  <strong>{selected.name}’s journey</strong>
                </div>
                <span>{journeyStatus}</span>
              </div>
              {stops.length ? (
                <div className="mp-journey-stops">
                  {stops.map((stop, index) => (
                    <button
                      key={`${stop.city}-${index}`}
                      className={
                        stop === currentLocation
                          ? "is-current"
                          : stop.startYear > year
                            ? "is-future"
                            : ""
                      }
                      onClick={() => onYearChange(clampYear(stop.startYear))}
                      title={stop.note}
                    >
                      <span className="mp-stop-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <strong>{stop.city}</strong>
                        <span>{periodLabel(stop)}</span>
                        <p className="mp-stop-note">{stop.note}</p>
                      </div>
                      <ArrowUpRight size={13} />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mp-no-stops">
                  No source-supported location periods are included for this
                  philosopher.
                </p>
              )}
              <p className="mp-journey-note">
                Routes connect documented stops schematically; they do not
                reconstruct a precise travel path.
              </p>
            </div>
          ) : (
            <div className="mp-select-prompt">
              <MapPin size={16} />
              <span>Select a place to trace a philosopher’s journey.</span>
              <span className="mp-prompt-arrow">↗</span>
            </div>
          )}
          {showReach && selected && reception.length > 0 && (
            <div
              className="mp-reception-details"
              role="region"
              aria-label="Reception notes"
            >
              <div className="mp-reception-heading">
                <Layers3 size={13} />
                <strong>Reception at {formatYear(year)}</strong>
                <span>Editorial windows · qualitative, not measured</span>
              </div>
              <div className="mp-reception-cards">
                {reception.map(({ region, shape, global }, index) => (
                  <article key={`${region.region}-${index}`}>
                    <div className="mp-reception-card-title">
                      <strong>
                        {global
                          ? "Global reception"
                          : (shape?.name ?? region.region)}
                      </strong>
                      <span>
                        {formatYear(region.startYear)}–
                        {formatYear(region.endYear)}
                      </span>
                    </div>
                    <p>{region.note}</p>
                    <div className="mp-reception-card-meta">
                      <span>Editorial confidence: {region.confidence}</span>
                      <span>
                        {global
                          ? "No uniform geographic extent"
                          : !shape
                            ? "Extent unavailable · omitted from map"
                            : shape.point
                              ? "Approximate region marker"
                              : "Schematic region extent"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </details>
    </section>
  );
}

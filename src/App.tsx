import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  ExternalLink,
  Globe2,
  Layers3,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { westernPhilosophers } from "./data/philosophers";
import { globalPhilosophers } from "./data/global";
import { historicalEvents } from "./data/events";
import type { Philosopher, QuestionLane } from "./data/types";
import {
  clampYear,
  endYearFor,
  focusYear,
  formatYear,
  LANES,
  laneFor,
  lifeDates,
  locationAt,
  MAX_YEAR,
  MIN_YEAR,
} from "./lib/atlas";

type View = "timeline" | "map" | "ideas";
type Dialog = "guide" | "method" | null;
const TimelineView = lazy(() => import("./components/TimelineView"));
const MapView = lazy(() => import("./components/MapView"));
const IdeasView = lazy(() => import("./components/IdeasView"));
const philosophers = [...westernPhilosophers, ...globalPhilosophers].sort(
  (a, b) => a.birthYear - b.birthYear,
);
const westernIds = new Set(westernPhilosophers.map((p) => p.id));
const views = [
  {
    id: "timeline" as const,
    label: "Timeline",
    icon: ArrowRight,
    number: "01",
    title: "A history of questions.",
    subtitle:
      "Follow the thinkers, works, and turning points that reshaped how we see the world.",
  },
  {
    id: "map" as const,
    label: "World map",
    icon: Globe2,
    number: "02",
    title: "Thought, in place.",
    subtitle:
      "Trace documented lives and journeys. See how ideas travelled beyond their origins.",
  },
  {
    id: "ideas" as const,
    label: "Idea space",
    icon: Layers3,
    number: "03",
    title: "A space for ideas.",
    subtitle:
      "Explore affinities and tensions through three lenses on reality, knowledge, and ethical life.",
  },
];
const getView = (): View =>
  window.location.pathname.startsWith("/map")
    ? "map"
    : window.location.pathname.startsWith("/ideas")
      ? "ideas"
      : "timeline";
const initialParams = new URLSearchParams(window.location.search);
const initialYear =
  initialParams.has("year") &&
  Number.isFinite(Number(initialParams.get("year")))
    ? clampYear(Number(initialParams.get("year")))
    : 1781;

function Logo() {
  return (
    <span className="brand">
      <span className="brand-symbol" aria-hidden="true">
        <svg width="25" height="25" viewBox="0 0 32 32">
          <path
            d="M5 25 16 6l11 19M10 17h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="16"
            cy="17"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth=".6"
          />
        </svg>
      </span>
      <span>
        philosophy<span className="brand-light">atlas</span>
      </span>
    </span>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    container.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const elements = [
          ...(container.current?.querySelectorAll<HTMLElement>(
            'button, a, input, select, [tabindex="0"]',
          ) ?? []),
        ];
        const first = elements[0],
          last = elements.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", key);
      previouslyFocused?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={container}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-heading">
          <span className="eyebrow">THE PHILOSOPHY ATLAS</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Inspector({
  philosopher: p,
  year,
  view,
  onNavigate,
  onYearChange,
  onSelect,
  onClose,
}: {
  philosopher: Philosopher;
  year: number;
  view: View;
  onNavigate: (view: View) => void;
  onYearChange: (year: number) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "sources">("overview");
  useEffect(() => setTab("overview"), [p.id]);
  const lane = laneFor(p.questionLane);
  const place = locationAt(p, year);
  const index = philosophers.findIndex((item) => item.id === p.id);
  const adjacent = (offset: number) => {
    const next =
      philosophers[
        (index + offset + philosophers.length) % philosophers.length
      ];
    onSelect(next.id);
    onYearChange(focusYear(next));
  };
  return (
    <aside
      className="inspector"
      aria-label="Selected philosopher"
      data-testid="inspector"
    >
      <div className="inspector-top">
        <span className="eyebrow">IN FOCUS</span>
        <div className="inspector-top-actions">
          <button
            className="icon-button"
            aria-label="Previous philosopher"
            onClick={() => adjacent(-1)}
          >
            <ArrowLeft size={15} />
          </button>
          <button
            className="icon-button"
            aria-label="Next philosopher"
            onClick={() => adjacent(1)}
          >
            <ArrowRight size={15} />
          </button>
          <button
            className="icon-button inspector-close"
            aria-label="Close philosopher details"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div
        className="philosopher-monogram"
        style={{ "--lane-color": lane.color } as React.CSSProperties}
        aria-hidden="true"
      >
        <span>
          {p.name
            .split(" ")
            .map((word) => word[0])
            .slice(-2)
            .join("")}
        </span>
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="44" />
          <circle cx="60" cy="60" r="33" />
          <path d="M16 60h88M60 16v88M29 29l62 62M29 91l62-62" />
        </svg>
      </div>
      <div className="inspector-identity">
        <span className="tradition-label">{p.tradition}</span>
        <h2>{p.name}</h2>
        <p className="life-dates">{lifeDates(p)}</p>
        <span className="question-badge" style={{ color: lane.color }}>
          <span style={{ background: lane.color }} />
          {lane.label}
        </span>
      </div>
      <div
        className="inspector-tabs"
        role="tablist"
        aria-label="Philosopher details"
      >
        <button
          role="tab"
          aria-selected={tab === "overview"}
          id="overview-tab"
          aria-controls="overview-panel"
          onClick={() => setTab("overview")}
        >
          Overview
        </button>
        <button
          role="tab"
          aria-selected={tab === "sources"}
          id="sources-tab"
          aria-controls="sources-panel"
          onClick={() => setTab("sources")}
        >
          Works & sources
        </button>
      </div>
      {tab === "overview" ? (
        <div
          id="overview-panel"
          role="tabpanel"
          aria-labelledby="overview-tab"
          className="inspector-body"
        >
          <span className="eyebrow">THE CENTRAL IDEA</span>
          <p className="core-idea">{p.coreIdea}</p>
          <div className="location-card">
            <MapPin size={15} />
            <div>
              <span>
                {place
                  ? `${place.city}${place.approximate ? " · approximate" : ""}`
                  : year < p.birthYear || year > endYearFor(p)
                    ? p.deathYearUnknown
                      ? "Outside recorded activity"
                      : "Outside their lifetime"
                    : "Location not documented"}
              </span>
              <small>
                {place
                  ? `Documented in ${formatYear(year)}`
                  : `At the selected year, ${formatYear(year)}`}
              </small>
            </div>
          </div>
          <div className="section-heading">
            <span className="eyebrow">A WORK TO BEGIN WITH</span>
            <BookOpen size={14} />
          </div>
          {p.works.slice(0, 1).map((work, i) => (
            <button
              className="work-card"
              key={i}
              onClick={() => {
                onYearChange(work.year);
                onNavigate("timeline");
              }}
            >
              <span>
                <strong>{work.title}</strong>
                <small>
                  {work.approximate ? "c. " : ""}
                  {formatYear(work.year)} · {work.dateKind}
                </small>
              </span>
              <ArrowUpRight size={16} />
            </button>
          ))}
          {p.works.length === 0 && (
            <p className="no-works">
              No surviving authored works are included. Read the reference
              sources for testimony and later accounts.
            </p>
          )}
          <div className="read-across">
            <span className="eyebrow">FOLLOW THIS THREAD</span>
            <div>
              {views
                .filter((v) => v.id !== view)
                .map((v) => (
                  <button key={v.id} onClick={() => onNavigate(v.id)}>
                    <v.icon size={14} />
                    {v.label}
                    <ArrowUpRight size={13} />
                  </button>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          id="sources-panel"
          role="tabpanel"
          aria-labelledby="sources-tab"
          className="inspector-body"
        >
          <span className="eyebrow">SELECTED WORKS</span>
          {p.works.length === 0 && (
            <p className="no-works">
              No surviving authored works are included; later testimony is
              distinguished from authorship.
            </p>
          )}
          <div className="works-list">
            {p.works.map((work, i) => (
              <button
                key={i}
                onClick={() => {
                  onYearChange(work.year);
                  onNavigate("timeline");
                }}
              >
                <strong>{work.title}</strong>
                <span>
                  {work.approximate ? "c. " : ""}
                  {formatYear(work.year)} · {work.dateKind}
                </span>
                {work.note && <small>{work.note}</small>}
              </button>
            ))}
          </div>
          <div className="source-note">
            <span className="eyebrow">READING THE RECORD</span>
            <p>{p.sourceNotes}</p>
          </div>
          <span className="eyebrow">REFERENCE READING</span>
          <div className="source-links">
            {p.sources.map((source, i) => (
              <a key={i} href={source.url} target="_blank" rel="noreferrer">
                <span>
                  {source.label}
                  <small>
                    {source.verified
                      ? "Page checked during research"
                      : "Reference link · page verification pending"}
                  </small>
                </span>
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="inspector-footer">
        <span className="small-dot" />
        One primary question. Many connections.
      </div>
    </aside>
  );
}

export default function App() {
  const [view, setView] = useState<View>(getView);
  const [year, setYear] = useState(initialYear);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialParams.get("thinker") ??
      philosophers.find((p) => p.id === "kant")?.id ??
      philosophers[0]?.id ??
      null,
  );
  const [lane, setLane] = useState<QuestionLane | "all">("all");
  const [tradition, setTradition] = useState<"all" | "western" | "global">(
    "all",
  );
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [dialog, setDialog] = useState<Dialog>(null);
  const [compactLegend, setCompactLegend] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainer = useRef<HTMLDivElement>(null);
  const meta = views.find((v) => v.id === view)!;
  const selected = philosophers.find((p) => p.id === selectedId);
  const filtered = useMemo(
    () =>
      philosophers.filter(
        (p) =>
          (lane === "all" || p.questionLane === lane) &&
          (tradition === "all" ||
            (tradition === "western"
              ? westernIds.has(p.id)
              : !westernIds.has(p.id))),
      ),
    [lane, tradition],
  );
  const searchResults = useMemo(() => {
    const value = query.trim().toLowerCase();
    return (
      value
        ? philosophers.filter((p) =>
            `${p.name} ${p.coreIdea} ${p.tradition} ${p.works.map((w) => w.title).join(" ")}`
              .toLowerCase()
              .includes(value),
          )
        : [
            selected,
            ...philosophers.filter((p) =>
              ["plato", "descartes", "kant", "confucius", "beauvoir"].includes(
                p.id,
              ),
            ),
          ].filter((p): p is Philosopher => !!p)
    ).slice(0, 7);
  }, [query, selected]);
  const navigate = (next: View) => {
    setView(next);
    const url = new URL(window.location.href);
    url.pathname = `/${next}`;
    window.history.pushState({}, "", url);
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("year", `${year}`);
    if (selectedId) url.searchParams.set("thinker", selectedId);
    else url.searchParams.delete("thinker");
    window.history.replaceState({}, "", url);
    document.title = `${meta.label} — Philosophy Atlas`;
  }, [year, selectedId, meta.label]);
  useEffect(() => {
    const pop = () => {
      setView(getView());
      const params = new URLSearchParams(window.location.search);
      const value = Number(params.get("year"));
      if (params.has("year") && Number.isFinite(value))
        setYear(clampYear(value));
      setSelectedId(params.get("thinker"));
    };
    const shortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    const outside = (e: PointerEvent) => {
      if (!searchContainer.current?.contains(e.target as Node))
        setSearchOpen(false);
    };
    window.addEventListener("popstate", pop);
    window.addEventListener("keydown", shortcut);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("popstate", pop);
      window.removeEventListener("keydown", shortcut);
      window.removeEventListener("pointerdown", outside);
    };
  }, []);
  const chooseSearch = (p: Philosopher) => {
    setSelectedId(p.id);
    setYear(clampYear(focusYear(p)));
    setLane("all");
    setTradition("all");
    setQuery("");
    setSearchOpen(false);
    searchRef.current?.blur();
  };
  const props = {
    philosophers: filtered,
    events: historicalEvents,
    selectedId,
    year,
    onSelect: setSelectedId,
    onYearChange: (value: number) => setYear(clampYear(value)),
  };
  return (
    <div className="app">
      <a className="skip-link" href="#atlas-main">
        Skip to atlas
      </a>
      <header className="site-header">
        <a
          href="/timeline"
          aria-label="Philosophy Atlas home"
          onClick={(e) => {
            e.preventDefault();
            navigate("timeline");
          }}
        >
          <Logo />
        </a>
        <nav className="view-nav" aria-label="Atlas views">
          {views.map((v) => (
            <a
              key={v.id}
              href={`/${v.id}?year=${year}${selectedId ? `&thinker=${selectedId}` : ""}`}
              aria-current={view === v.id ? "page" : undefined}
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  navigate(v.id);
                }
              }}
            >
              <v.icon size={16} />
              <span>{v.label}</span>
            </a>
          ))}
        </nav>
        <div className="global-search" ref={searchContainer}>
          <Search size={16} />
          <input
            ref={searchRef}
            aria-label="Search philosophers, ideas, or works"
            placeholder="Find a thinker or an idea"
            value={query}
            onFocus={() => setSearchOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchResults[0])
                chooseSearch(searchResults[0]);
              if (e.key === "ArrowDown") {
                e.preventDefault();
                searchContainer.current
                  ?.querySelector<HTMLButtonElement>(".search-result")
                  ?.focus();
              }
            }}
          />
          <kbd>⌘ K</kbd>
          {searchOpen && (
            <div className="search-results">
              <span className="eyebrow">
                {query
                  ? `${searchResults.length} MATCHING THINKERS`
                  : "START A THREAD"}
              </span>
              {searchResults.length ? (
                searchResults.map((p) => (
                  <button
                    key={p.id}
                    className="search-result"
                    onClick={() => chooseSearch(p)}
                  >
                    <span
                      className="small-dot"
                      style={{ background: laneFor(p.questionLane).color }}
                    />
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {p.tradition} · {lifeDates(p)}
                      </small>
                    </span>
                    <ArrowUpRight size={14} />
                  </button>
                ))
              ) : (
                <p className="search-empty">
                  No thinkers found. Try a name, work, or idea.
                </p>
              )}
            </div>
          )}
        </div>
        <button
          className="header-about icon-button"
          aria-label="About this atlas"
          onClick={() => setDialog("method")}
        >
          <Compass size={20} />
        </button>
      </header>
      <main id="atlas-main" className="atlas-main">
        <section className="intro">
          <div>
            <div className="intro-eyebrow">
              <span className="live-dot" />
              <span>AN ATLAS OF PHILOSOPHY</span>
              <span className="intro-divider" />
              <span>
                {meta.number} / {meta.label.toUpperCase()}
              </span>
            </div>
            <h1>{meta.title}</h1>
            <p>{meta.subtitle}</p>
          </div>
          <div className="intro-aside">
            <div className="atlas-stat">
              <strong>
                2,600<span>+</span>
              </strong>
              <span>years of inquiry</span>
            </div>
            <button onClick={() => setDialog("guide")}>
              How to explore <ArrowUpRight size={14} />
            </button>
          </div>
        </section>
        <div className="explore-toolbar">
          <div className="filter-controls">
            <span className="eyebrow toolbar-label">
              <SlidersHorizontal size={13} />
              EXPLORE
            </span>
            <label className="select-wrap">
              <span className="sr-only">Filter by philosophical question</span>
              <select
                aria-label="Filter by philosophical question"
                value={lane}
                onChange={(e) => setLane(e.target.value as typeof lane)}
              >
                <option value="all">All questions</option>
                {LANES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} />
            </label>
            <label className="select-wrap">
              <span className="sr-only">Filter traditions</span>
              <select
                aria-label="Filter traditions"
                value={tradition}
                onChange={(e) =>
                  setTradition(e.target.value as typeof tradition)
                }
              >
                <option value="all">All traditions</option>
                <option value="western">Western philosophy</option>
                <option value="global">Beyond the West</option>
              </select>
              <ChevronDown size={13} />
            </label>
            {(lane !== "all" || tradition !== "all") && (
              <button
                className="clear-filters"
                onClick={() => {
                  setLane("all");
                  setTradition("all");
                }}
              >
                Reset <X size={12} />
              </button>
            )}
          </div>
          <div className="collection-label">
            <span>{filtered.length} thinkers</span>
            <span className="toolbar-separator" />
            <button onClick={() => setDialog("method")}>
              About the collection <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
        <div className={`atlas-workspace ${selected ? "has-inspector" : ""}`}>
          <section
            className="visual-panel"
            aria-label={`${meta.label} exploration`}
          >
            <Suspense
              fallback={
                <div className="view-loading" role="status">
                  Opening the atlas…
                </div>
              }
            >
              {view === "timeline" ? (
                <TimelineView {...props} />
              ) : view === "map" ? (
                <MapView {...props} />
              ) : (
                <IdeasView {...props} />
              )}
            </Suspense>
            {view === "ideas" && (
              <div className="shared-time">
                <div>
                  <span className="eyebrow">SHARED YEAR</span>
                  <strong>{formatYear(year)}</strong>
                </div>
                <button
                  className="icon-button"
                  aria-label="Previous decade"
                  onClick={() => setYear(clampYear(year - 10))}
                >
                  <ArrowLeft size={16} />
                </button>
                <label className="shared-year-slider">
                  <span className="sr-only">Selected year</span>
                  <input
                    aria-label="Selected year"
                    type="range"
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
                  <span>
                    <small>{formatYear(MIN_YEAR)}</small>
                    <small>Present</small>
                  </span>
                </label>
                <button
                  className="icon-button"
                  aria-label="Next decade"
                  onClick={() => setYear(clampYear(year + 10))}
                >
                  <ArrowRight size={16} />
                </button>
                <label className="year-input-wrap">
                  <span className="sr-only">Enter year (0 is 1 BCE)</span>
                  <input
                    type="number"
                    aria-label="Enter year (0 is 1 BCE)"
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    value={year}
                    onChange={(e) => {
                      if (e.target.value !== "")
                        setYear(clampYear(Number(e.target.value)));
                    }}
                  />
                </label>
              </div>
            )}
          </section>
          {selected && (
            <Inspector
              philosopher={selected}
              year={year}
              view={view}
              onNavigate={navigate}
              onYearChange={(value) => setYear(clampYear(value))}
              onSelect={setSelectedId}
              onClose={() => setSelectedId(null)}
            />
          )}
        </div>
        <div className={`question-legend ${compactLegend ? "expanded" : ""}`}>
          <button
            className="legend-toggle"
            onClick={() => setCompactLegend(!compactLegend)}
          >
            THE QUESTIONS <ChevronDown size={12} />
          </button>
          <div>
            {LANES.map((l) => (
              <button
                className={lane === l.id ? "active" : ""}
                key={l.id}
                onClick={() => setLane(lane === l.id ? "all" : l.id)}
                aria-pressed={lane === l.id}
              >
                <span className="small-dot" style={{ background: l.color }} />
                <span>{l.label}</span>
                <small>{l.question}</small>
              </button>
            ))}
          </div>
          <span className="legend-note">
            Primary lenses, shared across all three views.
          </span>
        </div>
      </main>
      <footer className="site-footer">
        <span>
          <span className="footer-mark">A</span>Every idea begins with a
          question.
        </span>
        <div>
          <span>A curated collection, growing over time</span>
          <button onClick={() => setDialog("method")}>
            Sources & methodology <ArrowUpRight size={12} />
          </button>
        </div>
      </footer>
      {dialog && (
        <Modal
          title={
            dialog === "guide"
              ? "Three ways into the same story."
              : "An atlas, with room for nuance."
          }
          onClose={() => setDialog(null)}
        >
          {dialog === "guide" ? (
            <>
              <p className="modal-lead">
                Time, place, and ideas tell different parts of the story. A
                selected thinker and year follow you between views.
              </p>
              <div className="guide-list">
                <div>
                  <span>01</span>
                  <div>
                    <h3>Follow time</h3>
                    <p>
                      Pan horizontally with two fingers or drag. Scroll
                      vertically to explore the question lanes. Pinch to zoom
                      into lifetimes and individual works; clustered marks open
                      a dated list. Vertical position groups thinkers by their
                      primary philosophical question. Use the zoom buttons and
                      arrow keys as alternatives.
                    </p>
                  </div>
                </div>
                <div>
                  <span>02</span>
                  <div>
                    <h3>Explore place</h3>
                    <p>
                      Move the year to locate documented lives. Select a thinker
                      to follow their known stops. Reception regions show broad,
                      qualitative areas where ideas circulated, including after
                      a thinker's death.
                    </p>
                  </div>
                </div>
                <div>
                  <span>03</span>
                  <div>
                    <h3>Turn an idea around</h3>
                    <p>
                      Drag to orbit the three axes, or use the view controls.
                      Coordinates are editorial interpretations: open the
                      placement reasoning and compare thinkers rather than
                      treating positions as scores.
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="primary-button"
                onClick={() => setDialog(null)}
              >
                Start exploring <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <>
              <p className="modal-lead">
                A visual introduction to philosophical history, with a Western
                emphasis and independent traditions in dialogue.
              </p>
              <div className="method-grid">
                <section>
                  <h3>
                    <BookOpen size={17} />
                    The collection
                  </h3>
                  <p>
                    {philosophers.length} thinkers and {historicalEvents.length}{" "}
                    historical turning points form this first collection. It is
                    selective rather than an exhaustive account. Each thinker
                    has a primary question for navigation; most contribute to
                    several.
                  </p>
                </section>
                <section>
                  <Globe2 size={17} /> <h3>Places & reception</h3>
                  <p>
                    Recorded city stays are approximate where marked. Missing
                    records remain missing. Reception regions describe broad
                    documented traditions; they are neither exclusive boundaries
                    nor measurements of influence. The basemap uses modern
                    geography.
                  </p>
                </section>
                <section>
                  <Layers3 size={17} />
                  <h3>Interpreting ideas</h3>
                  <p>
                    Reality: matter ↔ mind. Knowledge: experience ↔ reason.
                    Ethics: personal agency ↔ social relations. Coordinates are
                    editorial interpretations. These useful but imperfect lenses
                    do not exhaust a doctrine, and positions are not scholarly
                    consensus. Every point includes a rationale.
                  </p>
                </section>
                <section>
                  <Compass size={17} />
                  <h3>Dates & reference reading</h3>
                  <p>
                    Approximate, composition, lecture, publication, and
                    posthumous dates are distinguished. Years before the common
                    era use no historical year zero in labels. Sources indicate
                    which reference pages were read. Supplementary links marked
                    “verification pending” remain unchecked. Editorial
                    placements and reception windows require interpretation even
                    when reference pages are available.
                  </p>
                </section>
              </div>
              <div className="method-note">
                <Sparkles size={17} />
                <p>
                  Events provide context, not a single cause. Western and
                  non-Western traditions developed through distinct histories,
                  exchanges, and disputes. A useful atlas should make room for
                  those differences.
                </p>
              </div>
              <button
                className="primary-button"
                onClick={() => setDialog(null)}
              >
                Return to the atlas <Check size={16} />
              </button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

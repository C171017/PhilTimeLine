/** All years use astronomical numbering: 0 = 1 BCE, -1 = 2 BCE. */
export interface Source {
  label: string;
  url: string;
  verified?: boolean;
}
export type QuestionLane =
  | "reality"
  | "knowledge"
  | "ethics"
  | "politics"
  | "meaning";
export interface Work {
  title: string;
  year: number;
  dateKind: "publication" | "composition" | "lecture" | "posthumous";
  approximate: boolean;
  note?: string;
}
export interface LocationPeriod {
  city: string;
  country: string;
  lat: number;
  lon: number;
  startYear: number;
  endYear: number;
  approximate: boolean;
  note: string;
}
/** A documented reception area, never a measured intensity or exclusive boundary. */
export interface InfluenceRegion {
  region: string;
  startYear: number;
  endYear: number;
  confidence: "high" | "medium";
  qualitative: true;
  note: string;
  center?: { lat: number; lon: number };
  extent?: { west: number; east: number; south: number; north: number };
}
export interface Philosopher {
  id: string;
  name: string;
  birthYear: number;
  /** With this flag, birthYear is an attested floruit anchor, not a birth date. */
  birthYearUnknown?: boolean;
  deathYear: number | null;
  /** null with this flag means historically unknown, never currently living. */
  deathYearUnknown?: boolean;
  /** Last coarse attested activity window when death is unknown; not a death date. */
  activityEndYear?: number;
  datesApproximate: boolean;
  tradition: string;
  era: string;
  questionLane: QuestionLane;
  coreIdea: string;
  works: Work[];
  locations: LocationPeriod[];
  /** Editorial lenses in [-1,1], not measurements or settled classifications. */
  coordinates: { reality: number; knowledge: number; ethics: number };
  coordinateRationale: { reality: string; knowledge: string; ethics: string };
  influenceRegions: InfluenceRegion[];
  sources: Source[];
  sourceNotes: string;
}
export interface HistoricalEvent {
  id: string;
  title: string;
  startYear: number;
  endYear?: number;
  category: string;
  region: string;
  description: string;
  sources: Source[];
  approximate: boolean;
  relatedPhilosopherIds?: string[];
}

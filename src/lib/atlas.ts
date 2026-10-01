import type { Philosopher, QuestionLane } from "../data/types";

export const LANES: {
  id: QuestionLane;
  label: string;
  question: string;
  color: string;
}[] = [
  {
    id: "reality",
    label: "Reality",
    question: "What exists?",
    color: "#7565a5",
  },
  {
    id: "knowledge",
    label: "Knowledge",
    question: "What can we know?",
    color: "#35728b",
  },
  {
    id: "ethics",
    label: "Ethics",
    question: "How should we live?",
    color: "#946337",
  },
  {
    id: "politics",
    label: "Power & society",
    question: "How can we live together?",
    color: "#a45259",
  },
  {
    id: "meaning",
    label: "Meaning",
    question: "What makes a life meaningful?",
    color: "#4b7463",
  },
];
export const laneFor = (id: QuestionLane) => LANES.find((l) => l.id === id)!;
export const formatYear = (year: number) =>
  year <= 0 ? `${1 - Math.round(year)} BCE` : `${Math.round(year)}`;
export const lifeDates = (p: Philosopher) =>
  p.birthYearUnknown
    ? `fl. ${p.datesApproximate ? "c. " : ""}${formatYear(p.birthYear)}`
    : `${p.datesApproximate ? "c. " : ""}${formatYear(p.birthYear)}–${p.deathYearUnknown ? "?" : p.deathYear === null ? "present" : formatYear(p.deathYear)}`;
export const MIN_YEAR = -650;
export const MAX_YEAR = 2026;
export const clampYear = (year: number) =>
  Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(year)));
/** Unknown death is capped at recorded activity for navigation, never treated as living today. */
export const endYearFor = (p: Philosopher) =>
  p.deathYearUnknown
    ? (p.activityEndYear ?? p.birthYear)
    : (p.deathYear ?? MAX_YEAR);
export function locationAt(p: Philosopher, year: number) {
  if (year < p.birthYear || year > endYearFor(p)) return undefined;
  // A documented move year belongs to the later stop when inclusive dates meet.
  return p.locations
    .filter((l) => year >= l.startYear && year <= l.endYear)
    .sort((a, b) => b.startYear - a.startYear)[0];
}
export function activeAt(p: Philosopher, year: number) {
  return year >= p.birthYear && year <= endYearFor(p);
}
export function focusYear(p: Philosopher) {
  return p.works[0]?.year ?? Math.round((p.birthYear + endYearFor(p)) / 2);
}

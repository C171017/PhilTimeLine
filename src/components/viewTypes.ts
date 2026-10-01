import type { Philosopher, HistoricalEvent } from "../data/types";

export interface ViewProps {
  philosophers: Philosopher[];
  events: HistoricalEvent[];
  selectedId: string | null;
  year: number;
  onSelect: (id: string) => void;
  onYearChange: (year: number) => void;
}

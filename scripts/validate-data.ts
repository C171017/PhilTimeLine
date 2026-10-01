import assert from "node:assert/strict";
import { westernPhilosophers } from "../src/data/philosophers";
import { globalPhilosophers } from "../src/data/global";
import { historicalEvents } from "../src/data/events";
import {
  activeAt,
  endYearFor,
  formatYear,
  lifeDates,
  locationAt,
  MIN_YEAR,
  MAX_YEAR,
} from "../src/lib/atlas";

const people = [...westernPhilosophers, ...globalPhilosophers];
const ids = new Set(people.map((p) => p.id));
assert.equal(
  ids.size,
  people.length,
  "Philosopher IDs must be unique across collections",
);
assert.equal(formatYear(0), "1 BCE");
assert.equal(formatYear(-399), "400 BCE");
assert.equal(formatYear(1), "1");
for (const p of people) {
  assert(
    p.birthYear >= MIN_YEAR && p.birthYear <= MAX_YEAR,
    `${p.id}: life in supported range`,
  );
  assert(
    p.deathYear === null || p.deathYear > p.birthYear,
    `${p.id}: lifespan`,
  );
  if (p.deathYearUnknown) {
    assert.equal(
      p.deathYear,
      null,
      `${p.id}: unknown death represented separately`,
    );
    assert(
      p.activityEndYear !== undefined && p.activityEndYear >= p.birthYear,
      `${p.id}: recorded activity endpoint`,
    );
    assert.equal(
      activeAt(p, MAX_YEAR),
      false,
      `${p.id}: unknown ancient death must not imply living today`,
    );
    assert(!lifeDates(p).includes("present"), `${p.id}: unknown death label`);
  }
  if (p.birthYearUnknown)
    assert(
      lifeDates(p).startsWith("fl."),
      `${p.id}: floruit is not a birth date`,
    );
  assert(
    p.sources.length > 0 && p.sourceNotes.length > 0,
    `${p.id}: reference context`,
  );
  for (const source of p.sources) {
    assert(source.url.startsWith("https://"), `${p.id}: secure reference URL`);
    assert.equal(
      typeof source.verified,
      "boolean",
      `${p.id}: explicit verification status`,
    );
  }
  for (const lens of ["reality", "knowledge", "ethics"] as const) {
    assert(
      p.coordinates[lens] >= -1 && p.coordinates[lens] <= 1,
      `${p.id}: coordinate range`,
    );
    assert(
      p.coordinateRationale[lens].length > 15,
      `${p.id}: interpretive rationale`,
    );
  }
  for (const work of p.works) {
    assert(Number.isInteger(work.year), `${p.id}: integer work year`);
    if (work.year > (p.deathYear ?? MAX_YEAR))
      assert(
        work.dateKind === "posthumous" || work.note,
        `${p.id}: work after death requires context`,
      );
  }
  for (const loc of p.locations) {
    assert(
      loc.startYear >= p.birthYear &&
        loc.endYear <= endYearFor(p) &&
        loc.endYear >= loc.startYear,
      `${p.id}: location interval`,
    );
    assert(
      Math.abs(loc.lat) <= 90 && Math.abs(loc.lon) <= 180,
      `${p.id}: geographic coordinate`,
    );
    assert(loc.note.length > 0, `${p.id}: location context`);
  }
  for (const region of p.influenceRegions) {
    assert.equal(region.qualitative, true, `${p.id}: reception is qualitative`);
    assert(
      region.endYear >= region.startYear && region.note.length > 0,
      `${p.id}: reception context`,
    );
  }
  if (p.deathYear !== null)
    assert.equal(
      locationAt(p, p.deathYear + 1),
      undefined,
      `${p.id}: no physical location after death`,
    );
}
assert.equal(
  new Set(historicalEvents.map((e) => e.id)).size,
  historicalEvents.length,
);
for (const event of historicalEvents) {
  assert(
    event.description.length > 80 && event.sources.length > 0,
    `${event.id}: historical explanation and references`,
  );
  assert(
    event.endYear === undefined || event.endYear >= event.startYear,
    `${event.id}: event span`,
  );
  for (const id of event.relatedPhilosopherIds ?? [])
    assert(ids.has(id), `${event.id}: unresolved philosopher ${id}`);
}
const socrates = people.find((p) => p.id === "socrates")!;
assert.equal(
  socrates.works.length,
  0,
  "Do not attribute Plato’s testimony as authored Socratic works",
);
const laozi = people.find((p) => p.id === "laozi")!;
assert.equal(
  laozi.locations.length,
  0,
  "No documented itinerary should be invented for Laozi",
);
assert(
  historicalEvents.find((e) => e.id === "reformation")?.startYear === 1517,
);
assert(
  historicalEvents.find((e) => e.id === "civil-rights-mlk")?.startYear === 1963,
);
console.log(
  `Validated ${people.length} philosopher records and ${historicalEvents.length} historical events. Structural consistency only; this does not verify historical claims.`,
);

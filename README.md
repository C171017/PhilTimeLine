# Philosophy Atlas

A connected website for exploring philosophy through time, geography, and ideas. The three pages share a selected thinker and year, with that context saved in the URL for sharing and reloading.

## Run locally

Requires Node.js 22.12+ (the cloud environment has Node.js 24).

```sh
npm ci
npm run dev
```

In this cloud environment, use `npm ci --cache /workspace/.npm-cache` because the default home-directory cache is not writable. The development server uses port 5173. For a production build:

```sh
npm run build
npm run preview -- --port 4173
```

The static output is `dist/`. A deployment must route `/timeline`, `/map`, and `/ideas` to `index.html` (a typical SPA fallback). There is no backend, API key, external font, or runtime map service. World geography is bundled locally from the `world-atlas` package.

## Explore

- **Timeline:** horizontal trackpad scrolling or drag pans time; pinch zooms around the pointer. Vertical scrolling explores the question lanes. Buttons and keyboard controls provide alternatives. Zoom levels reveal eras, lives, and publications. Nearby works form a cluster with a selectable dated list. Historical contexts and referenced intellectual connections open reading panels.
- **Map:** change the year to see recorded city stays, select a thinker to follow documented stops, and switch on qualitative reception to inspect broad areas of circulation. Drag, pinch, or use the controls to navigate the map. Playback stops when leaving the page.
- **Idea space:** drag to orbit a projected 3D Cartesian space, change projection or color encoding, inspect the reasons behind each placement, and compare two thinkers along all three lenses.

Colors represent primary philosophical questions across all three pages. Timeline vertical position groups those questions; horizontal position represents time. The 3D lenses are matter ↔ mind, experience ↔ reason, and personal agency ↔ social relations. They are explicitly editorial interpretations, not measurements or doctrinal equivalences.

## Research and uncertainty

The collection emphasizes Western philosophy while including distinct Chinese, Indian, Buddhist, Islamic, Jewish, Japanese, Caribbean, and African contexts. It is curated, not an exhaustive canon.

Works distinguish publication, composition, lecture, and posthumous dates. Approximate life, work, and location dates are marked. An unknown death is separate from a living philosopher; a floruit is an activity anchor rather than an invented birth date. Stored BCE dates use astronomical numbering (`0` = 1 BCE), while historical labels omit year zero.

Recorded places are incomplete itineraries. Missing locations remain missing. Modern country labels are orientation aids. Reception zones and their date windows are coarse editorial summaries, with visible notes, never measured intensity or exclusive territorial boundaries. Geographic shading should not be read as historical heat-map data.

The initial collection contains **70 thinkers, 122 selected works, 117 location periods, and 16 historical contexts**. Relevant SEP/IEP reference text was read for all 83 philosopher reference entries and 33 event reference entries. Twelve supplementary event references remain unchecked, including Aśoka's patronage reference and King's primary letter; the flags and audit notes identify them.

See [research methodology](docs/research.md) and [global research and historical contexts](docs/global-research.md) for source checks, coverage gaps, and interpretive cautions. Each source has an explicit verification status. A read reference page does not verify every editorial geographic window or coordinate; those distinctions remain visible.

## Validate

```sh
npm run build
npm run test:data
npm test
```

All 28 desktop/mobile browser tests passed, covering routes, shared state and history, timeline gestures and work selection, contextual events, posthumous reception, map playback cleanup, actual 3D reprojection and dot-center selection, rationale comparison, search and filters, uncertainty, dialogs, overflow, and default-state WCAG A/AA audits. They use system Chromium when available. Otherwise install the Playwright browser with `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to a compatible executable. Structural data validation does not establish historical truth; automated accessibility checks do not exhaust accessibility assessment.

The [independent review](docs/reviews.md) improved from 7.3/10 to 8.1/10 over two rounds, with no material blocker remaining. Review stopped within the requested limit of three scoring rounds.

## Structure

```text
src/App.tsx                  Shared selection, year, routing, filters, reading panel
src/components/TimelineView  Independently reusable time view
src/components/MapView       Independently reusable geographic view
src/components/IdeasView     Independently reusable 3D view
src/components/viewTypes.ts  Shared view interface
src/data/                    Typed people, works, location periods, contexts
src/lib/atlas.ts             Date, activity, location, and visual helpers
```

Each view receives the same data and callbacks, so alternative integrations can be built without rewriting the three visualizations. Research corrections belong in the data and source notes rather than hard-coded screen positions.

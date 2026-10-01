import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expandInspector(page: Page) {
  const peek = page.getByRole("button", { name: /^Read about / });
  if (await peek.isVisible()) await peek.click();
}

async function openFieldNotes(page: Page) {
  const notes = page.locator(".mp-field-notes");
  if (!(await notes.evaluate((node) => (node as HTMLDetailsElement).open)))
    await notes.locator("summary").click();
}

test("shared selection and year survive navigation, reload, and browser history", async ({
  page,
}) => {
  await page.goto("/timeline?year=1781&thinker=kant");
  const nav = page.getByRole("navigation", { name: "Atlas views" });
  await nav.getByRole("link", { name: "World map" }).click();
  const year = page.getByRole("slider", { name: "Map year" });
  await year.focus();
  await year.press("ArrowRight");
  await expect(year).toHaveValue("1782");
  await nav.getByRole("link", { name: "Idea space" }).click();
  await expect(
    page
      .getByTestId("inspector")
      .getByRole("heading", { name: "Immanuel Kant" }),
  ).toBeVisible();
  await expect(
    page.getByRole("slider", { name: "Selected year", exact: true }),
  ).toHaveValue("1782");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "A space for ideas." }),
  ).toBeVisible();
  await expect(page).toHaveURL(/year=1782.*thinker=kant/);
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Thought, in place." }),
  ).toBeVisible();
  await expect(page.getByRole("slider", { name: "Map year" })).toHaveValue(
    "1782",
  );
});

test("timeline responds to horizontal trackpad pan and pinch with semantic zoom", async ({
  page,
}) => {
  await page.goto("/timeline");
  const chart = page.locator(".tl-canvas");
  const initial = await page.locator(".tl-range > div").textContent();
  await chart.evaluate((element) =>
    element.dispatchEvent(
      new WheelEvent("wheel", {
        deltaX: -130,
        deltaY: 0,
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  await expect(page.locator(".tl-range > div")).not.toHaveText(initial!);
  await chart.evaluate((element) =>
    element.dispatchEvent(
      new WheelEvent("wheel", {
        deltaY: -90,
        ctrlKey: true,
        clientX:
          element.getBoundingClientRect().left +
          element.getBoundingClientRect().width / 2,
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  await expect(page.locator(".tl-level")).toHaveText("Works view");
  await page.getByRole("button", { name: "Fit all history" }).click();
  await expect(page.locator(".tl-level")).toHaveText("Era view");
  await expect(page.locator(".tl-range > div")).toContainText("651 BCE");
});

test("selecting a work exposes its philosopher and dated publication", async ({
  page,
}) => {
  await page.goto("/timeline");
  await page.locator('[data-work-cluster="descartes"]').click();
  await page
    .locator('[data-work-choice="Meditations on First Philosophy"]')
    .click();
  await expect(
    page
      .getByTestId("inspector")
      .getByRole("heading", { name: "René Descartes" }),
  ).toBeVisible();
  await expect(page).toHaveURL(/year=1641/);
  await expect(
    page.getByRole("button", { name: "Read about René Descartes" }),
  ).toBeVisible();
  await expandInspector(page);
  await page.getByRole("tab", { name: "Works & sources" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Meditations");
  await expect(
    page.getByRole("tabpanel").getByRole("link").first(),
  ).toHaveAttribute("href", /^https:\/\//);
});

test("historical events explain a specific intellectual response", async ({
  page,
}) => {
  await page.goto("/timeline");
  await page
    .getByRole("button", {
      name: "Historical event: World War I, 1914",
      exact: true,
    })
    .click();
  const details = page.getByRole("complementary", {
    name: "Historical event details",
  });
  await expect(
    details.getByRole("heading", { name: "World War I", exact: true }),
  ).toBeVisible();
  await expect(details).toContainText("Wittgenstein");
  await expect(details.getByRole("link").first()).toHaveAttribute(
    "href",
    /^https:\/\//,
  );
  await page.getByRole("button", { name: "Close timeline details" }).click();
  await expect(details).not.toBeVisible();
});

test("map separates living location from posthumous reception", async ({
  page,
}) => {
  await page.goto("/map?year=1781&thinker=kant");
  await expandInspector(page);
  await expect(
    page.locator(".mp-pin").filter({ hasText: "Immanuel Kant" }),
  ).toHaveCount(1);
  const year = page.getByRole("slider", { name: "Map year" });
  await year.focus();
  await year.press("End");
  await expect(year).toHaveValue("2026");
  await expect(page.locator(".mp-pin.is-selected")).toHaveCount(0);
  await page.getByRole("button", { name: /Ideas’ reach/ }).click();
  await expect(page.locator(".mp-map-caption")).toContainText(
    "not measured intensity",
  );
  await expect(page.getByTestId("inspector")).toContainText(
    "Outside their lifetime",
  );
  await page.goto("/map?year=1805&thinker=kant");
  await page.getByRole("button", { name: /Ideas’ reach/ }).click();
  await expect(
    page.getByRole("region", { name: "Reception notes" }),
  ).toContainText("Europe");
  await expect(page.locator(".mp-reception ellipse")).not.toHaveCount(0);
});

test("map playback advances time and stops when leaving the map", async ({
  page,
}) => {
  await page.goto("/map?year=1781&thinker=kant");
  await page.getByRole("button", { name: "Play map through time" }).click();
  await expect(page.getByRole("slider", { name: "Map year" })).not.toHaveValue(
    "1781",
  );
  await page
    .getByRole("navigation", { name: "Atlas views" })
    .getByRole("link", { name: "Idea space" })
    .click();
  const year = await page
    .getByRole("slider", { name: "Selected year", exact: true })
    .inputValue();
  await page.waitForTimeout(900);
  await expect(
    page.getByRole("slider", { name: "Selected year", exact: true }),
  ).toHaveValue(year);
});

test("3D orbit and projection controls actually reproject points", async ({
  page,
}) => {
  await page.goto("/ideas");
  const point = page.locator(".is-point.is-selected .is-point-dot");
  const before = await point.getAttribute("cx");
  await page.getByRole("button", { name: "Rotate view right" }).click();
  await expect(point).not.toHaveAttribute("cx", before!);
  await page
    .getByRole("button", { name: "Reality × knowledge", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Reality × knowledge", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".is-canvas")).toContainText("Matter");
  await expect(page.locator(".is-canvas")).toContainText("Reason");
  await page.getByRole("button", { name: "Reset 3D view" }).click();
  await expect(
    page.getByRole("button", { name: "3D", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("idea comparison exposes the reasons behind all three axes", async ({
  page,
}) => {
  await page.goto("/ideas?thinker=kant&year=1781");
  await page.getByRole("button", { name: "Compare ideas" }).click();
  await page.getByLabel("Second comparison thinker").selectOption("hume");
  const comparison = page.getByRole("region", {
    name: "Compare philosophical perspectives",
  });
  await expect(page.locator(".is-comparison")).toContainText("David Hume");
  await expect(page.locator(".is-comparison-row")).toHaveCount(3);
  await expect(page.locator(".is-comparison")).toContainText(
    "not evidence of influence",
  );
  await page.getByLabel("Color points by").selectOption("reality");
  await page.locator(".is-color-key > summary").click();
  await expect(page.locator(".is-gradient-key")).toContainText("Mind");
  await expect(comparison).toBeVisible();
});

test("search finds works, and global/question filters change the actual plotted collection", async ({
  page,
}) => {
  await page.goto("/ideas");
  const search = page.getByRole("textbox", {
    name: "Search philosophers, ideas, or works",
  });
  await search.fill("Republic");
  await page.locator(".search-result").filter({ hasText: "Plato" }).click();
  await expect(
    page
      .getByTestId("inspector")
      .getByRole("heading", { name: "Plato", exact: true }),
  ).toBeVisible();
  await expect(page).toHaveURL(/thinker=plato/);
  const allCount = await page.locator(".is-point").count();
  await page.getByRole("button", { name: /^Filters/ }).click();
  await page.getByLabel("Filter traditions").selectOption("global");
  expect(await page.locator(".is-point").count()).toBeLessThan(allCount);
  await page
    .getByLabel("Filter by philosophical question")
    .selectOption("politics");
  for (const point of await page.locator(".is-point").all())
    await expect(point).toHaveAttribute("aria-label", /Power & society/);
});

test("uncertain biography and missing authored works remain explicit", async ({
  page,
}) => {
  await page.goto("/timeline?thinker=socrates&year=-420");
  await expandInspector(page);
  await expect(page.getByTestId("inspector")).toContainText(
    "No surviving authored works",
  );
  const search = page.getByRole("textbox", {
    name: "Search philosophers, ideas, or works",
  });
  await search.fill("Laozi");
  await page.locator(".search-result").filter({ hasText: "Laozi" }).click();
  await page
    .getByRole("navigation", { name: "Atlas views" })
    .getByRole("link", { name: "World map" })
    .click();
  // The later composite text is not dated to the conventionally attributed life.
  await page.goto("/map?thinker=laozi&year=-550");
  await expandInspector(page);
  await expect(page.getByTestId("inspector")).toContainText(
    "Location not documented",
  );
  await page.getByRole("button", { name: "Close philosopher details" }).click();
  await openFieldNotes(page);
  await expect(page.locator(".mp-journey")).toContainText(
    "No source-supported location periods",
  );
});

test("methodology dialog is keyboard dismissible and the pages fit the viewport", async ({
  page,
}) => {
  for (const view of ["timeline", "map", "ideas"]) {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/${view}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  }
  await page.getByRole("button", { name: "Sources & methodology" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "editorial interpretations",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("colored dot centers select the intended thinker or expose a named coincidence chooser", async ({
  page,
}) => {
  await page.goto("/ideas");
  for (const [id, name] of [
    ["kant", "Immanuel Kant"],
    ["hume", "David Hume"],
    ["descartes", "René Descartes"],
  ] as const) {
    const dot = page.locator(`.is-point-dot[data-thinker-id="${id}"]`);
    await dot.scrollIntoViewIfNeeded();
    const bounds = await dot.boundingBox();
    expect(bounds).not.toBeNull();
    await page.mouse.click(
      bounds!.x + bounds!.width / 2,
      bounds!.y + bounds!.height / 2,
    );
    const chooser = page.getByRole("dialog", {
      name: "Choose a thinker at this position",
    });
    if (await chooser.isVisible()) {
      await expect(chooser).toContainText(name);
      await chooser.locator(`[data-choice-id="${id}"]`).click();
    }
    await expect(
      page.getByTestId("inspector").getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`thinker=${id}`));
  }
});

test("unknown ancient lifespans remain activity records rather than living figures", async ({
  page,
}) => {
  await page.goto("/timeline?thinker=heraclitus&year=-499");
  await expect(
    page.getByTestId("inspector").locator(".life-dates"),
  ).toContainText("fl. c. 500 BCE");
  await page.goto("/map?thinker=heraclitus&year=2026");
  await expandInspector(page);
  await expect(page.locator(".mp-pin.is-selected")).toHaveCount(0);
  await expect(page.getByTestId("inspector")).toContainText(
    "Outside recorded activity",
  );
  await page.getByRole("button", { name: "Close philosopher details" }).click();
  await openFieldNotes(page);
  await expect(page.locator(".mp-journey")).toContainText(
    "Beyond recorded activity",
  );
});

test("all views have no detectable WCAG A or AA violations in their default reading state", async ({
  page,
}) => {
  for (const view of ["timeline", "map", "ideas"]) {
    await page.goto(`/${view}`);
    await page
      .locator(
        view === "timeline"
          ? ".tl-canvas"
          : view === "map"
            ? ".mp-map"
            : ".is-canvas",
      )
      .waitFor();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      result.violations,
      `${view}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
});

test("overlays expand without resizing the full viewport exploration", async ({
  page,
}) => {
  for (const view of ["timeline", "map", "ideas"]) {
    await page.goto(`/${view}?year=1781&thinker=kant`);
    const stage = page.locator(
      view === "timeline"
        ? ".tl-canvas-wrap"
        : view === "map"
          ? ".mp-map"
          : ".is-canvas",
    );
    await stage.waitFor();
    const before = await stage.boundingBox();
    const viewport = page.viewportSize()!;
    expect(before!.x).toBeCloseTo(0, 0);
    expect(before!.y).toBeCloseTo(0, 0);
    expect(before!.width).toBeCloseTo(viewport.width, 0);
    expect(before!.height).toBeCloseTo(viewport.height, 0);
    if (view === "timeline") {
      await stage.evaluate((node) => {
        node.scrollTop = node.scrollHeight;
      });
      await expect(page.locator(".intro")).toHaveCSS("opacity", "0");
      await expect(
        page.locator(".tl-lane-name").filter({ hasText: "Meaning" }),
      ).toBeInViewport();
      await expect(page).toHaveURL(/year=1781&thinker=kant/);
      await stage.evaluate((node) => {
        node.scrollTop = 0;
      });
      await expect(page.locator(".intro")).toHaveCSS("opacity", "1");
    }
    await expect(
      page.getByRole("button", { name: "Read about Immanuel Kant" }),
    ).toBeVisible();
    await expandInspector(page);
    await expect(
      page.getByRole("tab", { name: "Works & sources" }),
    ).toBeVisible();
    expect(await stage.boundingBox()).toEqual(before);
    await page
      .getByRole("button", { name: "Close philosopher details" })
      .click();
    await expect(
      page.getByRole("button", { name: "Read about Immanuel Kant" }),
    ).toBeFocused();
    await expect(page).toHaveURL(/year=1781&thinker=kant/);
    await page.getByRole("button", { name: /^Filters/ }).click();
    await expect(page.getByLabel("Filter traditions")).toBeVisible();
    expect(await stage.boundingBox()).toEqual(before);
    await page.keyboard.press("Escape");
    await expect(page.getByLabel("Filter traditions")).toBeHidden();
    await page.getByRole("button", { name: /The questions/ }).click();
    await expect(page.locator("#atlas-question-key")).toContainText(
      "What can we know?",
    );
    expect(await stage.boundingBox()).toEqual(before);
    await page.getByRole("button", { name: "Close question key" }).click();
  }
});

test("expanded reading overlays are accessible and keyboard dismissible", async ({
  page,
}) => {
  for (const view of ["timeline", "map", "ideas"]) {
    await page.goto(`/${view}?thinker=kant&year=1781`);
    await expandInspector(page);
    await page.getByRole("tab", { name: "Works & sources" }).click();
    await expect(page.getByRole("tabpanel")).toContainText(
      "Critique of Pure Reason",
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      result.violations,
      `${view}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Read about Immanuel Kant" }),
    ).toBeFocused();
  }
});

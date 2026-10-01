import { copyFile, mkdir, writeFile } from "node:fs/promises";

// Static hosts can serve each view directly without requiring an SPA rewrite.
for (const view of ["timeline", "map", "ideas"]) {
  await mkdir(`dist/${view}`, { recursive: true });
  await copyFile("dist/index.html", `dist/${view}/index.html`);
}
await copyFile("dist/index.html", "dist/404.html");
await writeFile("dist/.nojekyll", "");

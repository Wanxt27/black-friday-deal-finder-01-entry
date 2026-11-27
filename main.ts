// DealHound — entry program (main.ts).
// Builds the hand-in: copies app/ and screenshots/ from this repository
// into the output directory and writes /output/dossier.json using the
// kit's dossier library (vendor/makefun-frontend.ts). Node 22 only,
// standard library plus that one vendored import.
//
// The output directory itself is never removed: only the three known
// outputs (app/, screenshots/, dossier.json) are cleared before each
// run, so running twice writes byte-identical output.
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const KNOWN = ["app", "screenshots", "dossier.json"];

function assertNoLinks(dir: string): void {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = lstatSync(p);
    if (st.isSymbolicLink()) throw new Error("main.ts: symlink refused in " + p);
    if (st.isDirectory()) assertNoLinks(p);
  }
}

function wipeKnown(dir: string): void {
  for (const name of KNOWN) {
    const p = join(dir, name);
    if (existsSync(p)) rmSync(p, { recursive: true, force: true });
  }
}

function run(): void {
  mkdirSync(out, { recursive: true });
  wipeKnown(out);

  const appDir = join(here, "app");
  const shotsDir = join(here, "screenshots");
  if (!existsSync(join(appDir, "index.html"))) throw new Error("main.ts: app/index.html is missing");
  const shots = readdirSync(shotsDir).filter((n) => !n.startsWith("."));
  if (shots.length < 3 || shots.length > 4) {
    throw new Error("main.ts: expected 3-4 screenshots, found " + shots.length);
  }

  assertNoLinks(appDir);
  assertNoLinks(shotsDir);
  cpSync(appDir, join(out, "app"), { recursive: true, dereference: false });
  cpSync(shotsDir, join(out, "screenshots"), { recursive: true, dereference: false });

  const dossier = buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  writeFileSync(join(out, "dossier.json"), dossier);

  const top = readdirSync(out).sort();
  if (JSON.stringify(top) !== JSON.stringify(["app", "dossier.json", "screenshots"])) {
    throw new Error("main.ts: unexpected output contents: " + top.join(", "));
  }
  console.log("wrote " + join(out, "dossier.json") + " (" + dossier.length + " bytes)");
  console.log("verified output: app/ + " + shots.length + " screenshots + dossier.json");
}

run();

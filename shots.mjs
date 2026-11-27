#!/usr/bin/env node
// DealHound screenshots: renders app/index.html in the cached headless
// Chromium shell and saves PNGs, then converts them to JPEG.
// Usage: node shots.mjs <repo-dir> <shots-dir>
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const repo = process.argv[2];
const out = process.argv[3];
const shell = join(homedir(), ".cache/ms-playwright/chromium_headless_shell-1148/chrome-linux/headless_shell");
if (!existsSync(shell)) throw new Error("headless shell not found: " + shell);
const base = "file://" + join(repo, "app/index.html");

const shots = [
  { file: "1-board.png", url: base, w: 1280, h: 1000 },
  { file: "2-tvs.png", url: base + "#cat=TVs", w: 1280, h: 1000 },
  { file: "3-deal.png", url: base + "#deal=amz-airpods-pro-3", w: 1280, h: 1000 },
  { file: "4-board-phone.png", url: base, w: 390, h: 1250 },
];

for (const s of shots) {
  execFileSync(shell, [
    "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
    "--window-size=" + s.w + "," + s.h,
    "--virtual-time-budget=4000",
    "--screenshot=" + join(out, s.file),
    s.url,
  ], { stdio: "inherit" });
  console.log("shot:", s.file, s.w + "x" + s.h);
}

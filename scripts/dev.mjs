import { spawn } from "node:child_process";
import { readFileSync, watch, writeFileSync } from "node:fs";
import path from "node:path";
const ROOT_DIR = path.join(import.meta.dirname, "..");
const SRC = path.join(ROOT_DIR, "src");
const BOM = Buffer.from([0xef, 0xbb, 0xbf]);

function stripBomFile(full) {
  let buf;
  try {
    buf = readFileSync(full);
  } catch {
    return;
  }
  if (buf.length < 3 || !buf.subarray(0, 3).equals(BOM)) return;
  writeFileSync(full, buf.subarray(3));
  console.log(`[strip-utf8-bom] ${path.relative(ROOT_DIR, full)}`);
}

watch(SRC, { recursive: true }, (_event, filename) => {
  if (!filename?.endsWith(".css")) return;
  stripBomFile(path.join(SRC, filename));
});

// Use `npm run dev -- --webpack` if PostCSS/Turbopack native binding issues return.
const useWebpack =
  process.env.QDELTA_DEV_WEBPACK === "1" || process.argv.includes("--webpack");
const child = spawn("next", useWebpack ? ["dev", "--webpack"] : ["dev"], {
  cwd: ROOT_DIR,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

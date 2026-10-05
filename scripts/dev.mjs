import { spawn } from "node:child_process";
import { readFileSync, watch, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const child = spawn("next", ["dev"], {
  cwd: ROOT_DIR,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

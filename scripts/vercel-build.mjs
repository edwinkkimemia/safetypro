#!/usr/bin/env node
import { execSync } from "node:child_process";

function run(cmd) {
  execSync(cmd, { stdio: "inherit", shell: true });
}

try {
  run("node scripts/deploy-db.mjs");
} catch (e) {
  console.warn("vercel-build: deploy-db failed — continuing to next build");
  console.warn(String(e?.message ?? e));
}

run("npx next build");

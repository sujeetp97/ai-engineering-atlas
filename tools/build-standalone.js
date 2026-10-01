#!/usr/bin/env node
/* ===========================================================================
   Standalone test-page builder — inlines everything index.html loads into one
   file, atlas-search-test.html, that opens directly without a server.
   No dependencies. Usage:  node tools/build-standalone.js
   Exits 1 (and writes nothing) if index.html references a missing local file.

   This is a testing convenience only. The real site has no build step and
   keeps loading each file via its own <script> tag; the output is gitignored.
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SOURCE = "index.html";
const OUTPUT = "atlas-search-test.html";

// Local stylesheets and scripts as index.html writes them. External URLs (the
// Google Fonts <link>) are skipped by isLocal() and left as they are.
const STYLESHEET = /<link rel="stylesheet" href="([^"]+)"\s*\/?>/g;
const SCRIPT = /<script src="([^"]+)"><\/script>/g;

const isLocal = (ref) => !/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(ref);
// Drop the ?v= cache-busting query (and any #hash) to get the path on disk.
const toFile = (ref) => ref.replace(/[?#].*$/, "");

const inlined = [];
const missing = [];

function read(ref) {
  const file = toFile(ref);
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) { missing.push(file); return ""; }
  inlined.push(file);
  return fs.readFileSync(full, "utf8");
}

// Replacements are functions, not strings: the inlined code is full of "$"
// sequences that String.replace would otherwise treat as special patterns.
let html = fs.readFileSync(path.join(ROOT, SOURCE), "utf8");

html = html.replace(STYLESHEET, (tag, ref) =>
  isLocal(ref) ? `<style>\n${read(ref)}\n</style>` : tag);

// A literal "</script" inside inlined JS would close the block early.
html = html.replace(SCRIPT, (tag, ref) =>
  isLocal(ref)
    ? `<script>\n${read(ref).replace(/<\/(script)/gi, "<\\/$1")}\n</script>`
    : tag);

if (missing.length) {
  console.error(`\n✗ ${SOURCE} references ${missing.length} file(s) that don't exist:`);
  for (const f of missing) console.error("   • " + f);
  console.error(`\n${OUTPUT} was not written.\n`);
  process.exit(1);
}
if (!inlined.length) {
  console.error(`\n✗ Found no local stylesheets or scripts in ${SOURCE} to inline.`);
  console.error(`\n${OUTPUT} was not written.\n`);
  process.exit(1);
}

fs.writeFileSync(path.join(ROOT, OUTPUT), html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`✓ Wrote ${OUTPUT} — ${kb} KB, ${inlined.length} files inlined.`);

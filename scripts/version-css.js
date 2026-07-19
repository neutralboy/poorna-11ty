// Appends a content-hash query to index.css links so the year-long
// browser cache in _headers busts exactly when the CSS changes.
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const site = path.join(__dirname, "..", "_site");
const css = fs.readFileSync(path.join(site, "index.css"));
const hash = crypto.createHash("md5").update(css).digest("hex").slice(0, 8);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : full;
  });
}

for (const file of walk(site).filter((f) => f.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  const out = html.replaceAll('href="/index.css"', `href="/index.css?v=${hash}"`);
  if (out !== html) fs.writeFileSync(file, out);
}

console.log(`Versioned CSS links: /index.css?v=${hash}`);

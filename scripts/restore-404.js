// Next.js App Router's static export always writes its own generated
// /_not-found page to out/404.html, silently overwriting the site's real
// custom 404.html that was copied there from public/. This restores the
// original file after every build so the deployed 404 page is the real one.
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "public", "404.html");
const dest = path.join(__dirname, "..", "out", "404.html");

if (!fs.existsSync(src)) {
  console.error(`postbuild: expected ${src} to exist, but it does not.`);
  process.exit(1);
}
if (!fs.existsSync(dest)) {
  console.error(`postbuild: expected ${dest} to exist after next build, but it does not.`);
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log("postbuild: restored public/404.html over the Next.js-generated out/404.html");

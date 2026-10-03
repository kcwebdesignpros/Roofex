/**
 * Netlify build step.
 *
 * Netlify publishes a single static directory (`public/`) to its CDN, but the
 * source images live in the project-root `img/` folder. This copies them into
 * `public/img/` so Netlify serves them as static assets instead of routing every
 * image through the serverless function.
 *
 * The copy is a build artefact — `public/img/` is git-ignored. Vercel and
 * Hostinger do not need this: they mount `/img` from the project root directly.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'img');
const dest = path.join(root, 'public', 'img');

if (!fs.existsSync(src)) {
  console.error(`✗ Source image folder not found: ${src}`);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });

const count = fs.readdirSync(dest).length;
const bytes = fs.readdirSync(dest).reduce((sum, f) => sum + fs.statSync(path.join(dest, f)).size, 0);

console.log(`✓ Copied ${count} images to public/img (${(bytes / 1024 / 1024).toFixed(2)} MB)`);

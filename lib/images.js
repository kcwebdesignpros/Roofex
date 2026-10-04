/**
 * Responsive-image helpers.
 *
 * `srcset()` builds a candidate list from img/manifest.json, which is written by
 * scripts/generate-image-variants.js. Reading the manifest (rather than
 * hardcoding widths here) keeps the templates in sync with whatever variants
 * actually exist on disk — including variants the generator pruned because they
 * were not lighter than the original.
 *
 * `sizes` must describe the real rendered width of each slot. If it overstates
 * the width the browser picks a heavier candidate than it needs, which is the
 * most common way a responsive-image setup silently fails to help.
 */

const fs = require('fs');
const path = require('path');

/**
 * Fallback used when img/manifest.json is missing (fresh clone before the
 * generator has been run). Regenerate with:
 *   node scripts/generate-image-variants.js
 */
const FALLBACK = {
  'hero-bg.webp': { natural: 1916, variants: [800, 1200] },
  'about-roofex.webp': { natural: 1254, variants: [700] },
  'service-residential-roofing.webp': { natural: 1536, variants: [480, 800, 1100] },
  'service-commercial-roofing.webp': { natural: 1536, variants: [480, 800, 1100] },
  'service-roof-repair.webp': { natural: 1536, variants: [480, 800, 1100] },
  'service-roof-installation.webp': { natural: 1536, variants: [480, 800, 1100] },
  'service-roof-inspection.webp': { natural: 1536, variants: [480, 800, 1100] },
  'service-gutters.webp': { natural: 1536, variants: [480, 800, 1100] },
  'team-1.webp': { natural: 1024, variants: [480, 800] },
  'team-2.webp': { natural: 1024, variants: [480, 800] },
  'team-3.webp': { natural: 1024, variants: [480, 800] },
};

function loadManifest() {
  const candidates = [
    path.join(__dirname, '..', 'img', 'manifest.json'),
    path.join(__dirname, '..', 'public', 'img', 'manifest.json'),
  ];
  for (const file of candidates) {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (data && Object.keys(data).length) return data;
    } catch (e) {
      /* try the next candidate */
    }
  }
  return FALLBACK;
}

const IMAGES = loadManifest();

/**
 * Layout presets matching the grid definitions in style.css.
 * Keep these honest — an over-generous `sizes` makes the browser download a
 * larger file than the slot needs, especially on high-DPR phones.
 */
const SIZES = {
  // 3-column card grids: 1 col below 640px, 2 cols below 960px, 3 cols above.
  // Cards sit inside a padded container, so the smallest breakpoint is ~92vw.
  card3: '(min-width: 960px) 33vw, (min-width: 640px) 48vw, 92vw',
  // 2-column split sections
  half: '(min-width: 960px) 48vw, 92vw',
  // full-bleed (hero)
  full: '100vw',
};

function srcset(imgPath) {
  if (!imgPath) return '';
  const file = String(imgPath).split('/').pop();
  const entry = IMAGES[file];
  if (!entry || !entry.variants || !entry.variants.length) return '';

  const base = String(imgPath).replace(/\.webp$/, '');
  const parts = entry.variants.map((w) => `${base}-${w}.webp ${w}w`);
  parts.push(`${imgPath} ${entry.natural}w`);
  return parts.join(', ');
}

/** A mid-weight variant, useful as the `href`/`src` for preloaded images. */
function midVariant(imgPath) {
  if (!imgPath) return imgPath;
  const file = String(imgPath).split('/').pop();
  const entry = IMAGES[file];
  if (!entry || !entry.variants || !entry.variants.length) return imgPath;
  const mid = entry.variants[Math.floor(entry.variants.length / 2)];
  return String(imgPath).replace(/\.webp$/, `-${mid}.webp`);
}

module.exports = { srcset, midVariant, SIZES, IMAGES };

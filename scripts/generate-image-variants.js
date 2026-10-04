/**
 * Generates responsive WebP variants for every content image, then writes
 * img/manifest.json so lib/images.js can build srcset values without hardcoding
 * which variants exist.
 *
 * Source images live in /img at full size (up to 1916px wide) but are displayed
 * in slots as narrow as ~350px, so shipping the originals wastes a lot of bytes.
 *
 * Two safeguards matter here:
 *   1. Any variant that ends up LARGER than the original is deleted. Some source
 *      images are already efficiently encoded, and re-encoding at a smaller size
 *      can produce a heavier file — offering that in srcset would make the
 *      browser download more than it needs.
 *   2. The variant list is pruned so sizes increase monotonically, which keeps
 *      srcset candidate selection sane.
 *
 * Run with: node scripts/generate-image-variants.js
 * Requires sharp (install it locally — it is not a runtime dependency).
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('sharp is required to generate variants:  npm i -D sharp');
  process.exit(1);
}

const IMG = path.join(__dirname, '..', 'img');
const QUALITY = 74;

// filename -> widths to try generating
const PLAN = {
  'hero-bg.webp': [800, 1200],
  'about-roofex.webp': [700, 1000, 1100],
  'service-residential-roofing.webp': [480, 800, 1100],
  'service-commercial-roofing.webp': [480, 800, 1100],
  'service-roof-repair.webp': [480, 800, 1100],
  'service-roof-installation.webp': [480, 800, 1100],
  'service-roof-inspection.webp': [480, 800, 1100],
  'service-gutters.webp': [480, 800, 1100],
  'team-1.webp': [480, 800],
  'team-2.webp': [480, 800],
  'team-3.webp': [480, 800],
};

function variantPath(file, w) {
  return path.join(IMG, file.replace(/\.webp$/, '-' + w + '.webp'));
}

(async () => {
  // Start clean so a changed plan does not leave orphaned variants behind.
  // IMPORTANT: only remove files derived from a PLAN entry. A loose pattern like
  // /-\d+\.webp$/ would also match legitimate source files such as `team-1.webp`
  // and delete them.
  const knownVariants = new Set();
  for (const file of Object.keys(PLAN)) {
    const base = file.replace(/\.webp$/, '');
    for (const w of PLAN[file]) knownVariants.add(base + '-' + w + '.webp');
  }
  for (const f of fs.readdirSync(IMG)) {
    if (knownVariants.has(f)) fs.unlinkSync(path.join(IMG, f));
  }

  const manifest = {};
  let generated = 0;
  let pruned = 0;

  for (const [file, widths] of Object.entries(PLAN)) {
    const src = path.join(IMG, file);
    if (!fs.existsSync(src)) {
      console.log('  skip (missing): ' + file);
      continue;
    }

    const meta = await sharp(src).metadata();
    const originalBytes = fs.statSync(src).size;
    const kept = [];
    const notes = [];

    for (const w of widths) {
      if (w >= meta.width) continue;

      const out = variantPath(file, w);
      await sharp(src).resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 }).toFile(out);

      let bytes = fs.statSync(out).size;

      // Drop variants that are not actually lighter than the original.
      if (bytes >= originalBytes) {
        fs.unlinkSync(out);
        notes.push(w + 'w pruned (' + (bytes / 1024).toFixed(0) + 'KB >= original)');
        pruned++;
        continue;
      }

      // Keep sizes strictly increasing.
      if (kept.length && bytes <= kept[kept.length - 1].bytes) {
        fs.unlinkSync(out);
        notes.push(w + 'w pruned (not larger than ' + kept[kept.length - 1].w + 'w)');
        pruned++;
        continue;
      }

      kept.push({ w: w, bytes: bytes });
      generated++;
      notes.push(w + 'w=' + (bytes / 1024).toFixed(0) + 'KB');
    }

    manifest[file] = {
      natural: meta.width,
      height: meta.height,
      variants: kept.map((k) => k.w),
    };

    console.log(
      file.padEnd(34) +
      ' orig=' + (originalBytes / 1024).toFixed(0) + 'KB@' + meta.width + 'w  ' +
      notes.join(', ')
    );
  }

  fs.writeFileSync(path.join(IMG, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  console.log('\nGenerated ' + generated + ' variants, pruned ' + pruned + '.');
  console.log('Wrote img/manifest.json (' + Object.keys(manifest).length + ' entries).');
})();

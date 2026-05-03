#!/usr/bin/env node
// Descarga las fotos hot-linkeadas de los estudios y las optimiza:
// 3 tamaños responsive en webp + 1 fallback jpg.
// Actualiza data/studio-images.json con el campo `localBasename`.
//
// Uso: node scripts/download-studio-images.mjs
// Ejecuta una vez, commitea las imágenes resultantes.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const IMAGES_FILE = "data/studio-images.json";
const OUTPUT_DIR = "public/img/studios";

mkdirSync(OUTPUT_DIR, { recursive: true });

const data = JSON.parse(readFileSync(IMAGES_FILE, "utf8"));
const SIZES = [320, 640, 1024];
const ASPECT = 5 / 3; // matches StudioVisual h-44 cards

const userAgent =
  "Mozilla/5.0 (compatible; PilatiaImageOptimizer/1.0; +https://pilatia.es/metodologia/)";

let processed = 0;
let errors = 0;

for (const [slug, entry] of Object.entries(data.images)) {
  if (!entry.url) continue;

  process.stdout.write(`  ${slug.padEnd(40)} `);

  try {
    const res = await fetch(entry.url, {
      headers: {
        "User-Agent": userAgent,
        Accept: "image/webp,image/jpeg,image/png,image/*,*/*;q=0.8",
        Referer: "https://pilatia.es/",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      console.log(`✗ HTTP ${res.status}`);
      errors++;
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const original = await sharp(buffer).metadata();

    for (const width of SIZES) {
      const height = Math.round(width / ASPECT);
      const webpPath = join(OUTPUT_DIR, `${slug}-${width}.webp`);

      await sharp(buffer)
        .resize(width, height, { fit: "cover", position: "centre" })
        .webp({ quality: 78, effort: 4 })
        .toFile(webpPath);
    }

    // JPG fallback at 640w para navegadores antiguos (raro pero por si acaso)
    const jpgPath = join(OUTPUT_DIR, `${slug}-640.jpg`);
    await sharp(buffer)
      .resize(640, Math.round(640 / ASPECT), { fit: "cover", position: "centre" })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(jpgPath);

    entry.localBasename = slug;
    console.log(
      `✓ ${original.width}×${original.height} → 320w/640w/1024w webp + 640w jpg`
    );
    processed++;
  } catch (err) {
    console.log(`✗ ${err.message}`);
    errors++;
  }
}

// Sort keys alphabetically for stable diffs
const sortedImages = Object.fromEntries(
  Object.entries(data.images).sort(([a], [b]) => a.localeCompare(b))
);
data.images = sortedImages;
writeFileSync(IMAGES_FILE, JSON.stringify(data, null, 2) + "\n");

console.log(
  `\nDone · ${processed} processed · ${errors} errors · ${Object.keys(data.images).length} total entries`
);

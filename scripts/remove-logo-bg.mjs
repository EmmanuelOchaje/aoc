/**
 * Strip the flat background out of the AOC logo and write a
 * transparent PNG the site can use on both light and dark surfaces.
 *
 *   node scripts/remove-logo-bg.mjs <input> [output]
 *
 * Defaults to writing public/logo.png.
 *
 * A naive "make white transparent" pass leaves a pale halo around
 * every edge, because anti-aliased pixels are a blend of ink and
 * background. This script instead:
 *
 *   1. samples the four corners to learn the actual background colour
 *   2. derives alpha from each pixel's distance to that colour, with a
 *      soft ramp so edges stay smooth rather than jagged
 *   3. un-blends the remaining colour — recovering the original ink
 *      from `pixel = alpha*ink + (1-alpha)*background`
 *
 * Step 3 is what removes the halo. Without it, edge pixels keep the
 * background mixed into them and glow white against a dark hero.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , inputArg, outputArg] = process.argv;

if (!inputArg) {
  console.error(
    "Usage: node scripts/remove-logo-bg.mjs <input-image> [output.png]",
  );
  process.exit(1);
}

const outputPath = outputArg ?? "public/logo.png";

/** Pixels closer than this to the background are fully transparent. */
const INNER = 26;
/** Pixels beyond this are fully opaque. Between the two, alpha ramps. */
const OUTER = 68;

const input = await readFile(inputArg);
const image = sharp(input).ensureAlpha();
const { width, height } = await image.metadata();
const { data } = await image.raw().toBuffer({ resolveWithObject: true });

/** Median of the corner samples, so one stray pixel cannot skew it. */
function sampleBackground() {
  const inset = Math.max(2, Math.floor(Math.min(width, height) * 0.01));
  const corners = [
    [inset, inset],
    [width - 1 - inset, inset],
    [inset, height - 1 - inset],
    [width - 1 - inset, height - 1 - inset],
  ];

  const channels = [0, 1, 2].map((channel) => {
    const values = corners
      .map(([x, y]) => data[(y * width + x) * 4 + channel])
      .sort((a, b) => a - b);
    return (values[1] + values[2]) / 2;
  });

  return channels;
}

const [bgR, bgG, bgB] = sampleBackground();
console.log(
  `Background sampled as rgb(${Math.round(bgR)}, ${Math.round(bgG)}, ${Math.round(bgB)})`,
);

let cleared = 0;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  const distance = Math.sqrt(
    (r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2,
  );

  // Smooth ramp between INNER and OUTER
  const t = Math.min(1, Math.max(0, (distance - INNER) / (OUTER - INNER)));
  const alpha = t * t * (3 - 2 * t); // smoothstep

  if (alpha <= 0) {
    data[i + 3] = 0;
    cleared++;
    continue;
  }

  if (alpha < 1) {
    // Un-blend: recover ink colour from the composite against background
    data[i] = Math.min(255, Math.max(0, (r - (1 - alpha) * bgR) / alpha));
    data[i + 1] = Math.min(255, Math.max(0, (g - (1 - alpha) * bgG) / alpha));
    data[i + 2] = Math.min(255, Math.max(0, (b - (1 - alpha) * bgB) / alpha));
  }

  data[i + 3] = Math.round(alpha * 255);
}

await mkdir(path.dirname(outputPath), { recursive: true });

async function writePng(buffer, target) {
  const png = await sharp(buffer, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(target, png);
}

await writePng(data, outputPath);

/**
 * Knockout variant for dark surfaces.
 *
 * The wordmark is navy, which all but vanishes on the navy hero, so
 * the dark ink is remapped to white. The gold is left alone — it
 * already reads well on dark, and it is the half of the mark that
 * carries the brand. Gold is identified by its warm hue (notably
 * more red than blue); everything else is treated as ink.
 */
const light = Buffer.from(data);

for (let i = 0; i < light.length; i += 4) {
  if (light[i + 3] === 0) continue;

  const r = light[i];
  const g = light[i + 1];
  const b = light[i + 2];

  const isGold = r - b > 28 && r > 90;
  if (isGold) continue;

  // Preserve relative luminance so anti-aliased edges stay smooth
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const value = Math.round(255 - luminance * 60);
  light[i] = value;
  light[i + 1] = value;
  light[i + 2] = value;
}

const lightPath = outputPath.replace(/\.png$/, "-light.png");
await writePng(light, lightPath);

const pct = ((cleared / (width * height)) * 100).toFixed(1);
console.log(`Wrote ${outputPath} — ${width}×${height}, ${pct}% made transparent`);
console.log(`Wrote ${lightPath} — knockout variant for dark backgrounds`);
console.log(
  "Check both against their backgrounds; if edges glow, raise OUTER slightly.",
);

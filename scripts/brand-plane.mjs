/**
 * Replace the airline titles on the hero aircraft with AOC, then crop
 * away the tail.
 *
 *   node scripts/brand-plane.mjs <cutout.png> [output.png]
 *   CROP_FROM_X=470 node scripts/brand-plane.mjs ...
 *
 * Run after scripts/cutout-plane.mjs.
 *
 * Titles are removed by reconstructing the fuselage's own shading
 * across the band they occupy. The body is lit top-down and, after the
 * duotone grade, its tone varies almost entirely vertically — so
 * sampling a clean row above the lettering and one below it and
 * blending between them rebuilds the surface convincingly.
 *
 * Only pixels markedly darker than that predicted gradient are
 * replaced. Paint is always darker than the metal it sits on, so this
 * isolates the lettering and leaves panel lines, rivets and door
 * outlines intact — overwriting the whole band instead leaves an
 * obviously flat patch with a hard seam at its edges.
 */

import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , inputArg, outputArg] = process.argv;

if (!inputArg) {
  console.error("Usage: node scripts/brand-plane.mjs <cutout.png> [output.png]");
  process.exit(1);
}

const outputPath = outputArg ?? "public/plane.png";

/**
 * Fuselage angle, degrees. Negative climbs to the right.
 * Measured from the detected top edge: it falls from y=256 at x=1350
 * to y=90 at x=1850, a slope of -0.332.
 */
const FUSELAGE_ANGLE = -18;
/** Half-width of the horizontal average applied to the sample rows. */
const SMOOTH_RADIUS = 26;
/** Luminance below the predicted gradient that counts as lettering. */
const LETTER_THRESHOLD = 5;
const LETTER_RAMP = 15;
const DILATE = 4;

const image = sharp(await readFile(inputArg)).ensureAlpha();
const { width, height } = await image.metadata();
const { data } = await image.raw().toBuffer({ resolveWithObject: true });

const at = (x, y) => (y * width + x) * 4;
const opaque = (x, y) => data[at(x, y) + 3] > 200;

/** First opaque pixel scanning down a column — the top of the airframe. */
function fuselageTop(x) {
  for (let y = 0; y < height; y++) {
    if (opaque(x, y)) return y;
  }
  return -1;
}

/**
 * Last opaque pixel scanning up a column — the belly.
 *
 * The rear titles cannot hang off the top edge the way the forward
 * ones do, because above the rear fuselage the topmost opaque pixel
 * belongs to the wing passing over it. The belly is unobstructed
 * there, so that band is anchored to the bottom instead.
 */
function fuselageBottom(x) {
  for (let y = height - 1; y >= 0; y--) {
    if (opaque(x, y)) return y;
  }
  return -1;
}

/**
 * Brightest row in a window.
 *
 * A fixed offset can land the sample row inside a letter, which makes
 * the predicted gradient as dark as the paint — the letter is then
 * judged to be fuselage and survives. Paint is never brighter than the
 * surface it sits on, so the brightest row always lands on clean metal.
 */
function brightestRow(x, fromY, toY) {
  let bestY = -1;
  let bestLuma = -1;

  for (let y = Math.max(0, fromY); y <= Math.min(height - 1, toY); y++) {
    if (!opaque(x, y)) continue;
    const index = at(x, y);
    const luma =
      0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2];
    if (luma > bestLuma) {
      bestLuma = luma;
      bestY = y;
    }
  }

  return bestY;
}

const WEIGHTS = [0.2126, 0.7152, 0.0722];

/**
 * Erase the lettering inside one band.
 *
 * `anchor` picks which edge of the airframe the band hangs from, and
 * the offsets are measured from that edge — so the band tracks the
 * body as the aircraft climbs across the frame rather than drifting
 * off it.
 */
function repaintBand({
  name,
  fromX,
  toX,
  anchor,
  topOffset,
  bottomOffset,
  mode = "letters",
}) {
  const edgeOf = anchor === "bottom" ? fuselageBottom : fuselageTop;
  const columns = [];

  for (let x = fromX; x <= toX && x < width; x++) {
    const edge = edgeOf(x);
    const bandTop = edge + topOffset;
    const bandBottom = edge + bottomOffset;

    const sourceTop = edge < 0 ? -1 : brightestRow(x, bandTop - 22, bandTop + 6);
    const sourceBottom =
      edge < 0 ? -1 : brightestRow(x, bandBottom - 6, bandBottom + 22);

    const usable =
      edge >= 0 &&
      bandTop >= 0 &&
      bandBottom < height &&
      sourceTop >= 0 &&
      sourceBottom > sourceTop;

    columns.push({
      x,
      bandTop,
      bandBottom,
      sourceTop,
      sourceBottom,
      usable,
      top: usable ? [0, 1, 2].map((c) => data[at(x, sourceTop) + c]) : null,
      bottom: usable ? [0, 1, 2].map((c) => data[at(x, sourceBottom) + c]) : null,
    });
  }

  /**
   * Fill columns whose sample rows fell into a hole.
   *
   * Where the wing's trailing edge crosses the fuselage the silhouette
   * has a gap, and a sample window landing in it finds no opaque pixel
   * at all. Skipping those columns leaves an untouched stripe with the
   * old lettering still in it, so they borrow their neighbours' samples
   * instead — the surface varies slowly enough across a few columns
   * that this is indistinguishable from sampling them directly.
   */
  const nearestUsable = (from, step) => {
    for (let k = from; k >= 0 && k < columns.length; k += step) {
      if (columns[k].usable) return columns[k];
    }
    return null;
  };

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (column.usable) continue;
    if (column.bandTop < 0 || column.bandBottom >= height) continue;

    const left = nearestUsable(i - 1, -1);
    const right = nearestUsable(i + 1, 1);
    const donor = left ?? right;
    if (!donor) continue;

    const blendWith = left && right ? right : null;
    const mix = (a, b) =>
      blendWith ? a.map((v, c) => (v + b[c]) / 2) : [...a];

    column.top = mix(donor.top, blendWith?.top ?? donor.top);
    column.bottom = mix(donor.bottom, blendWith?.bottom ?? donor.bottom);
    // Keep the donor's sample offsets so the gradient maps the same way
    column.sourceTop = column.bandTop + (donor.sourceTop - donor.bandTop);
    column.sourceBottom =
      column.bandBottom + (donor.sourceBottom - donor.bandBottom);
    column.usable = true;
  }

  /**
   * Average the sample rows horizontally. Sampling each column alone
   * reproduces that column's grain, neighbouring columns disagree, and
   * the repaint comes out as vertical streaks.
   */
  const averaged = columns.map((column, index) => {
    if (!column.usable) return column;

    const top = [0, 0, 0];
    const bottom = [0, 0, 0];
    let count = 0;

    for (let k = index - SMOOTH_RADIUS; k <= index + SMOOTH_RADIUS; k++) {
      const neighbour = columns[k];
      if (!neighbour?.usable) continue;
      for (let c = 0; c < 3; c++) {
        top[c] += neighbour.top[c];
        bottom[c] += neighbour.bottom[c];
      }
      count++;
    }

    if (count === 0) return column;
    return {
      ...column,
      top: top.map((v) => v / count),
      bottom: bottom.map((v) => v / count),
    };
  });

  const mask = new Float32Array(width * height);
  const predicted = new Float32Array(width * height * 3);

  for (const column of averaged) {
    if (!column.usable) continue;
    const { x, bandTop, bandBottom, sourceTop, sourceBottom, top, bottom } =
      column;

    for (let y = bandTop; y <= bandBottom; y++) {
      if (!opaque(x, y)) continue;

      const t = (y - sourceTop) / (sourceBottom - sourceTop);
      const index = at(x, y);
      const pixel = y * width + x;

      let predictedLuma = 0;
      let actualLuma = 0;

      for (let c = 0; c < 3; c++) {
        const value = top[c] + (bottom[c] - top[c]) * t;
        predicted[pixel * 3 + c] = value;
        predictedLuma += value * WEIGHTS[c];
        actualLuma += data[index + c] * WEIGHTS[c];
      }

      const darker = predictedLuma - actualLuma;
      mask[pixel] = Math.min(
        1,
        Math.max(0, (darker - LETTER_THRESHOLD) / LETTER_RAMP),
      );
    }
  }

  // Grow the mask so anti-aliased letter edges are covered too
  const grown = new Float32Array(mask.length);
  for (const column of averaged) {
    if (!column.usable) continue;
    for (let y = column.bandTop; y <= column.bandBottom; y++) {
      let peak = 0;
      for (let dy = -DILATE; dy <= DILATE; dy++) {
        for (let dx = -DILATE; dx <= DILATE; dx++) {
          const nx = column.x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          peak = Math.max(peak, mask[ny * width + nx]);
        }
      }
      grown[y * width + column.x] = peak;
    }
  }

  // Soften the grown mask so the repaint blends rather than cuts
  let repainted = 0;
  for (const column of averaged) {
    if (!column.usable) continue;
    const { x, bandTop, bandBottom } = column;

    for (let y = bandTop; y <= bandBottom; y++) {
      let sum = 0;
      let count = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          sum += grown[ny * width + nx];
          count++;
        }
      }

      let blend = count ? sum / count : 0;

      /**
       * Flat mode replaces the whole band rather than just the
       * lettering. On the rear fuselage the paint sits in shadow, so
       * comparing against a predicted gradient cannot separate ink
       * from shading reliably. That stretch of body is nearly
       * featureless, so rebuilding all of it costs no detail worth
       * keeping — but the edges have to be feathered or the patch
       * announces itself with a seam.
       */
      if (mode === "flat") {
        const FEATHER_Y = 14;
        const FEATHER_X = 30;
        const dTop = y - bandTop;
        const dBottom = bandBottom - y;
        const dLeft = x - fromX;
        const dRight = toX - x;
        blend = Math.min(
          1,
          dTop / FEATHER_Y,
          dBottom / FEATHER_Y,
          dLeft / FEATHER_X,
          dRight / FEATHER_X,
        );
        blend = Math.max(0, blend);
      }

      if (blend <= 0.002 || !opaque(x, y)) continue;

      const pixel = y * width + x;
      const index = at(x, y);

      for (let c = 0; c < 3; c++) {
        // A touch of noise stops the smooth ramp from banding
        const noise = (Math.random() - 0.5) * 2.4;
        const target = predicted[pixel * 3 + c] + noise;
        data[index + c] = Math.max(
          0,
          Math.min(255, data[index + c] * (1 - blend) + target * blend),
        );
      }
      repainted++;
    }
  }

  console.log(`  ${name}: repainted ${repainted.toLocaleString()} px`);
}

/**
 * The two blocks of airline text.
 *
 * Forward: "中華航空 CARGO" across the upper forward fuselage.
 * Rear: "B-18771 CHINA AIRLINES" and "BOEING 777F" low on the rear
 * fuselage — hence the belly anchor.
 */
repaintBand({
  name: "forward titles",
  fromX: 1380,
  toX: 2005,
  anchor: "top",
  topOffset: 6,
  bottomOffset: 176,
});

repaintBand({
  name: "rear titles",
  fromX: 492,
  toX: 812,
  anchor: "bottom",
  topOffset: -212,
  bottomOffset: -52,
  mode: "flat",
});

const cleaned = await sharp(data, { raw: { width, height, channels: 4 } })
  .png()
  .toBuffer();

/**
 * AOC titles, set along the fuselage axis. Rendered at partial opacity
 * in a dark tone so it reads as paint catching the light rather than a
 * label pasted on top.
 */
const TEXT_X = 1815;
const TEXT_Y = 192;

const titles = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(${FUSELAGE_ANGLE} ${TEXT_X} ${TEXT_Y})">
    <text x="${TEXT_X}" y="${TEXT_Y}"
          text-anchor="middle" dominant-baseline="middle"
          font-family="DejaVu Sans, Verdana, Helvetica, sans-serif"
          font-size="128" font-weight="700" letter-spacing="6"
          fill="#2b3a4d" fill-opacity="0.88">AOC</text>
  </g>
</svg>
`);

const branded = await sharp(cleaned)
  .composite([{ input: titles, top: 0, left: 0 }])
  .png()
  .toBuffer();

/**
 * Crop away the tail. The vertical fin carries the airline's flower
 * logo, which cannot be repainted the way flat fuselage text can, so
 * the crop has to start past it.
 */
const CROP_FROM_X = Number(process.env.CROP_FROM_X ?? 470);

// sharp applies extract and trim in a fixed internal order, so they
// have to run as two separate pipelines rather than one chain.
const cropped = await sharp(branded)
  .extract({
    left: CROP_FROM_X,
    top: 0,
    width: width - CROP_FROM_X,
    height,
  })
  .png()
  .toBuffer();

await mkdir(path.dirname(outputPath), { recursive: true });

const trimmed = await sharp(cropped)
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9 })
  .toBuffer();

const final = await sharp(trimmed).metadata();
await sharp(trimmed).toFile(outputPath);

console.log(`Wrote ${outputPath} — ${final.width}x${final.height}`);

/**
 * Turn a photograph of an aircraft against sky into a graded,
 * transparent PNG for the hero.
 *
 *   node scripts/cutout-plane.mjs <input.jpg> [output.png]
 *
 * Two passes:
 *
 * 1. SKY REMOVAL by region growing from the image borders. A flat
 *    "remove pixels near one background colour" test fails on sky,
 *    which is a gradient — the top of the frame can be far from the
 *    bottom in colour while both are obviously sky. Growing outward
 *    from the edges and comparing each pixel to its *neighbour*
 *    instead follows that gradient, and stops at the hard edge of the
 *    airframe.
 *
 * 2. DUOTONE GRADE mapping luminance onto a navy-to-warm-white ramp.
 *    This matches the hero palette and, usefully, neutralises the
 *    airline's livery colours so the aircraft reads as a shape rather
 *    than as another company's advertisement.
 */

import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , inputArg, outputArg] = process.argv;

if (!inputArg) {
  console.error("Usage: node scripts/cutout-plane.mjs <input> [output.png]");
  process.exit(1);
}

const outputPath = outputArg ?? "public/plane-dark.png";

/** How different a neighbouring pixel may be and still count as sky. */
const GROW_TOLERANCE = 5;
/** Duotone endpoints. */
const SHADOW = [11, 21, 35];
const HIGHLIGHT = [252, 253, 255];
/** >1 darkens midtones, so the airframe reads as a dramatic shape. */
const GAMMA = 2.7;
/**
 * How much of the duotone to apply, 0-1.
 *
 * A full duotone throws away the photograph's own colour and replaces
 * it with a single navy-to-pale ramp, which reads as a grey wash laid
 * over the aircraft. At 0 the original pixels are kept and it stays a
 * photograph; small values just nudge it toward the palette.
 */
const GRADE = Number(process.env.GRADE ?? 1);

const image = sharp(await readFile(inputArg)).ensureAlpha();
const { width, height } = await image.metadata();
const { data } = await image.raw().toBuffer({ resolveWithObject: true });

const pixelCount = width * height;
const isSky = new Uint8Array(pixelCount);
const stack = new Int32Array(pixelCount);
let stackSize = 0;

const push = (index) => {
  if (!isSky[index]) {
    isSky[index] = 1;
    stack[stackSize++] = index;
  }
};

// Seed from every border pixel
for (let x = 0; x < width; x++) {
  push(x);
  push((height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  push(y * width);
  push(y * width + width - 1);
}

const distance = (a, b) => {
  const dr = data[a * 4] - data[b * 4];
  const dg = data[a * 4 + 1] - data[b * 4 + 1];
  const db = data[a * 4 + 2] - data[b * 4 + 2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

while (stackSize > 0) {
  const index = stack[--stackSize];
  const x = index % width;
  const y = (index - x) / width;

  if (x > 0) {
    const n = index - 1;
    if (!isSky[n] && distance(index, n) < GROW_TOLERANCE) push(n);
  }
  if (x < width - 1) {
    const n = index + 1;
    if (!isSky[n] && distance(index, n) < GROW_TOLERANCE) push(n);
  }
  if (y > 0) {
    const n = index - width;
    if (!isSky[n] && distance(index, n) < GROW_TOLERANCE) push(n);
  }
  if (y < height - 1) {
    const n = index + width;
    if (!isSky[n] && distance(index, n) < GROW_TOLERANCE) push(n);
  }
}

const skyPixels = isSky.reduce((sum, value) => sum + value, 0);
console.log(
  `Sky: ${((skyPixels / pixelCount) * 100).toFixed(1)}% of ${width}x${height}`,
);

if (skyPixels / pixelCount > 0.97) {
  console.error(
    "Almost everything was treated as sky — the fill leaked through the subject. Lower GROW_TOLERANCE.",
  );
  process.exit(1);
}

/**
 * Keep only the largest solid region.
 *
 * Sensor noise and thin cloud leave scattered pixels that survive the
 * sky pass. They are invisible on their own but they anchor the crop
 * to the full frame and litter the transparent PNG, so everything
 * except the single biggest connected blob — the aircraft — goes.
 */
const component = new Int32Array(pixelCount).fill(-1);
const queue = new Int32Array(pixelCount);
let bestLabel = -1;
let bestSize = 0;
let label = 0;

for (let seed = 0; seed < pixelCount; seed++) {
  if (isSky[seed] || component[seed] !== -1) continue;

  let head = 0;
  let tail = 0;
  queue[tail++] = seed;
  component[seed] = label;
  let size = 0;

  while (head < tail) {
    const index = queue[head++];
    size++;

    const x = index % width;
    const y = (index - x) / width;

    const neighbours = [
      x > 0 ? index - 1 : -1,
      x < width - 1 ? index + 1 : -1,
      y > 0 ? index - width : -1,
      y < height - 1 ? index + width : -1,
    ];

    for (const n of neighbours) {
      if (n < 0 || isSky[n] || component[n] !== -1) continue;
      component[n] = label;
      queue[tail++] = n;
    }
  }

  if (size > bestSize) {
    bestSize = size;
    bestLabel = label;
  }
  label++;
}

console.log(
  `Kept largest of ${label} regions — ${bestSize.toLocaleString()} px (${((bestSize / pixelCount) * 100).toFixed(1)}% of frame)`,
);

for (let i = 0; i < pixelCount; i++) {
  if (!isSky[i] && component[i] !== bestLabel) isSky[i] = 1;
}

// Alpha, softened by one 3x3 pass so edges are not stair-stepped
const alpha = new Float32Array(pixelCount);
for (let i = 0; i < pixelCount; i++) alpha[i] = isSky[i] ? 0 : 1;

/**
 * Soften the cut edge.
 *
 * A single blur pass over a hard 0/1 mask still leaves the stair-steps
 * of the original boundary visible. Two passes approximate a gaussian,
 * and remapping the result pulls the edge in by a fraction of a pixel
 * so no ring of original sky survives around the airframe.
 */
function blur(source) {
  const out = new Float32Array(pixelCount);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          sum += source[ny * width + nx];
          count++;
        }
      }
      out[y * width + x] = sum / count;
    }
  }
  return out;
}

const softened = blur(blur(alpha));
const smoothed = new Float32Array(pixelCount);
for (let i = 0; i < pixelCount; i++) {
  // Erode slightly, then rescale so interior stays fully opaque
  smoothed[i] = Math.min(1, Math.max(0, (softened[i] - 0.22) / 0.62));
}

// Grade and composite alpha, tracking the opaque bounding box
let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;

for (let i = 0; i < pixelCount; i++) {
  const a = smoothed[i];

  if (a <= 0.004) {
    data[i * 4 + 3] = 0;
    continue;
  }

  const luminance =
    (0.2126 * data[i * 4] +
      0.7152 * data[i * 4 + 1] +
      0.0722 * data[i * 4 + 2]) /
    255;
  const toned = Math.pow(Math.min(1, Math.max(0, luminance)), GAMMA);

  for (let c = 0; c < 3; c++) {
    const duotone = SHADOW[c] + (HIGHLIGHT[c] - SHADOW[c]) * toned;
    data[i * 4 + c] = Math.round(
      data[i * 4 + c] * (1 - GRADE) + duotone * GRADE,
    );
  }
  data[i * 4 + 3] = Math.round(a * 255);

  const x = i % width;
  const y = (i - x) / width;
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
}

const pad = 4;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const cropWidth = Math.min(width - left, maxX - minX + pad * 2);
const cropHeight = Math.min(height - top, maxY - minY + pad * 2);

await mkdir(path.dirname(outputPath), { recursive: true });

await sharp(data, { raw: { width, height, channels: 4 } })
  .extract({ left, top, width: cropWidth, height: cropHeight })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(`Wrote ${outputPath} — cropped to ${cropWidth}x${cropHeight}`);

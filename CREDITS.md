# Image credits

## Hero aircraft — `public/plane-dark.png`

Boeing 777F departing Taoyuan.

- **Photographer:** 4300streetcar
- **Source:** [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:China_Airlines_Cargo_Boeing_777F_B-18771_departing_Taoyuan_February_2026_1.jpg)
- **Licence:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)
- **Changes:** sky background removed (`scripts/cutout-plane.mjs`).
  Colour is unaltered — the script's duotone grade is available via the
  `GRADE` env var but is set to 0, because grading laid a grey wash
  over the airframe.

CC BY 4.0 requires that modifications are indicated, which the line
above does.

The aircraft wears China Airlines livery, and "CARGO", "CHINA
AIRLINES" and the registration B-18771 are legible. `scripts/brand-plane.mjs`
can paint those out and letter the fuselage as AOC, but the repaint
flattens the surface enough that the aircraft stops looking like a
photograph — so it is deliberately not applied. Removing the livery
properly needs either a different source image or retouching by hand.

CC BY 4.0 requires that the photographer is credited wherever the image
is used, including on the deployed site. The credit currently sits in
the site footer. Removing it would breach the licence.

**To drop the attribution requirement**, replace the image with one of:
- a commercially licensed stock photo or 3D render
- a photograph AOC owns
- a public-domain (CC0) image

Then regenerate with `node scripts/cutout-plane.mjs <input> public/plane-dark.png`
and delete this entry.

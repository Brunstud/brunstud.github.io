# Personal mark

Three editable SVG candidates live in `public/brand/`. `scripts/review-icons.mjs` renders each at actual 16, 32, and 64 pixel sizes on light and dark backgrounds; the comparison is saved to `qa/icon-candidates.png`.

| Concept | Distinctiveness | Academic fit | Simplicity | 16 / 32px | Monochrome |
| --- | --- | --- | --- | --- | --- |
| Current · SH | Initials give a personal signature | Strongest; reads as a quiet monogram | Two letter gestures | Both legible; H stabilizes the curved S | Works |
| Paired strokes | Evokes oars and forward motion | More sporting than academic | Several short intersections | Tips merge at 16px; stronger at 32px | Works |
| Confluence | Suggests two paths meeting | Restrained but less personal | Symmetric curves | Clear silhouette; can resemble an hourglass | Works |

Selected **Current · SH** after visual inspection. Its curved S suggests current and rhythm without depicting a boat; the upright H provides structure. It is integrated into navigation, favicon, Apple icon, and the social preview. The SVG favicon switches ink and background with the browser’s color preference. Raster icons use a warm-white tile, retaining a visible silhouette on either browser interface.

Edit the selected SVG, then run `node scripts/build-icons.mjs`. Keep the same paths in `src/components/brand-mark.tsx` and the Open Graph image. This is a vector mark, not AI-generated artwork.

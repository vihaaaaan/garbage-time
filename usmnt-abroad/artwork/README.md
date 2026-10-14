# Artwork pipeline

The crest does not use image generation or raster tracing. The source is native SVG path geometry, and `scripts/build-artwork.mjs` copies it unchanged so its proportions and edges stay exact at every display size.

## Regenerate deterministic assets

```bash
npm run artwork
```

Inputs:

- `artwork/source/usmnt-crest.svg`
- `artwork/source/hero-moments/*.jpg`

Outputs:

- `public/brand/usmnt-crest.svg`
- `public/hero/*.webp`

The vector crest is the 1995 U.S. Soccer mark from [Logos Download](https://logos-download.com/brands/united-states-soccer-federation); it retains the source `321.508 × 374.175` viewBox without extra canvas padding.

## Hero photography

The selected hero photos are by [Bryan Berlin](https://commons.wikimedia.org/wiki/User:Berlination) and are used under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Source files:

- [Australia v USA, June 19, 2026 — 260](https://commons.wikimedia.org/wiki/File:Australia_v_USA_19_June_2026-260.jpg)
- [Tim Ream, Christian Pulisic and Chris Richards, Belgium v USA](https://commons.wikimedia.org/wiki/File:Tim_Ream_Christian_Pulisic_Chris_Richards_Belgium_v_USA_6_July_2026-007.jpg)
- [Tim Weah, USMNT v Belgium — 131](https://commons.wikimedia.org/wiki/File:Tim_Weah_USMNT_v_Belgium_Mar_28_2026-131.jpg)
- [Folarin Balogun, USMNT v Belgium — 161](https://commons.wikimedia.org/wiki/File:Folarin_Balogun_USMNT_v_Belgium_Mar_28_2026-161.jpg)

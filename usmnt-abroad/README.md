# USMNT Abroad

A standalone Vite + React MVP for exploring USMNT players at European clubs.

## Run it

```bash
npm install
npm run dev
```

## MVP boundary

The app currently covers the durable product loop: browse, search, filter, and inspect players. Names, clubs, national-team caps, goals, and European competition participation are sourced from the [September 17, 2026 U.S. Soccer roster announcement](https://www.ussoccer.com/stories/2026/09/usmnt/mauricio-pochettino-september-october-roster).

Homepage fixtures and form notes are static and live in `src/data/home.ts`. That keeps the current MVP editable without a backend while preserving a clean seam for a future schedule or statistics feed.

Live club appearances, minutes, results, and upcoming kickoffs are intentionally not mocked. Those should arrive through a real football data provider in the next product layer.

## Visual system

The original Geist Pixel face drives the wordmark and major interface headings, while longer descriptions and dense roster data stay in a plain sans-serif. Everything renders in lowercase. The product palette is limited to deep navy, royal blue, red, white, and pale blue.

Player rows use compact, position-colored initial markers so the static MVP stays visually consistent without relying on incomplete portrait coverage.

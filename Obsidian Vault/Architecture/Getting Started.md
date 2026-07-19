---
tags: [architecture, howto]
---

# Getting Started

## Prerequisites
- Node.js (18+ recommended) and npm.

## Run locally
```bash
npm install
npm run dev        # Vite dev server, usually http://localhost:5173
```

Open the dev URL — you land on [[Admin Page]] (`/`).

## Try the projector flow
1. On [[Admin Page]], search or type a reference (e.g. `Mark 6:3`) in [[Search Panel]].
2. Enable one or more languages in [[Projector Controls]] and pick a background.
3. Click the present-view button in the [[Action Bar]] to open [[Present View Page]]
   in a new window (drag it to the second screen / projector).
4. Click **Show** — verses appear via the [[Projector Channel]].

## Other commands
```bash
npm run build      # production build → dist/
npm run preview    # serve the built app
npm run lint       # ESLint, zero-warning policy
```

## Gotchas
- Needs internet: all text comes from [[holybible.ge API]]; there is no local data.
- Whole-Bible search is deliberately slow (throttled) — see [[Verse Search]].
- The projector is a **separate window**; popup blockers can stop [[Action Bar]]
  from opening it.

## Related
- [[Tech Stack]] · [[Architecture]]

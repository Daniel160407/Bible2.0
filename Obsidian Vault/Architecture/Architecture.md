---
tags: [architecture]
---

# Architecture

Front-end-only SPA. React Router drives 5 top-level [[#Pages]]; a React Query
layer wraps the single external [[holybible.ge API]]; a BroadcastChannel bridges
the two windows.

## Layered structure (`src/`)

| Layer | Path | Responsibility |
|---|---|---|
| Entry | `main.jsx`, `App.jsx` | Mount React, set up `QueryClientProvider` + router |
| Pages | `pages/` | Route-level screens — see [[#Pages]] |
| Features | `features/admin/` | Composable admin-console widgets |
| UI | `components/ui/` | Tiny shared bits (`Loader`, `MadeBy`) |
| Hooks | `hooks/` | Data layer: [[Bible Queries (hooks)]], [[Verse Search]] |
| API | `api/bibleApi.js` | Thin axios wrapper over [[holybible.ge API]] |
| Lib | `lib/` | Pure helpers: [[Constants & Data Model]], [[Reference Parsing]], [[Projector Channel]] |

## Pages

```
App.jsx (BrowserRouter)
├── /             → AdminPage        [[Admin Page]]
├── /presentview  → PresentViewPage  [[Present View Page]]
├── /bible        → BiblePage        [[Bible Page]]
├── /documentation→ DocumentationPage[[Documentation Page]]
└── /donation     → DonationPage     [[Donation Page]]
```

## The two-window model

The admin console and projector are **independent windows** of the same origin.
[[Action Bar]] opens `/presentview` with `window.open`. They never share React
state — they exchange messages over the `projectorData` [[Projector Channel]]:

```
Admin ([[Projector Panel]])                 Projector ([[Present View Page]])
  │  postMessage {type:'style', ...}  ──────►  applies style
  │  postMessage {type:'verses', ...} ──────►  shows verses
  │  postMessage {type:'clear'}       ──────►  hides verses
  ◄────── postMessage {type:'sync-request'}    (on projector mount)
```

Because state lives only in the admin window, the projector requests a re-sync
on mount so a freshly opened projector immediately reflects current settings.

## Data flow

1. [[Search Panel]] / [[Bible Page]] pick a language, book, chapter, or search term.
2. Hooks in [[Bible Queries (hooks)]] fetch via `bibleApi` and cache with React Query
   (`staleTime: Infinity` — scripture never changes).
3. Selection flows up into `AdminPage` state (`display`, `separatedVerse`).
4. [[Projector Panel]] re-fetches the same passage in every enabled language and
   broadcasts it to the projector.

## Cross-cutting concerns
- **[[Book Indexing]]** — canonical (Georgian) order vs English list order.
- **Throttling** — whole-Bible [[Verse Search]] batches requests to avoid rejection.
- **Persistence** — cookies (`js-cookie`) remember reader/operator selections.

## Related
- [[Overview]] · [[Tech Stack]] · [[Getting Started]]

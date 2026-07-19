---
tags: [feature, admin]
---

# Search Panel

`src/features/admin/SearchPanel.jsx` (~300 lines — the biggest feature)

The operator's primary input on [[Admin Page]]. Selects language/book/chapter or
runs searches, and reports the chosen passage up via `onDisplayChange`.

## Responsibilities
- Language + version pickers (`PREVIEW_LANGUAGES`).
- Book / chapter selection using [[Bible Queries (hooks)]] (`useBibleMeta`,
  `useChapter`); book index mapped per language via [[Book Indexing]].
- **Reference lookup** — `parseReference` + `findBook` ([[Reference Parsing]]).
- **Search** — single book or whole Bible via [[Verse Search]].
- Persists selections to cookies (`js-cookie`).
- Shows the [[Welcome Farmer]] to first-time users; [[Loader]] while fetching.

## Output shape
Builds an `EMPTY_DISPLAY`-shaped object (`book`, `bookIndex`, `chapter`, `verse`,
`till`, `verses`) — see [[Constants & Data Model]] — and hands it to
`onDisplayChange`.

## Related
- [[Verse Preview]] · [[Reference Parsing]] · [[Verse Search]]

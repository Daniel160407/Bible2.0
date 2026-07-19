---
tags: [data, hooks, react-query]
---

# Bible Queries (hooks)

`src/hooks/useBibleQueries.js` — the React Query data layer over [[holybible.ge API]].

Scripture never changes, so everything uses **`staleTime: Infinity`** (fetch once,
cache forever for the session).

## Hooks
| Hook | Returns |
|---|---|
| `useBibleMeta(language)` | `{ versions, books }` for one language |
| `useProjectorMeta()` | meta for **all** `PROJECTOR_LANGUAGES` at once (`useQueries` + `combine`), keyed by language key |
| `useChapter({ bookIndex, chapter, version, language })` | `{ verses, chapterCount, verseCount }` |

## Notes
- `metaQueryOptions` fetches book/version metadata by requesting `FIRST_BOOK_INDEX`.
- `useChapter` is `enabled` only when `bookIndex && chapter && language`, and uses
  `keepPreviousData` so the UI doesn't flash while switching chapters.
- Callers pass **language-list** book indexes here — they map from canonical first
  via `mapBookIndexForLanguage` ([[Book Indexing]]).

## Related
- [[holybible.ge API]] · [[Verse Search]] · [[Constants & Data Model]]

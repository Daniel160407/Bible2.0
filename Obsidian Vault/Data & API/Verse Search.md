---
tags: [data, hooks, search, quirks]
---

# Verse Search

`src/hooks/useVerseSearch.js` — full-text verse search over [[holybible.ge API]].

## Two modes
- **`searchBook`** — search a single book (one request).
- **`searchWholeBible`** — one request **per book**, throttled and reported
  incrementally via `onResults`.

## Throttling (why it's deliberately slow)
The server rejects bursts, so whole-Bible search batches requests:
```
MAX_CONCURRENT_REQUESTS = 3
REQUEST_DELAY_MS        = 300   // between batches
```
Books are processed in groups of 3 with a 300ms pause; results stream in as each
batch completes (`onResults([...found])`). See quirk #4 in [[holybible.ge API]].

## Race handling
A `runIdRef` counter tags each run; stale runs (superseded by a newer search)
bail out so late responses can't overwrite fresh results, and `isSearching`
tracks the active run only.

## Result normalization
`normalizeSearchVerse` tags each verse with `searched: true`, its `book` name, and
a **canonical** `bookIndex` (`canonicalBookIndex(bookIndexFromWigni(wigni), language)`)
— reconciling the `wigni` reference and per-language order (see [[Book Indexing]]).

## Related
- [[holybible.ge API]] · [[Book Indexing]] · [[Search Panel]] · [[Bible Page]]

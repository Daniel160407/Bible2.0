---
tags: [data, parsing]
---

# Reference Parsing

`src/lib/parseReference.js` — turns a typed reference like `Mark 6:3-5` into a
structured lookup.

## `parseReference(text)`
Regex `/(\d?\D+?) (\d+)(?::(\d+))?(?:-(\d+))?/`. Returns:
```js
{ bookQuery, chapter, verse, till }   // or null if not a reference
```
Accepts:
- `Mark 6` — chapter only (`verse`/`till` null)
- `Mark 6:3` — single verse
- `Mark 6:3-5` — verse range
- Leading digit for numbered books (e.g. `1 John 2:1`).

## `findBook(books, query)`
Case-insensitive **prefix** match against the full `bibleNames` list. Returns
`{ name, bookIndex }` where `bookIndex` is the **1-based API index** (list index
+ 1), or `null`.

> The index returned is a raw list index — callers reconcile language order via
> [[Book Indexing]] as needed.

## Used by
[[Search Panel]] and [[Bible Page]] for the reference lookup box.

## Related
- [[holybible.ge API]] · [[Book Indexing]]

---
tags: [data, quirks, indexing]
---

# Book Indexing

> The single trickiest thing in the codebase. Get the direction wrong and English
> previews select the wrong book. Defined in `src/lib/constants.js`.

## The problem
The [[holybible.ge API]] returns book names ordered by the **Georgian canon** for
`geo`/`russian`, but **standard English order** for `eng`. The two lists agree for
books 1–47, then diverge for the epistles (indexes **48–68**): in the Georgian
canon James…Jude come *before* Romans; in English they come after.

The app uses a **canonical (Georgian-order) book index** internally and remaps
only when talking to the English list.

## The mapping (`ENGLISH_BOOK_INDEXES`)
Maps canonical (Georgian-order) index → index in the **English** list:

```
48→62 49→63 50→64 51→65 52→66 53→67 54→68   (James..Jude move later)
55→48 56→49 57→50 58→51 59→52 60→53 61→54   (Romans.. move earlier)
62→55 63→56 64→57 65→58 66→59 67→60 68→61
```

`CANONICAL_BOOK_INDEXES` is the inverse (built by flipping the map).

> ⚠️ **It is NOT an involution.** Pre-refactor code applied it in the *wrong
> direction* for English preview selections — the classic bug here. Always use the
> named helpers, never invert by hand.

## Helpers (use these, don't hand-roll)
| Helper | Direction |
|---|---|
| `mapBookIndexForLanguage(idx, apiCode)` | canonical → language-list index (only remaps for `eng`) |
| `canonicalBookIndex(listIndex, apiCode)` | language-list → canonical (only remaps for `eng`) |
| `bookNameForLanguage(books, idx, apiCode)` | canonical index → display name in that language's list |

Also recall `FIRST_BOOK_INDEX = 4` (headers occupy 0–2; `w` = list index + 1) and
search results use `wigni` → `parseInt(wigni)+3` — see [[holybible.ge API]].

## Where it matters
- [[Search Panel]] / [[Bible Page]] — book selection & display.
- [[Projector Panel]] — re-fetching a passage per language.
- [[Verse Search]] — tagging results with `canonicalBookIndex`.

## Related
- [[holybible.ge API]] · [[Constants & Data Model]]

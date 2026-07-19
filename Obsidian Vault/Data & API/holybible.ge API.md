---
tags: [api, data, quirks]
source: verified against live API 2026-07-10
---

# holybible.ge API

The single external data source. Wrapped in `src/api/bibleApi.js`. There is no
other backend. **Verified against the live API on 2026-07-10** — treat as
authoritative but re-verify before relying on edge cases.

## Endpoint

```
GET https://holybible.ge/service.php
```

### Query params (`fetchBible`)
| Param | Meaning |
|---|---|
| `w`  | book index — **1-based over the full `bibleNames` list** |
| `t`  | chapter number |
| `m`  | (verse — sent empty) |
| `s`  | search text |
| `mv` | version / translation |
| `language` | language code (`geo`, `eng`, `russian`, …) |
| `page` | pagination |

## Response shape
| Field | Meaning |
|---|---|
| `versions` | available translations for the language |
| `bibleNames` | `[Bible, Old Testament, New Testament, ...66 book names]` |
| `tavi[0].cc` | **chapter count** of the requested book (`getChapterCount`) |
| `muxli[0].cc` | **verse count** of the requested chapter (`getVerseCount`) |
| `bibleData[]` | verses: `{ id, bv (html text), tavi (chapter), muxli (verse), wigni }` |

## ⚠️ Quirks (the important part)

1. **`bibleNames` has 69 entries.** Indexes 0–2 are headers
   ("Bible", "Old Testament", "New Testament"); **real books start at index 3.**
   The `w` param = full-list index + 1, so **Genesis is `w=4`** (`FIRST_BOOK_INDEX`).
2. **Book order differs by language.** Georgian/Russian use the **Georgian canon**
   order (epistles James…Jude come *before* Romans). English uses standard English
   order. → see [[Book Indexing]].
3. **Search results reference books via `wigni`**, not `w`.
   API book index = `parseInt(wigni) + 3` (`bookIndexFromWigni`).
4. **Whole-Bible search must be throttled** (~3 concurrent, 300ms between batches)
   or the server rejects requests. → see [[Verse Search]].
5. **Russian language code is `russian`**, not `rus`.
6. `bv` is **HTML** — sanitize/strip before clipboard (`stripHtml` on [[Bible Page]]).

## Helpers (`api/bibleApi.js`)
- `fetchBible(params)` — the axios GET.
- `getChapterCount(data)` / `getVerseCount(data)`.
- `bookIndexFromWigni(wigni)` → `parseInt(wigni,10) + 3`.

## Related
- [[Book Indexing]] · [[Bible Queries (hooks)]] · [[Verse Search]] · [[Glossary]]

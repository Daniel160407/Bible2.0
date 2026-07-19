---
tags: [reference, glossary]
---

# Glossary

Domain and codebase terms.

| Term | Meaning |
|---|---|
| **Admin / operator** | The person running [[Admin Page]] to control projection |
| **Projector / present view** | The second-screen window ([[Present View Page]]) |
| **`w`** | Book index param — 1-based over full `bibleNames` list; Genesis = 4 |
| **`t`** | Chapter param |
| **`s` / `mv`** | Search text / version (translation) params |
| **`bibleNames`** | 69-entry list; 0–2 headers, real books from index 3 |
| **`bibleData`** | Array of verse objects returned by the API |
| **`bv`** | Verse text (HTML) |
| **`tavi`** | Chapter (Georgian) — also `tavi[0].cc` = chapter count |
| **`muxli`** | Verse (Georgian) — also `muxli[0].cc` = verse count |
| **`wigni`** | Book reference in search results; API index = `wigni + 3` |
| **`cc`** | Count (chapter or verse count depending on field) |
| **Canonical index** | Internal Georgian-canon book index (see [[Book Indexing]]) |
| **Separated verse** | A single verse pulled from a passage to project alone |
| **`FIRST_BOOK_INDEX`** | `4` — where real books start |

## Related
- [[holybible.ge API]] · [[Book Indexing]] · [[Constants & Data Model]]

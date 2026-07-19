---
tags: [page, reader]
route: /bible
---

# Bible Page

`src/pages/BiblePage.jsx` · route `/bible`

A **standalone Bible reader**, independent of the projector flow. Browse whole
chapters, search, and copy verses to the clipboard.

## Features
- Language / version / book / chapter selectors.
- Remembers the last `language`, `version`, `book`, `chapter` in **cookies**
  (`js-cookie`, `expires: 7` days).
- Full-book and whole-Bible search via [[Verse Search]].
- Reference lookup via [[Reference Parsing]] (`parseReference` + `findBook`).
- Highlights a verse; `stripHtml` cleans API markup for clipboard copy.

## Data
- `useBibleMeta(language)` → books + versions.
- `useChapter({ bookIndex, chapter, version, language })` → verses + counts.
  Book index is mapped for the language via `mapBookIndexForLanguage`
  (see [[Book Indexing]]).

## Related
- [[Bible Queries (hooks)]] · [[Verse Search]] · [[Reference Parsing]]

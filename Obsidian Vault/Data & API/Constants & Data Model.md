---
tags: [data, constants]
---

# Constants & Data Model

`src/lib/constants.js` — shared constants, the projector data model, and the
[[Book Indexing]] helpers.

## Indexing
- `FIRST_BOOK_INDEX = 4` — books start here (`bibleNames` 0–2 are headers).
- `ENGLISH_BOOK_INDEXES`, `CANONICAL_BOOK_INDEXES`, `mapBookIndexForLanguage`,
  `canonicalBookIndex`, `bookNameForLanguage` → see [[Book Indexing]].

## Languages
- `PREVIEW_LANGUAGES` — 8 options for reader/preview: GEO, ENG, RUS, UA, FR, GR,
  TR, SP.
- `PROJECTOR_LANGUAGES` — 3 for projection, each `{ key, apiCode, label,
  defaultVersion }`: Georgian, English (`eng`), Russian (`russian`).

## Projector styling
- `PROJECTOR_FONTS` — Banner, Valera, Mouldy, Oswald.
- `TEXT_COLORS` (6) / `STROKE_COLORS` (white, black).
- `BACKGROUNDS` — `/backgrounds/1..20.jpeg`; `DEFAULT_BACKGROUND = .../16.jpeg`.
- `DEFAULT_PROJECTOR_STYLE` — `{ fontSize: 7, font: 'Banner', textColor:
  '#f4f4f4', textAlign: 'left', strokeColor: '', strokeWidth: 0, background }`.

## Selection shape
`EMPTY_DISPLAY = { book, bookIndex, chapter, verse, till, verses }` — the object
[[Admin Page]] holds as `display` and [[Search Panel]] produces.

## Related
- [[Book Indexing]] · [[Projector Controls]] · [[holybible.ge API]]

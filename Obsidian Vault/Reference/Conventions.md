---
tags: [reference, conventions]
---

# Conventions

Patterns to follow when working in this codebase.

## Structure
- **Pages** (`pages/`) are route-level; **features** (`features/admin/`) are
  admin widgets; **hooks** hold data logic; **lib** is pure helpers. Keep API
  access inside `api/` + `hooks/`, not in components.
- Shared magic values live in [[Constants & Data Model]] — don't inline colors,
  fonts, language lists, or book-index maps.

## Book indexing
- Always use the named helpers from [[Book Indexing]]
  (`mapBookIndexForLanguage` / `canonicalBookIndex` / `bookNameForLanguage`).
  Never invert `ENGLISH_BOOK_INDEXES` by hand — it is **not** an involution.

## Data fetching
- Go through [[Bible Queries (hooks)]]; scripture is cached with
  `staleTime: Infinity`.
- Whole-Bible search must stay throttled ([[Verse Search]]) — don't remove the
  batching/delay.

## Styling
- Tailwind v4 (via Vite plugin, no config file). Theme tokens/animations live in
  `src/index.css` (`bg-card`, `bg-field`, `text-accent`, `animate-*`).
- Long class strings are often extracted to a `const fooClass` at module top —
  match that pattern.

## Persistence
- Reader/operator selections persist via cookies (`js-cookie`), typically
  `expires: 7`.

## Misc
- API `bv` is HTML — sanitize before clipboard (`stripHtml`).
- Lint is zero-warning (`npm run lint`).

## Related
- [[Architecture]] · [[Tech Stack]]

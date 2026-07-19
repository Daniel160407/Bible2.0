---
tags: [page, admin]
route: /
---

# Admin Page

`src/pages/AdminPage.jsx` · route `/`

The **operator console**. Composes the admin features and owns the shared
selection state that everything else reads.

## State it owns
- `display` — the currently selected passage / search results (`EMPTY_DISPLAY`
  shape from [[Constants & Data Model]]).
- `separatedVerse` — a single verse the operator pulled out of a passage to
  project on its own; cleared whenever `display` changes.

## Layout (children)
1. [[Search Panel]] — pick language/book/chapter or search → `onDisplayChange`.
2. [[Verse Preview]] — renders `display` / `separatedVerse`, offers "Separate".
3. [[Projector Panel]] — styling + language toggles; broadcasts to the projector.
4. [[Action Bar]] — floating nav + opens [[Present View Page]].

```
onDisplayChange(next) → setDisplay(next); setSeparatedVerse(null)
```

## Related
- [[Present View Page]] · [[Architecture]]

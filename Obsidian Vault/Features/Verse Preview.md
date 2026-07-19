---
tags: [feature, admin]
---

# Verse Preview

`src/features/admin/VersePreview.jsx`

Shows the operator **what will be projected** before sending it. Renders one of:
- the separated single verse (if `separatedVerse` set), or
- search results — each card has a **Separate** button (`onSeparate`), or
- the selected passage (`display.verses`).

Verse HTML from the API (`bv`) is injected with `dangerouslySetInnerHTML`;
references render as `book chapter:verse`.

Props: `display`, `separatedVerse`, `onSeparate` — all owned by [[Admin Page]].

## Related
- [[Search Panel]] · [[Projector Panel]]

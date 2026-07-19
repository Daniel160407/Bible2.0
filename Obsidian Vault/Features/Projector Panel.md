---
tags: [feature, admin, projector]
---

# Projector Panel

`src/features/admin/ProjectorPanel.jsx`

Owns all **projector state** and the [[Projector Channel]] that drives
[[Present View Page]]. The bridge between operator intent and the second screen.

## State
- `style` — `DEFAULT_PROJECTOR_STYLE` (font, size, color, stroke, align, background).
- `enabledLanguages` — which of `PROJECTOR_LANGUAGES` (GEO/ENG/RUS) to show.
- Per-language versions, via `useProjectorMeta` ([[Bible Queries (hooks)]]).

## Behaviour
- Renders [[Projector Controls]] and [[Background Picker]].
- When `display`/`separatedVerse` change, **re-fetches the same passage in every
  enabled language** (`fetchBible`, book index mapped via [[Book Indexing]]) and
  broadcasts `{ type: 'verses', verses }` keyed by language key.
- Broadcasts `{ type: 'style' }` on style changes and answers `sync-request`
  from a freshly opened projector.

## Related
- [[Projector Controls]] · [[Background Picker]] · [[Present View Page]]

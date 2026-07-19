---
tags: [page, projector]
route: /presentview
---

# Present View Page

`src/pages/PresentViewPage.jsx` · route `/presentview`

The **projector window** shown to the congregation on the second screen. It has
no controls — it is entirely driven by messages from [[Admin Page]] over the
[[Projector Channel]].

## Behaviour
- On mount: opens the `projectorData` channel and immediately posts
  `{ type: 'sync-request' }` so the admin re-sends current style (handles the
  case where the projector opens after settings were already chosen).
- Listens for messages:
  - `style` → update font/size/color/stroke/align/background.
  - `verses` → set `versesByLanguage` and become visible.
  - `clear` → hide.
- Renders verses per enabled language (`PROJECTOR_LANGUAGES`) with computed
  `WebkitTextStroke` and `fontSize = style.fontSize * 10` px.

## State
`style` (default `DEFAULT_PROJECTOR_STYLE`), `versesByLanguage`, `visible`.

## Related
- [[Projector Panel]] (the sender) · [[Projector Channel]] (the protocol)
- [[Constants & Data Model]] (`PROJECTOR_LANGUAGES`, `DEFAULT_PROJECTOR_STYLE`)

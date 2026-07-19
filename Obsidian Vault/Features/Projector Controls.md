---
tags: [feature, admin, projector]
---

# Projector Controls

`src/features/admin/ProjectorControls.jsx`

The **Show / Clear** actions plus text-decoration and language settings for the
projector, rendered inside [[Projector Panel]].

## Controls
- **Show / Clear** — trigger `verses` / `clear` messages.
- Font (`PROJECTOR_FONTS`: Banner, Valera, Mouldy, Oswald).
- Font size (1–9; multiplied ×10 → px on the projector).
- Text color (`TEXT_COLORS`) and stroke color/width (`STROKE_COLORS`).
- Text alignment.
- Language toggles (`PROJECTOR_LANGUAGES`) — the **Show** button turns red when
  no language is selected (guard against projecting nothing).

Values come from [[Constants & Data Model]].

## Related
- [[Projector Panel]] · [[Background Picker]]

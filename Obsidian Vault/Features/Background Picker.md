---
tags: [feature, admin, projector]
---

# Background Picker

`src/features/admin/BackgroundPicker.jsx`

Chooses the projector background, one of three sources:
1. A bundled image (`BACKGROUNDS` — `/backgrounds/1..20.jpeg`, default `16`).
2. An image **URL** (typed in).
3. A **local file** (`URL.createObjectURL`).

Calls `onSelect(url)` up into [[Projector Panel]], which folds it into `style.background`.

## Related
- [[Projector Panel]] · [[Constants & Data Model]]

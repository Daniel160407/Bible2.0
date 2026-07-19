---
tags: [feature, admin]
---

# Action Bar

`src/features/admin/ActionBar.jsx`

Floating bottom bar on [[Admin Page]] with navigation buttons and the
**present-view launcher**.

## Behaviour
- Opens [[Present View Page]] via `window.open`, keeping a ref to the window;
  polls on an interval to know when the projector window is closed.
- Navigates to [[Bible Page]] / [[Documentation Page]] / [[Donation Page]]
  (`useNavigate`).
- Can hide/collapse itself; shows a transient alert.
- Renders [[Made By]] credit.

## Related
- [[Present View Page]] · [[Admin Page]]

---
tags: [page, docs]
route: /documentation
---

# Documentation Page

`src/pages/DocumentationPage.jsx` · route `/documentation`

In-app help/manual for operators. Content is data-driven from
`src/pages/documentationContent.jsx` (`DOCUMENTATION`), keyed by language
(default `geo`), each with a `title`, a `youtube` video link, and `blocks`.

## Block renderer
`renderBlock` switches on `block.type`:
- `p` — paragraph
- `img` — screenshot (`block.src`)
- `subtitle` — accent heading
- `divider` — `<hr>`

Linked from the [[Welcome Farmer]] greeting on [[Admin Page]].

## Related
- [[Welcome Farmer]] · [[Admin Page]]

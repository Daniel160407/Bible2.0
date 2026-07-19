---
tags: [reference, todo]
---

# Ideas & TODO

A scratch space — not authoritative, capture ideas and open questions here.

## Observations from the code
- [ ] `README.md` is still the stock Vite template — could describe the real app.
- [ ] No tests exist; the [[Book Indexing]] remap is the highest-value place to
      add unit tests (it has bitten the project before).
- [ ] API base URL is hardcoded in `api/bibleApi.js` — could move to an env/config.
- [ ] Untracked `screen_*.png` files sit in the repo root (likely stray captures).

## Open questions
- [ ] Does whole-Bible [[Verse Search]] handle API pagination (`page` param) for
      books with many matches, or only the first page?
- [ ] Are the extra `PREVIEW_LANGUAGES` (UA/FR/GR/TR/SP) fully supported by the
      API, or best-effort?

## Related
- [[Home]] · [[Conventions]]

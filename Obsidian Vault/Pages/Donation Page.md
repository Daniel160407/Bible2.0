---
tags: [page, donation]
route: /donation
---

# Donation Page

`src/pages/DonationPage.jsx` · route `/donation`

A modal-style support page. Tabs (default `bank`) present ways to donate; the
bank tab exposes an **IBAN** (`GE90BG0000000765594000`) with a copy-to-clipboard
button that shows a transient "IBAN copied" alert (auto-dismiss after 3s).

Uses `useNavigate` to close back to the previous route.

## Related
- [[Action Bar]] (navigation) · [[Admin Page]]

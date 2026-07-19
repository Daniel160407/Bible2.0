---
tags: [architecture, tooling]
---

# Tech Stack

## Runtime dependencies

| Package | Version | Used for |
|---|---|---|
| `react` / `react-dom` | ^18.3 | UI |
| `react-router-dom` | ^6.24 | Routing across the 5 [[Architecture#Pages]] |
| `@tanstack/react-query` | ^5.101 | Server-state caching — see [[Bible Queries (hooks)]] |
| `axios` | ^1.9 | HTTP client for [[holybible.ge API]] |
| `js-cookie` | ^3.0 | Persist last language/version/book/chapter |

## Build / dev tooling

| Package | Version | Used for |
|---|---|---|
| `vite` | ^5.3 | Dev server + bundler |
| `@vitejs/plugin-react` | ^4.3 | React Fast Refresh (Babel) |
| `tailwindcss` + `@tailwindcss/vite` | ^4.3 | Styling (Tailwind v4, via Vite plugin) |
| `eslint` (+ react plugins) | ^8.57 | Linting |

> Tailwind v4 is wired through the Vite plugin in `vite.config.js` — there is no
> `tailwind.config.js`; theme tokens (`bg-card`, `bg-field`, `text-accent`,
> animations like `animate-fade-in-up`) are defined in `src/index.css`.

## Scripts (`package.json`)

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the build
- `npm run lint` — ESLint (`--max-warnings 0`)

## Notable characteristics
- **No backend, no test suite, no TypeScript** — plain JSX.
- **No env vars** — the API base URL is hardcoded in `api/bibleApi.js`.
- Static assets (`/backgrounds/*.jpeg`, `/images/icon.jpeg`) live in `public/`.

## Related
- [[Architecture]] · [[Getting Started]]

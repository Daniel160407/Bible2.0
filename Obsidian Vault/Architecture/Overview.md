---
tags: [architecture, overview]
---

# Overview

**Bible 2.0** is a front-end-only web app for displaying Bible verses on a
projector during church services, plus a standalone Bible reader.

## Who uses it

- **Operator** — runs [[Admin Page]] on a laptop, searches/selects verses and
  controls what appears on the big screen.
- **Congregation** — sees the [[Present View Page]] projected on a second screen.
- **Individuals** — use [[Bible Page]] to read/search/copy verses on their own.

## Core idea

The app has **no backend**. All scripture text is fetched live from the
third-party [[holybible.ge API]]. State that must survive reloads (last book,
chapter, language) is kept in cookies via `js-cookie`.

The operator console and the projector run as **two separate browser windows**
of the same app. They communicate through a browser [[Projector Channel]]
(`BroadcastChannel`), so the projector updates instantly with no server round-trip.

## Feature summary

- Search a single book or the **whole Bible** (throttled — see [[Verse Search]]).
- Look up verses by reference like `Mark 6:3-5` (see [[Reference Parsing]]).
- Preview the passage, optionally "separate" a single verse.
- Project verses in up to **3 languages at once** (Georgian / English / Russian).
- Rich projector styling: font, size, color, stroke, alignment, background image.
- Standalone reader with per-user cookie memory and clipboard copy.

## Languages

- **Preview / reader:** GEO, ENG, RUS, UA, FR, GR, TR, SP (see `PREVIEW_LANGUAGES`).
- **Projector:** Georgian, English, Russian only (see `PROJECTOR_LANGUAGES`).

The English translation lists its books in a different order than the Georgian
canon, which forces an index-remapping layer — see [[Book Indexing]].

## Related
- [[Architecture]] · [[Tech Stack]] · [[Getting Started]]

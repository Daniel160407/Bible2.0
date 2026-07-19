---
tags: [moc, home]
---

# 📖 Bible 2.0 — Project Vault

A React + Vite web app for **projecting Bible verses** during church services. An
operator searches for verses on an admin console and sends them, styled, to a
second-screen projector window in real time. It also ships a standalone Bible
reader for personal use.

All verse text comes from the third-party **[[holybible.ge API]]** — the app has
no backend of its own.

## Start here

- [[Overview]] — what the app does, who uses it, the big picture
- [[Architecture]] — how the pieces fit together
- [[Tech Stack]] — libraries and build tooling
- [[Getting Started]] — run it locally

## Maps of Content

### Pages (routes)
- [[Admin Page]] — the operator console (`/`)
- [[Present View Page]] — the projector window (`/presentview`)
- [[Bible Page]] — standalone reader (`/bible`)
- [[Documentation Page]] — in-app help (`/documentation`)
- [[Donation Page]] — support / IBAN (`/donation`)

### Features (admin console)
- [[Search Panel]] · [[Verse Preview]] · [[Projector Panel]] · [[Projector Controls]]
- [[Background Picker]] · [[Action Bar]] · [[Welcome Farmer]]

### Data & API
- [[holybible.ge API]] — endpoint, params, response shape, **quirks**
- [[Book Indexing]] — the tricky book-order remapping
- [[Bible Queries (hooks)]] — React Query data layer
- [[Verse Search]] — throttled whole-Bible search
- [[Projector Channel]] — BroadcastChannel protocol
- [[Reference Parsing]] — "Mark 6:3-5" → structured lookup
- [[Constants & Data Model]]

### Reference
- [[Glossary]] · [[Conventions]] · [[Ideas & TODO]]

## Data flow at a glance

```
Operator (Admin Page)
   │  search / select verses  ──►  holybible.ge API
   │  style + verses  ──► BroadcastChannel("projectorData")
   ▼
Present View Page (projector window / second screen)
```

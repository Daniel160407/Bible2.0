---
tags: [data, projector, protocol]
---

# Projector Channel

`src/lib/projectorChannel.js` — the `BroadcastChannel` protocol linking the two
windows ([[Admin Page]] ↔ [[Present View Page]]).

```js
CHANNEL_NAME = 'projectorData'
createProjectorChannel() // → new BroadcastChannel('projectorData')
```

## Messages
| Message | Direction | Effect |
|---|---|---|
| `{ type: 'style', style }` | Admin → Projector | full projector style state (idempotent) |
| `{ type: 'verses', verses }` | Admin → Projector | verses keyed by projector language key; show |
| `{ type: 'clear' }` | Admin → Projector | hide currently shown verses |
| `{ type: 'sync-request' }` | Projector → Admin | ask admin to re-send its state (on projector mount) |

## Why BroadcastChannel
Same-origin, no server. The projector opens as a separate window and holds no
React state of its own, so it requests a sync on mount to catch up.

Sender: [[Projector Panel]]. Receiver: [[Present View Page]].

## Related
- [[Projector Panel]] · [[Present View Page]] · [[Architecture]]

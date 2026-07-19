/**
 * BroadcastChannel protocol between the admin page and the projector window.
 *
 * Messages:
 * - { type: 'style', style }        full projector style state (idempotent)
 * - { type: 'verses', verses }      verses keyed by projector language key
 * - { type: 'clear' }               hide the currently shown verses
 * - { type: 'sync-request' }        projector asks the admin to re-send its state
 */
const CHANNEL_NAME = 'projectorData';

export const createProjectorChannel = () => new BroadcastChannel(CHANNEL_NAME);

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  PRESENT_VIEW_BYE,
  PRESENT_VIEW_CLOSE,
  PRESENT_VIEW_PING,
  PRESENT_VIEW_PONG,
  createProjectorChannel,
} from '../lib/projectorChannel';

const PING_INTERVAL = 2000;
const STALE_AFTER = 5000;

export const usePresentViewWindows = (enabled = true) => {
  const [windows, setWindows] = useState([]);
  const channelRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setWindows([]);
      return undefined;
    }

    const channel = createProjectorChannel();
    channelRef.current = channel;
    const seen = new Map();

    const publish = () =>
      setWindows(
        [...seen.values()]
          .sort((a, b) => a.id.localeCompare(b.id))
          .map(({ id, width, height }) => ({ id, width, height })),
      );

    channel.onmessage = (event) => {
      const message = event.data;
      if (message?.type === PRESENT_VIEW_PONG) {
        seen.set(message.id, {
          id: message.id,
          width: message.width,
          height: message.height,
          lastSeen: Date.now(),
        });
        publish();
      } else if (message?.type === PRESENT_VIEW_BYE) {
        seen.delete(message.id);
        publish();
      }
    };

    const ping = () => {
      const now = Date.now();
      let pruned = false;
      seen.forEach((entry, id) => {
        if (now - entry.lastSeen > STALE_AFTER) {
          seen.delete(id);
          pruned = true;
        }
      });
      if (pruned) publish();
      channel.postMessage({ type: PRESENT_VIEW_PING });
    };

    ping();
    const intervalId = setInterval(ping, PING_INTERVAL);

    return () => {
      clearInterval(intervalId);
      channelRef.current = null;
      channel.close();
    };
  }, [enabled]);

  const closeWindow = useCallback((id) => {
    channelRef.current?.postMessage({ type: PRESENT_VIEW_CLOSE, id });
  }, []);

  const closeAllWindows = useCallback(() => {
    channelRef.current?.postMessage({ type: PRESENT_VIEW_CLOSE, id: null });
  }, []);

  return { windows, closeWindow, closeAllWindows };
};

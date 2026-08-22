const CHANNEL_NAME = 'projectorData';

export const PRESENT_VIEW_PING = 'present-view-ping';
export const PRESENT_VIEW_PONG = 'present-view-pong';
export const PRESENT_VIEW_BYE = 'present-view-bye';
export const PRESENT_VIEW_CLOSE = 'present-view-close';
export const PRESENT_VIEW_STATE_REQUEST = 'present-view-state-request';
export const PRESENT_VIEW_STATE = 'present-view-state';

export const createProjectorChannel = () => new BroadcastChannel(CHANNEL_NAME);

export const isPreviewMode = () =>
  new URLSearchParams(window.location.search).get('preview') === '1';

export const countOpenPresentViews = (timeout = 300) =>
  new Promise((resolve) => {
    const channel = createProjectorChannel();
    const responders = new Set();

    channel.onmessage = (event) => {
      if (event.data?.type === PRESENT_VIEW_PONG) responders.add(event.data.id);
    };

    channel.postMessage({ type: PRESENT_VIEW_PING });

    setTimeout(() => {
      channel.close();
      resolve(responders.size);
    }, timeout);
  });

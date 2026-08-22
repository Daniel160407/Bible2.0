const CHANNEL_NAME = 'projectorData';

export const createProjectorChannel = () => new BroadcastChannel(CHANNEL_NAME);

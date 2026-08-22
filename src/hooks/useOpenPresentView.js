import { useRef, useState } from 'react';
import { notify } from '../components/ui/Toast';
import { countOpenPresentViews } from '../lib/projectorChannel';

const ignoreErrors = (action) => {
  try {
    action();
  } catch (error) {
    void error;
  }
};

export const useOpenPresentView = () => {
  const [isChecking, setIsChecking] = useState(false);
  const confirmToastRef = useRef(null);

  const spawnPresentView = () => {
    const newWindow = window.open(
      '/presentview',
      `presentView-${Date.now()}`,
      'width=800,height=600',
    );
    if (!newWindow) {
      notify.error('Popup blocked', {
        description: 'Allow popups for this site to open the Present View window.',
      });
      return;
    }

    setTimeout(() => {
      ignoreErrors(() => {
        if (!newWindow.closed) newWindow.document.documentElement.requestFullscreen();
      });
    }, 1000);
  };

  const openPresentView = async () => {
    if (isChecking) return;
    notify.dismiss(confirmToastRef.current);
    setIsChecking(true);
    const openCount = await countOpenPresentViews();
    setIsChecking(false);

    if (openCount === 0) {
      spawnPresentView();
      return;
    }

    confirmToastRef.current = notify.warning('Present View is already open', {
      description:
        openCount > 1
          ? `${openCount} Present View windows are already running. Open another one anyway?`
          : 'A Present View window is already running. Do you want to open a second one?',
      actions: [
        { label: 'Open anyway', onClick: spawnPresentView, primary: true },
        { label: 'Cancel' },
      ],
    });
  };

  return { openPresentView, isChecking };
};

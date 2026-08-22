import { useEffect, useRef, useState } from 'react';
import { notify } from '../../components/ui/Toast';
import { useOpenPresentView } from '../../hooks/useOpenPresentView';

const CLOSE_TIMEOUT = 2000;

const PresentViewThumbnail = ({ width, height }) => {
  const frameWidth = width || 1280;
  const frameHeight = height || 720;
  const holderRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return undefined;

    const measure = () => setScale(holder.clientWidth / frameWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(holder);
    return () => observer.disconnect();
  }, [frameWidth]);

  return (
    <div
      ref={holderRef}
      className="relative w-full overflow-hidden rounded-[8px] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_6px_16px_rgba(0,0,0,0.45)]"
      style={{ aspectRatio: `${frameWidth} / ${frameHeight}` }}
    >
      {scale > 0 && (
        <iframe
          src="/presentview?preview=1"
          title="Present View preview"
          tabIndex={-1}
          scrolling="no"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-none"
          style={{ width: frameWidth, height: frameHeight, transform: `scale(${scale})` }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[8px] ring-1 ring-inset ring-white/10" />
    </div>
  );
};

const openButtonClass =
  'cursor-pointer rounded-[5px] border-none bg-[#28a745] px-3 py-1.5 text-sm text-white ' +
  'transition-colors duration-300 hover:bg-[#1e7e34] disabled:cursor-not-allowed disabled:opacity-60';

const PresentViewMonitor = ({ windows, onCloseWindow, onCloseAllWindows }) => {
  const [closingIds, setClosingIds] = useState([]);
  const { openPresentView, isChecking } = useOpenPresentView();
  const windowsRef = useRef(windows);
  windowsRef.current = windows;

  const requestClose = (id) => {
    setClosingIds((current) => [...current, id]);
    onCloseWindow(id);

    setTimeout(() => {
      setClosingIds((current) => current.filter((closingId) => closingId !== id));
      if (windowsRef.current.some((entry) => entry.id === id)) {
        notify.error('Could not close the window', {
          description:
            'The browser only lets a window be closed by the page that opened it. Close this one manually.',
        });
      }
    }, CLOSE_TIMEOUT);
  };

  if (windows.length === 0) {
    return (
      <div
        className="flex w-full flex-col items-center gap-1 rounded-[10px] border border-dashed
          border-[#e0e0e0]/20 bg-white/[0.03] px-4 py-6 text-center"
      >
        <p className="text-sm font-semibold text-[#e0e0e0]">No Present View window is open</p>
        <p className="text-sm text-[#e0e0e0]/60">Open one to start presenting verses.</p>
        <button
          type="button"
          onClick={openPresentView}
          disabled={isChecking}
          className={`mt-2 ${openButtonClass}`}
        >
          Open Present View
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={openPresentView}
          disabled={isChecking}
          className={openButtonClass}
        >
          Open Present View
        </button>
        {windows.length > 1 && (
          <button
            type="button"
            onClick={onCloseAllWindows}
            className="cursor-pointer rounded-[5px] border-none bg-[#dc3545] px-3 py-1.5 text-sm
              text-white transition-colors duration-300 hover:bg-[#bd2130]"
          >
            Close all
          </button>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-4 max-md:grid-cols-1">
        {windows.map(({ id, width, height }, index) => (
          <div
            key={id}
            className="flex flex-col overflow-hidden rounded-[10px] border border-[#e0e0e0]/15
              bg-card/40 shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-colors duration-300
              hover:border-[#28a745]/40"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[#e0e0e0]/10 bg-white/5 px-3 py-2">
              <span className="flex min-w-0 items-center gap-2 text-sm font-semibold leading-none text-[#e0e0e0]">
                <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28a745] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28a745]" />
                </span>
                <span className="truncate leading-none">Window {index + 1}</span>
                <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-white/10 px-2 text-[11px] font-normal leading-none text-[#e0e0e0]/70">
                  {width} &times; {height}
                </span>
              </span>
              <button
                type="button"
                onClick={() => requestClose(id)}
                disabled={closingIds.includes(id)}
                className="shrink-0 cursor-pointer rounded-[5px] border-none bg-[#dc3545] px-2.5 py-1 text-xs
                  text-white transition-colors duration-300 hover:bg-[#bd2130]
                  disabled:cursor-not-allowed disabled:opacity-60"
              >
                {closingIds.includes(id) ? 'Closing…' : 'Close'}
              </button>
            </div>

            <div className="p-3">
              <PresentViewThumbnail width={width} height={height} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresentViewMonitor;

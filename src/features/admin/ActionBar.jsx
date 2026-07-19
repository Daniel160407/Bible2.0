import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MadeBy from '../../components/ui/MadeBy';

const windowButtonClass =
  'cursor-pointer rounded-[5px] border-none px-6 py-3 text-base text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] ' +
  'transition-[background-color,transform] duration-300 hover:scale-105 active:scale-100';

/** Floating bottom bar with navigation buttons and the present-view launcher. */
const ActionBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const presentViewWindowRef = useRef(null);
  const barRef = useRef(null);
  const hideButtonRef = useRef(null);
  const alertTimeoutRef = useRef(null);
  const windowCheckIntervalRef = useRef(null);
  const navigate = useNavigate();

  const openPresentView = () => {
    // Only one present view window may exist; focus it instead of opening another.
    if (presentViewWindowRef.current && !presentViewWindowRef.current.closed) {
      setShowAlert(true);
      clearTimeout(alertTimeoutRef.current);
      alertTimeoutRef.current = setTimeout(() => setShowAlert(false), 3000);
      try {
        presentViewWindowRef.current.focus();
      } catch {
        // Cross-window focus can be blocked by the browser; nothing to do.
      }
      return;
    }

    const newWindow = window.open('/presentview', 'presentViewWindow', 'width=800,height=600');
    if (!newWindow) return;

    presentViewWindowRef.current = newWindow;
    windowCheckIntervalRef.current = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(windowCheckIntervalRef.current);
        presentViewWindowRef.current = null;
      }
    }, 1000);

    setTimeout(() => {
      try {
        if (!newWindow.closed) newWindow.document.documentElement.requestFullscreen();
      } catch {
        // Fullscreen needs a user gesture in some browsers; the operator can press F11.
      }
    }, 1000);
  };

  // Collapse the bar when clicking anywhere outside it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hideButtonRef.current?.contains(event.target)) return;
      if (!isHidden && barRef.current && !barRef.current.contains(event.target)) {
        setIsHidden(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isHidden]);

  useEffect(
    () => () => {
      clearTimeout(alertTimeoutRef.current);
      clearInterval(windowCheckIntervalRef.current);
    },
    [],
  );

  return (
    <div className="fixed bottom-5 left-1/2 z-[1000] flex -translate-x-1/2 flex-col items-center gap-2.5">
      <div
        ref={hideButtonRef}
        onClick={() => setIsHidden((hidden) => !hidden)}
        className="cursor-pointer rounded-[5px] bg-panel/80 px-2.5 py-[5px] transition-colors duration-300 hover:bg-panel"
      >
        <img
          src="/images/hide.jpeg"
          alt="Hide"
          className="h-5 w-5 transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div
        ref={barRef}
        className={`relative flex flex-col overflow-hidden rounded-[10px] bg-panel shadow-[0_4px_8px_rgba(0,0,0,0.5)]
          transition-all duration-300 ${
            isHidden
              ? 'pointer-events-none m-0 max-h-0 gap-0 p-0 py-0 opacity-0 translate-y-5'
              : 'max-h-[500px] gap-4 p-4 opacity-100 translate-y-0'
          }`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate('/donation')} className="button-85">
            Donate
          </button>
          <button
            onClick={() => window.open('/documentation', '_blank')}
            className={`${windowButtonClass} bg-[#007bff] hover:bg-[#0056b3] active:bg-[#004494]`}
          >
            Documentation
          </button>
          <button
            onClick={() => window.open('/bible', '_blank')}
            className={`${windowButtonClass} bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34]`}
          >
            Bible
          </button>
          <button onClick={openPresentView} className="button-85">
            Open Present View
          </button>
        </div>

        {showAlert && (
          <div
            className="absolute -top-10 left-1/2 z-[1000] -translate-x-1/2 animate-fade-in-out
              whitespace-nowrap rounded bg-[#ff4444] px-4 py-2 text-sm text-white
              shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
          >
            Present View is already open!
          </div>
        )}

        <MadeBy href="https://www.facebook.com/daniel.abulashvili.5/" />
      </div>
    </div>
  );
};

export default ActionBar;

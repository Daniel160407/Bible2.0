import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MadeBy from '../../components/ui/MadeBy';
import { useOpenPresentView } from '../../hooks/useOpenPresentView';

const IconPresent = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
    <path d="M8 20.5h8M12 16.5v4" strokeLinecap="round" />
  </svg>
);

const IconBook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z" strokeLinejoin="round" />
    <path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19" strokeLinejoin="round" />
  </svg>
);

const IconDocs = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 3v5h5M9 13h6M9 17h4" strokeLinecap="round" />
  </svg>
);

const IconHeart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path
      d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 7.7a4.2 4.2 0 0 1 7 3c0 4.9-7 9.3-7 9.3z"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevron = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSpinner = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...props}>
    <circle cx="12" cy="12" r="9" opacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
  </svg>
);

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-panel';

const actionClass =
  'group flex min-w-[104px] flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3 ' +
  'text-[13px] font-medium text-white/85 transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.09] ' +
  `hover:text-white active:bg-white/[0.06] ${focusRing}`;

const ActionBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const barRef = useRef(null);
  const toggleRef = useRef(null);
  const navigate = useNavigate();
  const { openPresentView, isChecking } = useOpenPresentView();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current?.contains(event.target)) return;
      if (event.target.closest?.('[data-sonner-toaster]')) return;
      if (!isHidden && barRef.current && !barRef.current.contains(event.target)) {
        setIsHidden(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isHidden]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isHidden) setIsHidden(true);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isHidden]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[1000] flex flex-col items-center px-4 pb-4">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsHidden((hidden) => !hidden)}
        aria-expanded={!isHidden}
        aria-controls="action-bar-panel"
        className={`pointer-events-auto mb-2 flex items-center gap-2 rounded-full border border-white/10 bg-panel/90 px-4 py-2
          text-[13px] font-medium text-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.45)] backdrop-blur
          transition-colors duration-200 hover:border-white/20 hover:bg-panel hover:text-white ${focusRing}`}
      >
        <IconChevron
          className={`h-4 w-4 transition-transform duration-300 ${isHidden ? '' : 'rotate-180'}`}
        />
        {isHidden ? 'Show menu' : 'Hide menu'}
      </button>

      <div
        id="action-bar-panel"
        ref={barRef}
        aria-hidden={isHidden}
        className={`pointer-events-auto w-full max-w-[560px] origin-bottom overflow-hidden rounded-2xl border border-white/10
          bg-panel/95 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur transition-all duration-300 ease-out ${
            isHidden
              ? 'pointer-events-none max-h-0 scale-95 border-transparent opacity-0'
              : 'max-h-[320px] scale-100 opacity-100'
          }`}
      >
        <div className="flex flex-col gap-3 p-3">
          <button
            type="button"
            onClick={openPresentView}
            disabled={isChecking}
            className={`flex items-center justify-center gap-2.5 rounded-xl bg-accent px-5 py-3.5 text-[15px] font-semibold
              text-surface transition-[background-color,opacity] duration-200 hover:bg-[#ffd633]
              disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
          >
            {isChecking ? (
              <IconSpinner className="h-5 w-5 animate-spin" />
            ) : (
              <IconPresent className="h-5 w-5" />
            )}
            {isChecking ? 'Opening…' : 'Open Present View'}
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={() => window.open('/bible', '_blank')} className={actionClass}>
              <IconBook className="h-5 w-5 text-white/60 transition-colors duration-200 group-hover:text-accent" />
              Bible
            </button>
            <button
              type="button"
              onClick={() => window.open('/documentation', '_blank')}
              className={actionClass}
            >
              <IconDocs className="h-5 w-5 text-white/60 transition-colors duration-200 group-hover:text-accent" />
              Docs
            </button>
            <button type="button" onClick={() => navigate('/donation')} className={actionClass}>
              <IconHeart className="h-5 w-5 text-white/60 transition-colors duration-200 group-hover:text-red-400" />
              Donate
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 px-3 py-2">
          <MadeBy href="https://www.facebook.com/daniel.abulashvili.5/" />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;

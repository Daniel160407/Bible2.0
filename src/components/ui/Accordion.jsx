import { useState } from 'react';
import Button from './Button';

const Accordion = ({ title, badge, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <Button
        variant="heading"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="mt-4"
      >
        <span className="flex items-center gap-2">
          {title}
          {badge != null && (
            <span
              className="inline-grid h-5 min-w-5 place-items-center rounded-full bg-[#28a745] px-1.5
                text-xs font-bold text-white"
            >
              <span className="block leading-none tabular-nums translate-y-[0.5px]">{badge}</span>
            </span>
          )}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>
      <div className="mt-2 h-px w-full bg-[#e0e0e0]/20" />

      <div
        className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="flex w-full flex-col items-start gap-2 pt-2">{isOpen && children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

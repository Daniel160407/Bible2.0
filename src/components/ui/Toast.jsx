import { toast } from 'sonner';

const ICONS = {
  success: {
    color: '#34d399',
    path: 'M20 6 9 17l-5-5',
  },
  error: {
    color: '#f87171',
    path: 'M18 6 6 18M6 6l12 12',
  },
  warning: {
    color: '#fbbf24',
    path: 'M12 8.5v5m0 3.5h.01M10.3 3.9 2.6 17.4A2 2 0 0 0 4.3 20.4h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  },
  info: {
    color: '#60a5fa',
    path: 'M12 16v-5m0-3.5h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  },
};

const ToastCard = ({ id, variant, title, description, actions }) => {
  const { color, path } = ICONS[variant] ?? ICONS.info;

  return (
    <div
      className="group pointer-events-auto flex w-full gap-3 rounded-lg border border-white/10
        bg-panel px-4 py-3.5 font-roboto shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
    >
      <svg viewBox="0 0 24 24" className="mt-px h-[18px] w-[18px] shrink-0" style={{ color }}>
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="min-w-0 flex-1">
        <p className="pr-5 text-sm font-semibold leading-tight text-white">{title}</p>
        {description ? (
          <p className="mt-1 text-[13px] leading-relaxed text-white/60">{description}</p>
        ) : null}

        {actions?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map(({ label, onClick, primary }) => (
              <button
                key={label}
                onClick={() => {
                  toast.dismiss(id);
                  onClick?.();
                }}
                className={`cursor-pointer rounded-md border-none px-3 py-1.5 text-[13px] font-medium
                  transition-colors duration-200 ${
                    primary
                      ? 'bg-white text-surface hover:bg-white/85'
                      : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <button
        onClick={() => toast.dismiss(id)}
        aria-label="Dismiss"
        className="-mr-1 -mt-1 h-6 w-6 shrink-0 cursor-pointer self-start rounded-md border-none
          bg-transparent text-white/35 transition-colors duration-200 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="mx-auto h-3.5 w-3.5">
          <path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

const show = (variant, title, options = {}) => {
  const { description, actions, duration = 5000, ...rest } = options;
  const timed = actions?.length ? Infinity : duration;

  return toast.custom(
    (id) => (
      <ToastCard
        id={id}
        variant={variant}
        title={title}
        description={description}
        actions={actions}
      />
    ),
    { duration: timed, ...rest },
  );
};

export const notify = {
  success: (title, options) => show('success', title, options),
  error: (title, options) => show('error', title, options),
  warning: (title, options) => show('warning', title, options),
  info: (title, options) => show('info', title, options),
  dismiss: (id) => toast.dismiss(id),
};

export default ToastCard;

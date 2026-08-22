import { forwardRef } from 'react';

const BASE =
  'inline-flex items-center gap-2 border-none align-middle ' +
  'transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-300 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ' +
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none ' +
  'aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:shadow-none';

const VARIANTS = {
  success: {
    size: 'md',
    className:
      'rounded-[5px] bg-[#28a745] font-medium text-white enabled:hover:bg-[#1e7e34] ' +
      'enabled:hover:shadow-[0_4px_8px_rgba(25,48,182,0.5)] focus-visible:ring-[#28a745]/70',
  },
  danger: {
    size: 'md',
    className:
      'rounded-[5px] bg-[#dc3545] font-medium text-white enabled:hover:bg-[#bd2130] ' +
      'enabled:hover:shadow-[0_4px_8px_rgba(25,48,182,0.5)] focus-visible:ring-[#dc3545]/70',
  },
  neutral: {
    size: 'md',
    className:
      'rounded-[10px] bg-[#757575] font-bold text-[#f4f4f4] enabled:hover:bg-[#909090] ' +
      'enabled:hover:shadow-[0_0_5px_2px_rgba(117,117,117,0.5)] focus-visible:ring-[#757575]/70',
  },
  subtle: {
    size: 'sm',
    className:
      'rounded-[5px] bg-field font-medium text-white enabled:hover:bg-[#43506a] focus-visible:ring-[#007bff]/70',
  },
  surface: {
    size: 'lg',
    className:
      'rounded-lg bg-card-active text-[#f0f0f5] enabled:hover:bg-card active:bg-[#1f2530] ' +
      'focus-visible:ring-card-active',
  },
  accent: {
    size: 'xl',
    className:
      'rounded-xl bg-accent font-semibold text-surface enabled:hover:bg-[#ffd633] focus-visible:ring-accent/70',
  },
  primary: {
    size: 'xl',
    className:
      'rounded-lg bg-gradient-to-br from-[#4a90e2] to-[#3a7bc8] font-medium text-white ' +
      'shadow-[0_4px_6px_rgba(0,0,0,0.1)] enabled:hover:from-[#3a7bc8] enabled:hover:to-[#2a6bb8] ' +
      'enabled:hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] focus-visible:ring-[#4a90e2]/70',
  },
  donate: {
    size: 'xl',
    className:
      'rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] font-medium text-white no-underline ' +
      'shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:from-[#ff5252] hover:to-[#ff3d3d] ' +
      'hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] focus-visible:ring-[#ff6b6b]/70',
  },
  light: {
    size: 'sm',
    className:
      'rounded-md bg-white font-medium text-surface enabled:hover:bg-white/85 focus-visible:ring-white/70',
  },
  translucent: {
    size: 'sm',
    className:
      'rounded-md bg-white/10 font-medium text-white/70 enabled:hover:bg-white/15 enabled:hover:text-white ' +
      'focus-visible:ring-white/40',
  },
  tile: {
    size: 'none',
    className:
      'group min-w-[104px] flex-col gap-1.5 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3 ' +
      'text-[13px] font-medium text-white/85 enabled:hover:border-white/15 enabled:hover:bg-white/[0.09] ' +
      'enabled:hover:text-white active:bg-white/[0.06] focus-visible:ring-accent/70',
  },
  toggle: {
    size: 'none',
    className:
      'rounded-full border border-white/10 bg-panel/80 px-4 py-2 text-[12px] font-medium tracking-wide ' +
      'text-white/70 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.8)] backdrop-blur-xl ' +
      'enabled:hover:border-white/20 enabled:hover:bg-panel enabled:hover:text-white focus-visible:ring-accent/70',
  },
  tab: {
    size: 'none',
    className:
      'relative z-[1] flex-1 rounded-md p-3 text-base font-medium text-white/70 enabled:hover:text-white ' +
      'focus-visible:ring-[#4a90e2]/70 max-sm:p-2.5 max-sm:text-sm ' +
      "aria-selected:bg-[#4a90e2]/20 aria-selected:font-semibold aria-selected:text-white " +
      "aria-selected:after:absolute aria-selected:after:-bottom-1 aria-selected:after:left-1/2 " +
      "aria-selected:after:h-[3px] aria-selected:after:w-3/5 aria-selected:after:-translate-x-1/2 " +
      "aria-selected:after:rounded-[3px] aria-selected:after:bg-[#4a90e2] aria-selected:after:content-['']",
  },
  heading: {
    size: 'none',
    align: 'justify-between text-left',
    className:
      'w-full gap-3 bg-transparent p-0 text-xl font-semibold text-[#e0e0e0] ' +
      'enabled:hover:text-white focus-visible:ring-white/30',
  },
  close: {
    size: 'none',
    className:
      'rounded-full bg-transparent p-2 text-3xl leading-none text-white/70 enabled:hover:rotate-90 ' +
      'enabled:hover:bg-white/10 enabled:hover:text-white focus-visible:ring-white/40',
  },
  icon: {
    size: 'none',
    className:
      'h-6 w-6 rounded-md bg-transparent p-0 text-white/35 enabled:hover:text-white focus-visible:ring-white/40',
  },
  plain: {
    size: 'none',
    className: 'bg-transparent focus-visible:ring-white/40',
  },
};

const SIZES = {
  none: '',
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-base',
  xl: 'px-6 py-3.5 text-[15px]',
};

const Button = forwardRef(({
  variant = 'subtle',
  size,
  fullWidth = false,
  href,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  children,
  ...rest
}, ref) => {
  const config = VARIANTS[variant] ?? VARIANTS.subtle;
  const classes = [
    BASE,
    config.align ?? 'justify-center text-center',
    config.className,
    SIZES[size ?? config.size] ?? '',
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

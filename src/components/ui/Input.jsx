import { forwardRef } from 'react';

const VARIANT_STYLES = {
  panel:
    'appearance-none rounded-[5px] border border-[#555] bg-field p-2 text-base leading-normal ' +
    'text-white outline-none transition-[border-color,box-shadow] duration-150 ' +
    'hover:border-[#007bff] focus:border-[#007bff] focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)]',
  page:
    'm-[5px] rounded-[5px] border border-[#55677d] bg-[#3d4f5e] p-2.5 text-base text-white ' +
    'transition-[background-color,border-color] duration-300 hover:border-[#6e8bb0] hover:bg-[#465a6b] ' +
    'focus:border-[#8ca3c4] focus:outline-none max-md:w-full max-md:text-sm max-sm:p-2 max-sm:text-xs',
  control: 'control-select',
  picker:
    'mb-2 w-full rounded border border-[#444] bg-[#2c3e50] p-2 text-[#e0e0e0] ' +
    'transition-colors duration-300 focus:border-[#66afe9] focus:outline-none',
  doc:
    'rounded-[5px] border border-[#555] bg-[#1f2937] p-2 text-[#f5f5f5] ' +
    'focus:border-[#888] focus:outline-none',
};

const TYPE_STYLES = {
  range: 'flex-1 cursor-pointer accent-[#28a745]',
  radio: 'mb-2 scale-150 cursor-pointer',
  checkbox:
    'peer h-[22px] w-[22px] cursor-pointer appearance-none rounded-md border-2 ' +
    'border-[#e0e0e0]/30 bg-white/5 transition-all duration-200 ease-out ' +
    'hover:border-[#28a745]/70 hover:bg-white/10 focus-visible:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-[#28a745]/50 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-transparent active:scale-90 checked:border-[#28a745] ' +
    'checked:bg-[#28a745] checked:shadow-[0_2px_8px_rgba(40,167,69,0.45)] ' +
    'checked:hover:bg-[#1e7e34]',
};

const normalizeOption = (option) =>
  typeof option === 'object' && option !== null ? option : { value: option, label: String(option) };

const readValue = (type, target) => {
  if (type === 'checkbox') return target.checked;
  if (type === 'range' || type === 'number') return Number(target.value);
  if (type === 'file') return target.files;
  return target.value;
};

const Input = forwardRef(
  ({ type = 'text', variant = 'panel', options, className = '', onChange, ...rest }, ref) => {
    const controlClass =
      `${TYPE_STYLES[type] ?? VARIANT_STYLES[variant] ?? ''} ${className}`.trim();
    const handleChange = onChange ? (e) => onChange(readValue(type, e.target), e) : undefined;

    if (type === 'select') {
      return (
        <select {...rest} ref={ref} className={controlClass} onChange={handleChange}>
          {(options ?? []).map(normalizeOption).map(({ value, label, ...optionProps }) => (
            <option key={value} value={value} {...optionProps}>
              {label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'checkbox') {
      return (
        <span className="relative inline-flex shrink-0 items-center justify-center">
          <input
            {...rest}
            ref={ref}
            type="checkbox"
            className={controlClass}
            onChange={handleChange}
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute h-[14px] w-[14px] scale-50 text-white opacity-0
              transition-all duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      );
    }

    return (
      <input {...rest} ref={ref} type={type} className={controlClass} onChange={handleChange} />
    );
  },
);

Input.displayName = 'Input';

export default Input;

import { useEffect, useId, useMemo, useRef, useState } from 'react';

const Combobox = ({
  value,
  onChange,
  options,
  className = '',
  buttonClassName = '',
  listClassName = '',
  placeholder = '',
  disabled = false,
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value);
  const selectedLabel = selected?.label ?? '';

  const matches = useMemo(() => {
    if (query === null || query.trim() === '') return options;
    const needle = query.trim().toLowerCase();
    return options.filter((option) => String(option.label).toLowerCase().includes(needle));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const index = matches.findIndex((option) => option.value === value);
    setActiveIndex(index >= 0 ? index : 0);
  }, [open, matches, value]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) close();
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery(null);
  };

  const openList = () => {
    if (disabled) return;
    setOpen(true);
    setQuery('');
  };

  const commit = (option) => {
    if (!option) return;
    close();
    if (option.value !== value) onChange(option.value);
  };

  const move = (delta) => {
    if (!open) {
      openList();
      return;
    }
    if (matches.length === 0) return;
    setActiveIndex((index) => (index + delta + matches.length) % matches.length);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        move(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        move(-1);
        break;
      case 'Enter':
        if (open) {
          e.preventDefault();
          commit(matches[activeIndex]);
        }
        break;
      case 'Escape':
        if (open) {
          e.preventDefault();
          close();
        }
        break;
      case 'Tab':
        close();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <input
        ref={inputRef}
        className={`w-full ${disabled ? 'cursor-not-allowed' : open ? 'cursor-text' : 'cursor-pointer'} ${buttonClassName}`}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label={ariaLabel}
        autoComplete="off"
        disabled={disabled}
        placeholder={open ? selectedLabel || placeholder : placeholder}
        value={query === null ? selectedLabel : query}
        title={selectedLabel}
        onChange={(e) => {
          setOpen(true);
          setQuery(e.target.value);
        }}
        onMouseDown={() => (open ? close() : openList())}
        onFocus={(e) => e.target.select()}
        onBlur={close}
        onKeyDown={handleKeyDown}
      />

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className={`absolute left-0 top-[calc(100%+4px)] z-50 max-h-60 min-w-full overflow-y-auto
            rounded-[5px] border border-[#555] bg-[#1f2937] py-1 shadow-lg ${listClassName}`}
          onMouseDown={(e) => e.preventDefault()}
        >
          {matches.length === 0 && (
            <li className="px-3 py-2 text-sm text-[#9ca3af]">No matches</li>
          )}
          {matches.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`cursor-pointer whitespace-nowrap px-3 py-2 text-base text-white ${
                index === activeIndex ? 'bg-[#007bff]' : 'hover:bg-[#374151]'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                commit(option);
                inputRef.current?.blur();
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Combobox;

import Accordion from '../../components/ui/Accordion';
import { usePresentViewWindows } from '../../hooks/usePresentViewWindows';
import PresentViewMonitor from './PresentViewMonitor';
import {
  PROJECTOR_FONTS,
  PROJECTOR_LANGUAGES,
  STROKE_COLORS,
  TEXT_COLORS,
} from '../../lib/constants';

const rowClass = 'my-2 flex w-full items-center gap-4 max-md:flex-wrap max-md:gap-2';
const labelClass = 'w-[120px] shrink-0 text-base text-[#e0e0e0] max-md:w-full max-sm:text-sm';

const ProjectorControls = ({
  style,
  onStyleChange,
  enabledLanguages,
  onToggleLanguage,
  versions,
  versionOptions,
  onVersionChange,
  showError,
  onShow,
  isShowPending,
  onClear,
}) => {
  const { windows: presentViewWindows, closeWindow, closeAllWindows } = usePresentViewWindows();

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-start justify-center gap-5 max-md:flex-col max-md:items-center">
        <div className="flex flex-col items-center gap-1 max-md:w-full">
          <button
            onClick={onShow}
            disabled={isShowPending}
            className={`min-w-[100px] cursor-pointer rounded-[5px] bg-[#28a745] px-4 py-2 text-base
            text-white transition-all duration-300 hover:bg-[#1e7e34] hover:shadow-[0_4px_8px_rgba(25,48,182,0.5)]
            disabled:cursor-not-allowed disabled:opacity-60 max-md:w-full max-md:max-w-[200px] ${
              showError ? 'animate-pulse-error' : ''
            }`}
          >
            Show
          </button>
          {showError ? (
            <div className="flex w-0 min-w-0 justify-center max-md:w-full">
              <p
                className="whitespace-nowrap text-center text-[0.8rem] text-[#ff0000]
                  [text-shadow:0_0_5px_rgba(0,0,0,0.8)] max-md:whitespace-normal"
              >
                {showError}
              </p>
            </div>
          ) : null}
        </div>
        <button
          onClick={onClear}
          className="min-w-[100px] cursor-pointer rounded-[5px] bg-[#dc3545] px-4 py-2 text-base text-white
          transition-all duration-300 hover:bg-[#bd2130] hover:shadow-[0_4px_8px_rgba(25,48,182,0.5)]
          max-md:w-full max-md:max-w-[200px]"
        >
          Clear
        </button>
      </div>

      <Accordion title="Languages to display" defaultOpen>
        {PROJECTOR_LANGUAGES.map(({ key, label }) => (
          <div key={key} className={rowClass}>
            <label className={labelClass} htmlFor={`language-${key}`}>
              {label}
            </label>
            <span className="relative inline-flex shrink-0 items-center justify-center">
              <input
                id={`language-${key}`}
                type="checkbox"
                className="peer h-[22px] w-[22px] cursor-pointer appearance-none rounded-md border-2
              border-[#e0e0e0]/30 bg-white/5 transition-all duration-200 ease-out
              hover:border-[#28a745]/70 hover:bg-white/10 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#28a745]/50 focus-visible:ring-offset-2
              focus-visible:ring-offset-transparent active:scale-90 checked:border-[#28a745]
              checked:bg-[#28a745] checked:shadow-[0_2px_8px_rgba(40,167,69,0.45)]
              checked:hover:bg-[#1e7e34]"
                checked={Boolean(enabledLanguages[key])}
                onChange={(e) => onToggleLanguage(key, e.target.checked)}
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
            <select
              className="control-select"
              value={versions[key]}
              onChange={(e) => onVersionChange(key, e.target.value)}
            >
              {(versionOptions[key]?.versions ?? [versions[key]]).map((version) => (
                <option key={version} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>
        ))}
      </Accordion>

      <Accordion title="Text decorations" defaultOpen>
        <div className={rowClass}>
          <label className={labelClass} htmlFor="fonts">
            Fonts:
          </label>
          <select
            id="fonts"
            className="control-select"
            value={style.font}
            onChange={(e) => onStyleChange({ font: e.target.value })}
          >
            {PROJECTOR_FONTS.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="text-color">
            Text Color:
          </label>
          <select
            id="text-color"
            className="control-select"
            value={style.textColor}
            onChange={(e) => onStyleChange({ textColor: e.target.value })}
          >
            {TEXT_COLORS.map(({ value, label }) => (
              <option key={value} value={value} style={{ color: value }}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="text-position">
            Text Position:
          </label>
          <select
            id="text-position"
            className="control-select"
            value={style.textAlign}
            onChange={(e) => onStyleChange({ textAlign: e.target.value })}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="text-stroke">
            Text Stroke:
          </label>
          <select
            id="text-stroke"
            className="control-select"
            value={style.strokeColor}
            onChange={(e) => onStyleChange({ strokeColor: e.target.value })}
          >
            <option value="">None</option>
            {STROKE_COLORS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="stroke-width">
            Stroke Width:
          </label>
          <input
            id="stroke-width"
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            className="flex-1 cursor-pointer accent-[#28a745]"
            value={style.strokeWidth}
            onChange={(e) => onStyleChange({ strokeWidth: Number(e.target.value) })}
          />
          <span className="text-white">{style.strokeWidth}</span>
        </div>
      </Accordion>

      <Accordion title="Present View windows" badge={presentViewWindows.length} defaultOpen>
        <PresentViewMonitor
          windows={presentViewWindows}
          onCloseWindow={closeWindow}
          onCloseAllWindows={closeAllWindows}
        />
      </Accordion>
    </div>
  );
};

export default ProjectorControls;

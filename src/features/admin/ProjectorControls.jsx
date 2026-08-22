import {
  PROJECTOR_FONTS,
  PROJECTOR_LANGUAGES,
  STROKE_COLORS,
  TEXT_COLORS,
} from '../../lib/constants';

const sectionTitleClass =
  "my-4 w-full text-xl font-semibold text-[#e0e0e0] after:mt-2 after:block after:h-px after:w-full after:bg-[#e0e0e0]/20 after:content-['']";

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
  onClear,
}) => (
  <div className="flex w-full flex-col items-start gap-4">
    <div className="flex w-full justify-center gap-5 max-md:flex-col max-md:items-center">
      <button
        onClick={onShow}
        className={`relative min-w-[100px] cursor-pointer rounded-[5px] bg-[#28a745] px-4 py-2 text-base
          text-white transition-all duration-300 hover:bg-[#1e7e34] hover:shadow-[0_4px_8px_rgba(25,48,182,0.5)]
          max-md:w-full max-md:max-w-[200px] ${
            showError
              ? "animate-pulse-error after:absolute after:-bottom-[25px] after:left-1/2 after:-translate-x-1/2 after:whitespace-nowrap after:text-[0.8rem] after:text-[#ff0000] after:[text-shadow:0_0_5px_rgba(0,0,0,0.8)] after:content-['Select_at_least_one_language']"
              : ''
          }`}
      >
        Show
      </button>
      <button
        onClick={onClear}
        className="min-w-[100px] cursor-pointer rounded-[5px] bg-[#dc3545] px-4 py-2 text-base text-white
          transition-all duration-300 hover:bg-[#bd2130] hover:shadow-[0_4px_8px_rgba(25,48,182,0.5)]
          max-md:w-full max-md:max-w-[200px]"
      >
        Clear
      </button>
    </div>

    <p className={sectionTitleClass}>Text decorations</p>

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

    <p className={sectionTitleClass}>Languages to display</p>

    {PROJECTOR_LANGUAGES.map(({ key, label }) => (
      <div key={key} className={rowClass}>
        <label className={labelClass} htmlFor={`language-${key}`}>
          {label}
        </label>
        <input
          id={`language-${key}`}
          type="checkbox"
          className="h-[18px] w-[18px] cursor-pointer accent-[#28a745]"
          checked={Boolean(enabledLanguages[key])}
          onChange={(e) => onToggleLanguage(key, e.target.checked)}
        />
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
  </div>
);

export default ProjectorControls;

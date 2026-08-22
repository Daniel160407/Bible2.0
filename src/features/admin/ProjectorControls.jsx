import Accordion from '../../components/ui/Accordion';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { usePresentViewWindows } from '../../hooks/usePresentViewWindows';
import PresentViewMonitor from './PresentViewMonitor';
import {
  PROJECTOR_FONTS,
  PROJECTOR_LANGUAGES,
  STROKE_COLORS,
  TEXT_COLORS,
} from '../../lib/constants';

const TEXT_ALIGNMENTS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

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
          <Button
            variant="success"
            onClick={onShow}
            disabled={isShowPending}
            className={`min-w-[100px] max-md:w-full max-md:max-w-[200px] ${
              showError ? 'animate-pulse-error' : ''
            }`}
          >
            Show
          </Button>
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
        <Button
          variant="danger"
          onClick={onClear}
          className="min-w-[100px] max-md:w-full max-md:max-w-[200px]"
        >
          Clear
        </Button>
      </div>

      <Accordion title="Languages to display" defaultOpen>
        {PROJECTOR_LANGUAGES.map(({ key, label }) => (
          <div key={key} className={rowClass}>
            <label className={labelClass} htmlFor={`language-${key}`}>
              {label}
            </label>
            <Input
              id={`language-${key}`}
              type="checkbox"
              checked={Boolean(enabledLanguages[key])}
              onChange={(checked) => onToggleLanguage(key, checked)}
            />
            <Input
              type="select"
              variant="control"
              value={versions[key]}
              options={versionOptions[key]?.versions ?? [versions[key]]}
              onChange={(next) => onVersionChange(key, next)}
            />
          </div>
        ))}
      </Accordion>

      <Accordion title="Text decorations" defaultOpen>
        <div className={rowClass}>
          <label className={labelClass} htmlFor="fonts">
            Fonts:
          </label>
          <Input
            id="fonts"
            type="select"
            variant="control"
            value={style.font}
            options={PROJECTOR_FONTS}
            onChange={(font) => onStyleChange({ font })}
          />
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="text-color">
            Text Color:
          </label>
          <Input
            id="text-color"
            type="select"
            variant="control"
            value={style.textColor}
            options={TEXT_COLORS.map(({ value, label }) => ({
              value,
              label,
              style: { color: value },
            }))}
            onChange={(textColor) => onStyleChange({ textColor })}
          />
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="text-position">
            Text Position:
          </label>
          <Input
            id="text-position"
            type="select"
            variant="control"
            value={style.textAlign}
            options={TEXT_ALIGNMENTS}
            onChange={(textAlign) => onStyleChange({ textAlign })}
          />
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="text-stroke">
            Text Stroke:
          </label>
          <Input
            id="text-stroke"
            type="select"
            variant="control"
            value={style.strokeColor}
            options={[{ value: '', label: 'None' }, ...STROKE_COLORS]}
            onChange={(strokeColor) => onStyleChange({ strokeColor })}
          />
        </div>

        <div className={rowClass}>
          <label className={labelClass} htmlFor="stroke-width">
            Stroke Width:
          </label>
          <Input
            id="stroke-width"
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={style.strokeWidth}
            onChange={(strokeWidth) => onStyleChange({ strokeWidth })}
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

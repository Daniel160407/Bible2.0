import { useEffect, useRef, useState } from 'react';
import { fetchBible } from '../../api/bibleApi';
import { useProjectorMeta } from '../../hooks/useBibleQueries';
import { createProjectorChannel } from '../../lib/projectorChannel';
import {
  DEFAULT_PROJECTOR_STYLE,
  PROJECTOR_LANGUAGES,
  mapBookIndexForLanguage,
} from '../../lib/constants';
import ProjectorControls from './ProjectorControls';
import BackgroundPicker from './BackgroundPicker';

/**
 * Owns the projector state (style, enabled languages, versions) and the
 * BroadcastChannel that drives the present view window.
 */
const ProjectorPanel = ({ display, separatedVerse }) => {
  const channelRef = useRef(null);
  const [style, setStyle] = useState(DEFAULT_PROJECTOR_STYLE);
  const [enabledLanguages, setEnabledLanguages] = useState({});
  const [versions, setVersions] = useState(() =>
    Object.fromEntries(PROJECTOR_LANGUAGES.map(({ key, defaultVersion }) => [key, defaultVersion])),
  );
  const [showError, setShowError] = useState(false);

  const metaByLanguage = useProjectorMeta();

  const styleRef = useRef(style);
  styleRef.current = style;

  useEffect(() => {
    const channel = createProjectorChannel();
    channelRef.current = channel;
    // Re-send the current style when a (re)opened present view window asks for it.
    channel.onmessage = (event) => {
      if (event.data?.type === 'sync-request') {
        channel.postMessage({ type: 'style', style: styleRef.current });
      }
    };
    return () => {
      channelRef.current = null;
      channel.close();
    };
  }, []);

  useEffect(() => {
    channelRef.current?.postMessage({ type: 'style', style });
  }, [style]);

  const updateStyle = (patch) => setStyle((current) => ({ ...current, ...patch }));

  const toggleLanguage = (key, checked) =>
    setEnabledLanguages((current) => ({ ...current, [key]: checked }));

  const setLanguageVersion = (key, version) =>
    setVersions((current) => ({ ...current, [key]: version }));

  const handleShow = async () => {
    const activeLanguages = PROJECTOR_LANGUAGES.filter(({ key }) => enabledLanguages[key]);
    if (activeLanguages.length === 0) {
      setShowError(true);
      return;
    }
    setShowError(false);

    const target = separatedVerse
      ? {
          bookIndex: separatedVerse.bookIndex,
          chapter: Number(separatedVerse.tavi),
          verse: Number(separatedVerse.muxli),
          till: null,
        }
      : {
          bookIndex: display.bookIndex,
          chapter: display.chapter,
          verse: display.verse,
          till: display.till,
        };
    if (!target.bookIndex || !target.chapter) return;

    const verses = {};
    await Promise.all(
      activeLanguages.map(async ({ key, apiCode }) => {
        const bookIndex = mapBookIndexForLanguage(target.bookIndex, apiCode);
        try {
          const data = await fetchBible({
            book: bookIndex,
            chapter: target.chapter,
            version: versions[key],
            language: apiCode,
          });
          verses[key] = {
            book: metaByLanguage[key]?.books?.[bookIndex - 1] ?? '',
            chapter: target.chapter,
            verse: target.verse,
            till: target.till,
            verses: (data.bibleData ?? []).slice(target.verse - 1, target.till ?? target.verse),
          };
        } catch (error) {
          console.error(`Failed to fetch ${key} verses`, error);
        }
      }),
    );

    channelRef.current?.postMessage({ type: 'verses', verses });
  };

  const handleClear = () => channelRef.current?.postMessage({ type: 'clear' });

  return (
    <div
      className="mx-auto mt-5 flex w-1/2 flex-col items-center gap-4 rounded-[10px] bg-panel-dark
        p-8 shadow-[0_4px_8px_rgba(0,0,0,0.5)] max-md:w-[90%] max-md:p-4 max-sm:w-[95%] max-sm:p-2"
    >
      <ProjectorControls
        style={style}
        onStyleChange={updateStyle}
        enabledLanguages={enabledLanguages}
        onToggleLanguage={toggleLanguage}
        versions={versions}
        versionOptions={metaByLanguage}
        onVersionChange={setLanguageVersion}
        showError={showError}
        onShow={handleShow}
        onClear={handleClear}
      />
      <BackgroundPicker onSelect={(background) => updateStyle({ background })} />
    </div>
  );
};

export default ProjectorPanel;

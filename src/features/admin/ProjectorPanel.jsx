import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chapterQueryOptions, useProjectorMeta } from '../../hooks/useBibleQueries';
import {
  PRESENT_VIEW_STATE,
  PRESENT_VIEW_STATE_REQUEST,
  countOpenPresentViews,
  createProjectorChannel,
} from '../../lib/projectorChannel';
import {
  DEFAULT_PROJECTOR_STYLE,
  PROJECTOR_LANGUAGES,
  mapBookIndexForLanguage,
} from '../../lib/constants';
import ProjectorControls from './ProjectorControls';
import BackgroundPicker from './BackgroundPicker';

const ProjectorPanel = ({ display, separatedVerse, showHandlerRef }) => {
  const channelRef = useRef(null);
  const [style, setStyle] = useState(DEFAULT_PROJECTOR_STYLE);
  const [enabledLanguages, setEnabledLanguages] = useState({});
  const [versions, setVersions] = useState(() =>
    Object.fromEntries(PROJECTOR_LANGUAGES.map(({ key, defaultVersion }) => [key, defaultVersion])),
  );
  const [errorKey, setErrorKey] = useState(null);
  const [isCheckingPresentView, setIsCheckingPresentView] = useState(false);

  const metaByLanguage = useProjectorMeta();
  const queryClient = useQueryClient();

  const styleRef = useRef(style);
  styleRef.current = style;
  const lastBroadcastRef = useRef(null);
  const hasAdoptedStateRef = useRef(false);
  const isFirstStyleBroadcastRef = useRef(true);

  useEffect(() => {
    const channel = createProjectorChannel();
    channelRef.current = channel;
    channel.onmessage = (event) => {
      const message = event.data;
      if (message?.type === 'sync-request') {
        channel.postMessage({ type: 'style', style: styleRef.current });
        if (lastBroadcastRef.current) channel.postMessage(lastBroadcastRef.current);
      } else if (message?.type === PRESENT_VIEW_STATE && !hasAdoptedStateRef.current) {
        hasAdoptedStateRef.current = true;
        isFirstStyleBroadcastRef.current = true;
        if (message.style) setStyle(message.style);
        lastBroadcastRef.current = message.visible
          ? { type: 'verses', verses: message.verses }
          : { type: 'clear' };
      }
    };
    channel.postMessage({ type: PRESENT_VIEW_STATE_REQUEST });
    return () => {
      channelRef.current = null;
      channel.close();
    };
  }, []);

  useEffect(() => {
    if (isFirstStyleBroadcastRef.current) {
      isFirstStyleBroadcastRef.current = false;
      return;
    }
    channelRef.current?.postMessage({ type: 'style', style });
  }, [style]);

  const updateStyle = (patch) => setStyle((current) => ({ ...current, ...patch }));

  const toggleLanguage = (key, checked) =>
    setEnabledLanguages((current) => ({ ...current, [key]: checked }));

  const setLanguageVersion = (key, version) =>
    setVersions((current) => ({ ...current, [key]: version }));

  const activeLanguages = PROJECTOR_LANGUAGES.filter(({ key }) => enabledLanguages[key]);

  const showError =
    errorKey === 'languages'
      ? activeLanguages.length === 0
        ? 'Select at least one language'
        : null
      : errorKey === 'present-view'
        ? 'Present View is not open — open it first'
        : null;

  const showMutation = useMutation({
    mutationFn: async (target) => {
      const verses = {};
      await Promise.all(
        activeLanguages.map(async ({ key, apiCode }) => {
          const bookIndex = mapBookIndexForLanguage(target.bookIndex, apiCode);
          try {
            const data = await queryClient.fetchQuery(
              chapterQueryOptions({
                bookIndex,
                chapter: target.chapter,
                version: versions[key],
                language: apiCode,
              }),
            );
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
      return verses;
    },
    onSuccess: (verses) => {
      lastBroadcastRef.current = { type: 'verses', verses };
      channelRef.current?.postMessage(lastBroadcastRef.current);
    },
  });

  const handleShow = async () => {
    if (showMutation.isPending || isCheckingPresentView) return;

    if (activeLanguages.length === 0) {
      setErrorKey('languages');
      return;
    }
    setErrorKey(null);

    setIsCheckingPresentView(true);
    const openPresentViews = await countOpenPresentViews();
    setIsCheckingPresentView(false);

    if (openPresentViews === 0) {
      setErrorKey('present-view');
      return;
    }

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

    showMutation.mutate(target);
  };

  if (showHandlerRef) showHandlerRef.current = handleShow;

  const handleClear = () => {
    lastBroadcastRef.current = { type: 'clear' };
    channelRef.current?.postMessage(lastBroadcastRef.current);
  };

  return (
    <div
      className="mx-auto mt-5 flex w-full flex-col items-center gap-4 rounded-[10px] bg-panel-dark
        p-8 shadow-[0_4px_8px_rgba(0,0,0,0.5)] max-md:p-4 max-sm:p-2"
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
        isShowPending={showMutation.isPending || isCheckingPresentView}
        onClear={handleClear}
      />
      <BackgroundPicker onSelect={(background) => updateStyle({ background })} />
    </div>
  );
};

export default ProjectorPanel;

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  PRESENT_VIEW_BYE,
  PRESENT_VIEW_CLOSE,
  PRESENT_VIEW_PING,
  PRESENT_VIEW_PONG,
  PRESENT_VIEW_STATE,
  PRESENT_VIEW_STATE_REQUEST,
  createProjectorChannel,
  isPreviewMode,
} from '../lib/projectorChannel';
import { DEFAULT_PROJECTOR_STYLE, PROJECTOR_LANGUAGES } from '../lib/constants';

const MIN_FONT_SIZE = 8;

const PresentViewPage = () => {
  const [style, setStyle] = useState(DEFAULT_PROJECTOR_STYLE);
  const [versesByLanguage, setVersesByLanguage] = useState(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const stateRef = useRef(null);
  stateRef.current = { style, verses: versesByLanguage, visible };

  useEffect(() => {
    const channel = createProjectorChannel();
    const isPreview = isPreviewMode();
    const instanceId = `${Date.now()}-${Math.random()}`;

    const announcePresence = () =>
      channel.postMessage({
        type: PRESENT_VIEW_PONG,
        id: instanceId,
        width: window.innerWidth,
        height: window.innerHeight,
      });

    channel.onmessage = (event) => {
      const message = event.data;
      switch (message?.type) {
        case PRESENT_VIEW_PING:
          if (!isPreview) announcePresence();
          break;
        case PRESENT_VIEW_STATE_REQUEST:
          if (!isPreview) {
            channel.postMessage({
              type: PRESENT_VIEW_STATE,
              id: instanceId,
              ...stateRef.current,
            });
          }
          break;
        case PRESENT_VIEW_STATE:
          setStyle(message.style);
          setVersesByLanguage(message.verses);
          setVisible(message.visible);
          break;
        case PRESENT_VIEW_CLOSE:
          if (!isPreview && (message.id == null || message.id === instanceId)) {
            channel.postMessage({ type: PRESENT_VIEW_BYE, id: instanceId });
            window.close();
          }
          break;
        case 'style':
          setStyle(message.style);
          break;
        case 'verses':
          setVersesByLanguage(message.verses);
          setVisible(true);
          break;
        case 'clear':
          setVisible(false);
          break;
        default:
          break;
      }
    };
    channel.postMessage({ type: PRESENT_VIEW_STATE_REQUEST });
    channel.postMessage({ type: 'sync-request' });
    if (!isPreview) announcePresence();

    const sayBye = () => channel.postMessage({ type: PRESENT_VIEW_BYE, id: instanceId });
    if (!isPreview) window.addEventListener('pagehide', sayBye);

    return () => {
      window.removeEventListener('pagehide', sayBye);
      if (!isPreview) sayBye();
      channel.close();
    };
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const fit = () => {
      const available = container.clientHeight;
      const availableWidth = container.clientWidth;
      if (!available || !availableWidth) return;

      const fits = (size) => {
        content.style.fontSize = `${size}px`;
        return content.scrollHeight <= available && content.scrollWidth <= availableWidth;
      };

      if (!content.textContent.trim()) {
        content.style.fontSize = '';
        return;
      }

      let low = MIN_FONT_SIZE;
      if (!fits(low)) {
        content.style.fontSize = `${low}px`;
        return;
      }

      let high = low * 2;
      while (fits(high)) {
        low = high;
        high *= 2;
      }

      while (high - low > 1) {
        const mid = Math.floor((low + high) / 2);
        if (fits(mid)) low = mid;
        else high = mid;
      }

      content.style.fontSize = `${low}px`;
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(container);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => observer.disconnect();
  }, [style.font, style.strokeWidth, versesByLanguage, visible]);

  const textStyle = {
    fontSize: 'inherit',
    WebkitTextStroke:
      style.strokeColor && style.strokeWidth > 0
        ? `${style.strokeWidth}px ${style.strokeColor}`
        : undefined,
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat px-[50px] py-[30px]"
      style={{
        backgroundImage: `url(${style.background})`,
        fontFamily: style.font,
        color: style.textColor,
        textAlign: style.textAlign,
      }}
    >
      <div
        ref={containerRef}
        className="flex h-full w-full flex-col justify-center overflow-hidden"
      >
        <div ref={contentRef}>
          {visible &&
            versesByLanguage &&
            PROJECTOR_LANGUAGES.map(({ key }) => {
              const group = versesByLanguage[key];
              if (!group?.verses?.length) return null;
              return (
                <div key={key} className="mb-[0.5em] last:mb-0">
                  {group.verses.map((verse, index) => (
                    <h1
                      key={verse?.id ?? index}
                      className="font-bold leading-tight"
                      style={textStyle}
                    >
                      {verse?.bv}
                    </h1>
                  ))}
                  <h1 className="font-bold leading-tight" style={textStyle}>
                    {group.book} {group.chapter}:{group.verse}
                    {group.till != null ? `-${group.till}` : ''}
                  </h1>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PresentViewPage;

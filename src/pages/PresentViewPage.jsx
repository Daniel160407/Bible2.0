import { useEffect, useState } from 'react';
import { createProjectorChannel } from '../lib/projectorChannel';
import { DEFAULT_PROJECTOR_STYLE, PROJECTOR_LANGUAGES } from '../lib/constants';

const PresentViewPage = () => {
  const [style, setStyle] = useState(DEFAULT_PROJECTOR_STYLE);
  const [versesByLanguage, setVersesByLanguage] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const channel = createProjectorChannel();
    channel.onmessage = (event) => {
      const message = event.data;
      switch (message?.type) {
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
    channel.postMessage({ type: 'sync-request' });
    return () => channel.close();
  }, []);

  const textStyle = {
    fontSize: `${style.fontSize * 10}px`,
    WebkitTextStroke:
      style.strokeColor && style.strokeWidth > 0
        ? `${style.strokeWidth}px ${style.strokeColor}`
        : undefined,
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${style.background})`,
        fontFamily: style.font,
        color: style.textColor,
        textAlign: style.textAlign,
      }}
    >
      <div className="scroll-smooth px-[50px]">
        {visible &&
          versesByLanguage &&
          PROJECTOR_LANGUAGES.map(({ key }) => {
            const group = versesByLanguage[key];
            if (!group?.verses?.length) return null;
            return (
              <div key={key}>
                {group.verses.map((verse, index) => (
                  <h1 key={verse?.id ?? index} className="mb-[5px] font-bold" style={textStyle}>
                    {verse?.bv}
                  </h1>
                ))}
                <h1 className="font-bold" style={textStyle}>
                  {group.book} {group.chapter}:{group.verse}
                  {group.till != null ? `-${group.till}` : ''}
                </h1>
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PresentViewPage;

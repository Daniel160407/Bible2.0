const cardClass =
  'mb-[15px] animate-fade-in-up rounded-lg bg-card p-[15px] shadow-[0_2px_4px_rgba(0,0,0,0.3)] ' +
  'transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]';

const textClass = 'm-0 text-2xl font-bold leading-[1.4] text-white';
const referenceClass = 'mt-2.5 text-base font-bold italic text-[#aaaaaa]';

const VersePreview = ({ display, separatedVerse, onSeparate }) => {
  const renderContent = () => {
    if (separatedVerse) {
      return (
        <div className={cardClass}>
          <h1 className={textClass} dangerouslySetInnerHTML={{ __html: separatedVerse.bv }} />
          <h1 className={referenceClass}>
            {separatedVerse.book} {separatedVerse.tavi}:{separatedVerse.muxli}
          </h1>
        </div>
      );
    }

    if (!display.verses?.length) {
      return (
        <div className={cardClass}>
          <h1 className={textClass}>No Verses to Display</h1>
        </div>
      );
    }

    if (display.chapter) {
      return display.verses.map((verse, index) => (
        <div key={verse.id ?? index} className={cardClass}>
          <h1 className={textClass}>{verse.bv}</h1>
          <h1 className={referenceClass}>
            {display.book} {display.chapter}:{display.verse + index}
          </h1>
        </div>
      ));
    }

    return display.verses.map((verse, index) => (
      <div key={verse.id ?? index} className={cardClass}>
        <h1 className={textClass} dangerouslySetInnerHTML={{ __html: verse.bv }} />
        <h1 className={referenceClass}>
          {verse.book ?? display.book} {verse.tavi}:{verse.muxli}
        </h1>
        <div className="mt-2.5 flex justify-center">
          <button
            className="h-[30px] w-[100px] cursor-pointer rounded-[10px] bg-[#757575] font-bold text-[#f4f4f4]
              transition-[background-color,box-shadow] duration-300 hover:bg-[#909090]
              hover:shadow-[0_0_5px_2px_rgba(117,117,117,0.5)] focus:outline-none
              focus:shadow-[0_0_5px_2px_rgba(117,117,117,0.5)]"
            onClick={() => onSeparate(verse)}
          >
            Separate
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="mt-5 max-h-[600px] overflow-y-auto rounded-[10px] bg-panel p-5 font-banner
        text-[#f5f5f5] shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
    >
      {renderContent()}
    </div>
  );
};

export default VersePreview;

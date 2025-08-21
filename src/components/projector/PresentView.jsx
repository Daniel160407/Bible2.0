import { useState, useEffect } from "react";
import "../../style/PresentView.scss";

const PresentView = () => {
  const [versesToDisplay, setVersesToDisplay] = useState([]);
  const [show, setShow] = useState(false);
  const [fontSize, setFontSize] = useState(null);
  const [strokeWidth, setSrokeWidth] = useState(1);
  const channel = new BroadcastChannel("projectorData");

  useEffect(() => {
    document.body.style.color = "#f4f4f4";
    document.body.style.backgroundImage = "url(/backgrounds/16.jpeg)";

    channel.onmessage = (event) => {
      const data = event.data;

      if (data.background) {
        document.body.style.backgroundImage = `url(${data.background})`;
      } else if (data.font) {
        document.body.style.fontFamily = data.font;
      } else if (data.textColor) {
        document.body.style.color = data.textColor;
      } else if (data.textPos) {
        const versesContainer = document.getElementById("verses");
        if (versesContainer) {
          if (["left", "center", "right"].includes(data.textPos)) {
            versesContainer.style.textAlign = data.textPos;
          }
        }
      } else if (data.textStroke) {
        const verses = document.getElementsByClassName("verse-text");
        const refs = document.getElementsByClassName("verse-reference");

        Array.from(verses).forEach((verse) => {
          verse.style.webkitTextStroke = `${strokeWidth}px ${data.textStroke}`;
        });
        Array.from(refs).forEach((ref) => {
          ref.style.webkitTextStroke = `${strokeWidth}px ${data.textStroke}`;
        });
      } else if (data.strokeWidth) {
        setSrokeWidth(data.strokeWidth); // update state
        const verses = document.getElementsByClassName("verse-text");
        const refs = document.getElementsByClassName("verse-reference");

        Array.from(verses).forEach((verse) => {
          verse.style.webkitTextStroke = `${data.strokeWidth}px ${
            verse.style.color || "#000"
          }`;
        });
        Array.from(refs).forEach((ref) => {
          ref.style.webkitTextStroke = `${data.strokeWidth}px ${
            ref.style.color || "#000"
          }`;
        });
      } else {
        if (data.show === false) {
          setShow(false);
        } else {
          if (!data.versesToDisplay) {
            setFontSize(data.fontSize);
          } else {
            setVersesToDisplay(data.versesToDisplay || []);
            setShow(data.show);
            setFontSize(data.fontSize);
          }
        }
      }
    };
  }, []);

  useEffect(() => {
    if (fontSize !== null) {
      const verses = document.getElementsByClassName("verse-text");
      Array.from(verses).forEach((verse) => {
        verse.style.fontSize = `${fontSize * 10}px`;
      });

      const references = document.getElementsByClassName("verse-reference");
      Array.from(references).forEach((reference) => {
        reference.style.fontSize = `${fontSize * 10}px`;
      });
    }
  }, [versesToDisplay, fontSize]);

  const renderVerses = (language) => {
    const verses = versesToDisplay[language];
    if (show && verses && verses.bv.length > 0) {
      return (
        <>
          {verses.bv.map((verse) => (
            <div key={verse.id} className="verse">
              <h1 className="verse-text">{verse.bv}</h1>
            </div>
          ))}
          <h1 className="verse-reference">
            {verses.book} {verses.chapter}:{verses.verse}
            {verses.till !== null ? "-" + verses.till : ""}
          </h1>
          <br />
        </>
      );
    }
    return null;
  };

  return (
    <div id="present-view">
      <div id="verses">
        {renderVerses("geo")}
        {renderVerses("eng")}
        {renderVerses("rus")}
      </div>
    </div>
  );
};

export default PresentView;

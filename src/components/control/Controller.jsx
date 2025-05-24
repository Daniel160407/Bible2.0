import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import ProjectorController from "../projector/ProjectorController";
import axios from "axios";
import BackgroundController from "./BackgroundController";

const Controller = ({ versesToDisplay, separatedVerse }) => {
  const [show, setShow] = useState(false);
  const [clear, setClear] = useState(false);
  const channel = new BroadcastChannel("projectorData");

  const [languages, setLanguages] = useState({});
  const [versions, setVersions] = useState({});

  const [fontSize, setFontSize] = useState(7);
  const [font, setFont] = useState("Banner");
  const [textColor, setTextColor] = useState("white");
  const [textPos, setTextPos] = useState("left");

  const [geoBooks, setGeoBooks] = useState([]);
  const [engBooks, setEngBooks] = useState([]);
  const [rusBooks, setRusBooks] = useState([]);
  const [uaBooks, setUaBooks] = useState([]);
  const [frBooks, setFrBooks] = useState([]);
  const [grBooks, setGrBooks] = useState([]);
  const [trBooks, setTrBooks] = useState([]);
  const [esBooks, setEsBooks] = useState([]);

  const [background, setBackground] = useState("/backgrounds/16.jpeg");

  const englishBookIndexes = {
    48: 62,
    49: 63,
    50: 64,
    51: 65,
    52: 66,
    53: 67,
    54: 68,
    55: 48,
    56: 49,
    57: 50,
    58: 51,
    59: 52,
    60: 53,
    61: 54,
    62: 55,
    63: 56,
    64: 57,
    65: 58,
    66: 59,
    67: 60,
    68: 61,
  };

  useEffect(() => {
    const fetchBooks = async (language, setBooks) => {
      try {
        const response = await axios.get(
          `https://holybible.ge/service.php?w=&t=&m=&s=&mv=&language=${language}&page=1`
        );
        setBooks(response.data.bibleNames);
      } catch (error) {
        console.error(`Failed to fetch ${language} books`, error);
      }
    };

    const languagesToFetch = [
      { language: "geo", setter: setGeoBooks },
      { language: "eng", setter: setEngBooks },
      { language: "russian", setter: setRusBooks },
      { language: "ukrainian", setter: setUaBooks },
      { language: "french", setter: setFrBooks },
      { language: "greek", setter: setGrBooks },
      { language: "turkish", setter: setTrBooks },
      { language: "spanish", setter: setEsBooks },
    ];

    languagesToFetch.forEach(({ language, setter }) =>
      fetchBooks(language, setter)
    );
  }, []);

  useEffect(() => {
    channel.postMessage({ font });
  }, [font]);

  useEffect(() => {
    channel.postMessage({ fontSize, show: true });
  }, [fontSize]);

  useEffect(() => {
    channel.postMessage({ textColor });
  }, [textColor]);

  useEffect(() => {
    channel.postMessage({ textPos });
  }, [textPos]);

  useEffect(() => {
    channel.postMessage({ background });
  }, [background]);

  useEffect(() => {
    if (show) {
      const fetchVerses = async (language, version, books, setVerses) => {
        const originalBookIndex = versesToDisplay.bookIndex;

        if (
          language === "eng" &&
          englishBookIndexes[versesToDisplay.bookIndex]
        ) {
          versesToDisplay.bookIndex =
            englishBookIndexes[versesToDisplay.bookIndex];
        }

        try {
          const response = await axios.get(
            `https://holybible.ge/service.php?w=${
              separatedVerse
                ? versesToDisplay.bookIndex + 1
                : versesToDisplay.bookIndex
            }&t=${
              separatedVerse ? separatedVerse.tavi : versesToDisplay.chapter
            }&m=&s=&mv=${version}&language=${language}&page=1`
          );

          const bibleData = response.data.bibleData;
          const bv = [];

          if (!separatedVerse) {
            const start = versesToDisplay.verse - 1;
            const end =
              versesToDisplay.till !== null ? versesToDisplay.till - 1 : start;
            for (let i = start; i <= end; i++) {
              bv.push(bibleData[i]);
            }
          } else {
            for (const verse of bibleData) {
              if (
                verse.tavi === separatedVerse.tavi &&
                verse.muxli === separatedVerse.muxli
              ) {
                bv.push(verse);
              }
            }
          }

          setVerses({
            book: books[versesToDisplay.bookIndex - (separatedVerse ? 0 : 1)],
            chapter: separatedVerse
              ? separatedVerse.tavi
              : versesToDisplay.chapter,
            verse: separatedVerse
              ? separatedVerse.muxli
              : versesToDisplay.verse,
            till: separatedVerse ? null : versesToDisplay.till,
            bv,
          });
        } catch (error) {
          console.error(`Failed to fetch ${language} verses`, error);
        } finally {
          if (language === "eng") {
            versesToDisplay.bookIndex = originalBookIndex;
          }
        }
      };

      const verses = {};
      const setVerses = (lang, versesData) => {
        verses[lang] = versesData;
        channel.postMessage({ versesToDisplay: verses, fontSize, show });
        setShow(false);
      };

      Object.entries(languages).forEach(([lang, isSelected]) => {
        if (isSelected && versions[lang]) {
          const books = {
            geo: geoBooks,
            eng: engBooks,
            russian: rusBooks,
            ukrainian: uaBooks,
            french: frBooks,
            greek: grBooks,
            turkish: trBooks,
            spanish: esBooks,
          }[lang];

          fetchVerses(lang, versions[lang], books, (data) =>
            setVerses(lang, data)
          );
        }
      });
    }
  }, [show]);

  useEffect(() => {
    if (clear) {
      channel.postMessage({ show });
      setClear(false);
    }
  }, [clear]);

  return (
    <>
      <div id="control">
        <ProjectorController
          setShow={setShow}
          setClear={setClear}
          setVersions={setVersions}
          setLanguages={setLanguages}
          setFontSize={setFontSize}
          fontSize={fontSize}
          setFont={setFont}
          font={font}
          setTextColor={setTextColor}
          textColor={textColor}
          textPos={textPos}
          setTextPos={setTextPos}
        />
        <BackgroundController setBackground={setBackground} />
      </div>
      <Buttons />
    </>
  );
};

export default Controller;

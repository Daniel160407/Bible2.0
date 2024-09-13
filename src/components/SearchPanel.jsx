import axios from "axios";
import { useEffect, useState } from "react";
import "../style/SearchPanel.scss";
import Cookies from "js-cookie";

const SearchPanel = ({
  setVersesToDisplay,
  setBookToDisplay,
  setSeperatedVerse,
}) => {
  const [language, setLanguage] = useState("geo");
  const [versions, setVersions] = useState([]);
  const [books, setBooks] = useState([]);
  const [chaptersAmount, setChaptersAmount] = useState(0);
  const [versesAmount, setVersesAmount] = useState(0);
  const [verses, setVerses] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedBookIndex, setSelectedBookIndex] = useState(3);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [selectedTill, setSelectedTill] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [wholeBible, setWholeBible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCostumer, setNewCostumer] = useState(
    Cookies.get("newCostumer") || true
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://holybible.ge/service.php?w=4&t=&m=&s=&language=${language}&page=1`
      )
      .then((response) => {
        const data = response.data;
        setVersions(data.versions);
        setBooks(data.bibleNames);
        setChaptersAmount(data.tavi[0].cc);
        setVersesAmount(data.muxli[0].cc);

        setSelectedBook(data.bibleNames[3]);
        setSelectedBookIndex(4);
        setSelectedVersion(data.versions[0]);

        axios
          .get(
            `https://holybible.ge/service.php?w=4&t=1&m=&s=&mv=ახალი გადამუშავებული გამოცემა 2015&language=${language}&page=1`
          )
          .then((response) => {
            setVerses(response.data.bibleData);
            setSelectedChapter(1);
            setSelectedVerse(0);

            const selectedVerseData = {
              book: data.bibleNames[3],
              bookIndex: 4,
              chapter: 1,
              verse: 1,
              till: null,
              bv: [response.data.bibleData[0]],
            };

            setVersesToDisplay(selectedVerseData);
          });
      })
      .catch((error) => {
        console.error("There was an error fetching the versions!", error);
      })
      .finally(() => setLoading(false));
  }, [language]);

  const handleLanguageChange = (e) => {
    setLoading(true);
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    axios
      .get(
        `https://holybible.ge/service.php?w=4&t=0&m=&s=&language=${selectedLanguage}&page=1`
      )
      .then((response) => {
        const data = response.data;
        setVersions(data.versions);
        setBooks(data.bibleNames);
      })
      .catch((error) => {
        console.error("There was an error fetching the versions!", error);
      })
      .finally(() => setLoading(false));
  };

  const handleBookChange = (e) => {
    setLoading(true);
    setSelectedChapter("");
    setSelectedVerse(null);
    setSelectedTill(null);

    const bookName = e.target.value;
    const bookIndex = books.indexOf(bookName) + 1;
    setSelectedBook(bookName);
    setSelectedBookIndex(bookIndex);
    setBookToDisplay(bookName);
    axios
      .get(
        `https://holybible.ge/service.php?w=${bookIndex}&t=1&m=&s=&mv=${selectedVersion}&language=${language}&page=1`
      )
      .then((response) => {
        const data = response.data;
        setChaptersAmount(data.tavi[0].cc);
        setVersesAmount(data.muxli[0].cc);

        const selectedVerseData = {
          book: bookName,
          bookIndex: bookIndex,
          chapter: 1,
          verse: 1,
          till: null,
          bv: [data.bibleData[0]],
        };

        setVersesToDisplay(selectedVerseData);
      })
      .catch((error) => {
        console.error("There was an error fetching the versions!", error);
      })
      .finally(() => setLoading(false));
  };

  const handleChapterChange = (e) => {
    setLoading(true);
    setSelectedVerse(null);
    setSelectedTill(null);

    const chapter = e.target.value;
    setSelectedChapter(chapter);
    axios
      .get(
        `https://holybible.ge/service.php?w=${selectedBookIndex}&t=${chapter}&m=&s=&mv=${selectedVersion}&language=${language}&page=1`
      )
      .then((response) => {
        const data = response.data;
        if (data.bibleData) {
          setVerses(data.bibleData);

          const selectedVerseData = {
            book: selectedBook,
            bookIndex: selectedBookIndex,
            chapter: chapter,
            verse: 1,
            till: null,
            bv: [data.bibleData[0]],
          };

          setVersesToDisplay(selectedVerseData);
        } else {
          console.error("Bible data is not available in the response");
        }
        setVersesAmount(data.muxli[0].cc);
      })
      .catch((error) => {
        console.error("There was an error fetching the chapters!", error);
      })
      .finally(() => setLoading(false));
  };

  const handleVerseChange = (e) => {
    setSelectedTill(null);
    let verseIndex;

    if (!e.target || typeof e.target.value === "undefined") {
      verseIndex = e;
    } else {
      verseIndex = parseInt(e.target.value - 1);
    }

    setSelectedVerse(verseIndex);
    setSelectedVerseIndex(verseIndex);

    if (verses && verses.length > verseIndex) {
      const selectedVerseData = {
        book: selectedBook,
        bookIndex: selectedBookIndex,
        chapter: parseInt(selectedChapter) || 1,
        verse: parseInt(verseIndex + 1),
        till: null,
        bv: [verses[verseIndex]],
      };

      setVersesToDisplay(selectedVerseData);
    } else {
      console.error(
        "Selected verse index is out of bounds or verses is undefined"
      );
    }
  };

  const handleTillChange = (e) => {
    const tillVerseIndex = parseInt(e.target.value) - 1;
    setSelectedTill(tillVerseIndex);

    const versesToDisplayArray = verses.slice(
      selectedVerseIndex,
      tillVerseIndex + 1
    );
    const versesToDisplay = {
      book: selectedBook,
      bookIndex: selectedBookIndex,
      chapter: parseInt(selectedChapter),
      verse: parseInt(selectedVerse + 1),
      till: parseInt(tillVerseIndex + 1),
      bv: versesToDisplayArray,
    };
    setVersesToDisplay(versesToDisplay);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      setSeperatedVerse(null);
      const pattern = /(\d?\D+?) (\d+):(\d+)(?:-(\d+))?/;
      const matcher = searchText.match(pattern);

      let bookindex;

      if (matcher) {
        const searchedBook = matcher[1].trim();
        let bookFound = false;

        for (let i = 0; i < books.length; i++) {
          if (books[i].toLowerCase().startsWith(searchedBook.toLowerCase())) {
            setSelectedBook(books[i]);
            bookindex = i + 1;
            setSelectedBookIndex(bookindex);
            setBookToDisplay(books[i]);
            bookFound = true;
            break;
          }
        }

        if (bookFound) {
          const searchedChapter = parseInt(matcher[2], 10);
          setSelectedChapter(searchedChapter);

          const searchedVerse = parseInt(matcher[3], 10);
          setSelectedVerse(searchedVerse - 1);
          setSelectedVerseIndex(searchedVerse - 1);

          const searchedTill = matcher[4] ? parseInt(matcher[4], 10) : null;
          setSelectedTill(searchedTill ? searchedTill - 1 : null);

          axios
            .get(
              `https://holybible.ge/service.php?w=${bookindex}&t=${searchedChapter}&m=&s=&mv=${selectedVersion}&language=${language}&page=1`
            )
            .then((response) => {
              const data = response.data;
              if (data.bibleData) {
                setVerses(data.bibleData);
                const versesToDisplayArray = data.bibleData.slice(
                  searchedVerse - 1,
                  searchedTill ? searchedTill : searchedVerse
                );

                const versesToDisplay = {
                  book: books[bookindex - 1],
                  bookIndex: bookindex,
                  chapter: searchedChapter,
                  verse: searchedVerse,
                  till: searchedTill,
                  bv: versesToDisplayArray,
                };
                setVersesToDisplay(versesToDisplay);
              } else {
                console.error("Bible data is not available in the response");
              }
            })
            .catch((error) => {
              console.error("There was an error fetching the chapters!", error);
            })
            .finally(() => setLoading(false));
        } else {
          console.error("Book not found");
        }
      } else {
        if (wholeBible) {
          const searchPromises = books
            .slice(3)
            .map((book, index) =>
              axios.get(
                `https://holybible.ge/service.php?w=${
                  index + 4
                }&t=&m=&s=${searchText}&mv=${selectedVersion}&language=${language}&page=1`
              )
            );

          Promise.all(searchPromises)
            .then((results) => {
              const allVerses = results.flatMap(
                (result) => result.data.bibleData || []
              );

              allVerses.forEach((verse) => {
                verse.wholeBible = true;
                verse.book = books[parseInt(verse.wigni) + 2];
                verse.bookIndex = parseInt(verse.wigni) + 2;
              });

              const versesToDisplay = {
                book: null,
                bookIndex: null,
                chapter: null,
                verse: null,
                till: null,
                bv: allVerses,
              };
              setVersesToDisplay(versesToDisplay);
            })
            .catch((error) =>
              console.error("Error fetching search results:", error)
            )
            .finally(() => setLoading(false));
        } else {
          axios
            .get(
              `https://holybible.ge/service.php?w=${selectedBookIndex}&t=&m=&s=${e.target.value}&mv=${selectedVersion}&language=${language}&page=1`
            )
            .then((response) => {
              const data = response.data;

              const versesToDisplay = {
                book: books[selectedBookIndex - 1],
                bookIndex: selectedBookIndex - 1,
                chapter: null,
                verse: null,
                till: null,
                bv: data.bibleData,
              };
              setVersesToDisplay(versesToDisplay);
            })
            .finally(() => setLoading(false));
        }
      }
    }
  };

  const onClearButtonClick = () => {
    const versesToDisplay = {
      book: null,
      chapter: null,
      verse: null,
      till: null,
      bv: null,
    };

    setVersesToDisplay(versesToDisplay);
  };

  const handleLeftArrowClick = () => {
    handleVerseChange(parseInt(selectedVerse) - 1);
  };

  const handleRightArrowClick = () => {
    handleVerseChange(parseInt(selectedVerse) + 1);
  };

  const handleFarmerClick = () => {
    Cookies.set("newCostumer", false, { expires: 365 });
    setNewCostumer(false);
  };

  return (
    <div id="searchPanel">
      <select id="language" value={language} onChange={handleLanguageChange}>
        <option value="geo">GEO</option>
        <option value="eng">ENG</option>
        <option value="russian">RUS</option>
        <option value="ua">UA</option>
        <option value="fr">FR</option>
        <option value="gr">GR</option>
        <option value="tr">TR</option>
        <option value="es">SP</option>
      </select>
      <select
        id="versions"
        value={selectedVersion}
        onChange={(e) => setSelectedVersion(e.target.value)}
      >
        {versions.map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>
      <select id="books" value={selectedBook} onChange={handleBookChange}>
        {books.map((book) => (
          <option key={book} value={book}>
            {book}
          </option>
        ))}
      </select>
      <select
        id="chapters"
        value={selectedChapter}
        onChange={handleChapterChange}
      >
        {Array.from({ length: chaptersAmount }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select
        id="verses"
        value={selectedVerse + 1}
        onChange={handleVerseChange}
      >
        {Array.from({ length: versesAmount }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select id="till" value={selectedTill + 1} onChange={handleTillChange}>
        {Array.from({ length: versesAmount }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        id="search"
        type="text"
        placeholder="Search"
        value={searchText}
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <input
        id="wholeBible"
        type="checkbox"
        onChange={() => setWholeBible(!wholeBible)}
      ></input>
      <div className="arrows">
        <svg
          onClick={handleLeftArrowClick}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.2"
          baseProfile="tiny"
          viewBox="0 0 24 24"
          className="arrow"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 11h-7.244l1.586-1.586c.781-.781.781-2.049 0-2.828-.781-.781-2.047-.781-2.828 0l-6.414 6.414 6.414 6.414c.39.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.049 0-2.828l-1.586-1.586h7.244c1.104 0 2-.896 2-2 0-1.105-.896-2-2-2z"></path>
        </svg>
        <svg
          onClick={handleRightArrowClick}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.2"
          baseProfile="tiny"
          viewBox="0 0 24 24"
          className="arrow"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.586 6.586c-.781.779-.781 2.047 0 2.828l1.586 1.586h-7.244c-1.104 0-2 .895-2 2 0 1.104.896 2 2 2h7.244l-1.586 1.586c-.781.779-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l6.414-6.414-6.414-6.414c-.781-.781-2.047-.781-2.828 0z"></path>
        </svg>
      </div>
      <button id="clearButton" onClick={onClearButtonClick}>
        Clear
      </button>
      {loading && <div className="loader"></div>}
      {newCostumer && (
        <div onClick={handleFarmerClick} className="farmer-container">
          <div className="cloud">
            <p className="message">
              Welcome to the Bible app! Please read a{" "}
              <a onClick={handleFarmerClick} href="/documentation" target="_blank">documentation</a>, or scroll down in
              documentation to watch a video instruction.
            </p>
          </div>
          <div className="farmer">
            <div className="hat"></div>
            <div className="body"></div>
            <div className="legs"></div>
            <div className="arms"></div>
            <div className="face">
              <div className="eyes"></div>
              <div className="mouth"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;

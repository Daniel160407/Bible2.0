import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useBibleMeta, useChapter } from '../../hooks/useBibleQueries';
import { useVerseSearch } from '../../hooks/useVerseSearch';
import { parseReference, findBook } from '../../lib/parseReference';
import {
  EMPTY_DISPLAY,
  FIRST_BOOK_INDEX,
  PREVIEW_LANGUAGES,
  bookNameForLanguage,
  canonicalBookIndex,
  mapBookIndexForLanguage,
} from '../../lib/constants';
import Loader from '../../components/ui/Loader';
import WelcomeFarmer from './WelcomeFarmer';

const fieldClass =
  'appearance-none rounded-[5px] border border-[#555] bg-field p-2 text-base leading-normal ' +
  'text-white outline-none transition-[border-color,box-shadow] duration-150 ' +
  'hover:border-[#007bff] focus:border-[#007bff] focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)]';

const SLOW_NETWORK_DELAY_MS = 2000;

const SearchPanel = ({ onDisplayChange }) => {
  const [language, setLanguage] = useState('geo');
  const [version, setVersion] = useState('');
  const [bookIndex, setBookIndex] = useState(FIRST_BOOK_INDEX);
  const [chapter, setChapter] = useState(1);
  const [verseFrom, setVerseFrom] = useState(1);
  const [verseTill, setVerseTill] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [wholeBible, setWholeBible] = useState(false);
  // When true, the preview shows search results / nothing instead of the selected passage.
  const [passageSuppressed, setPassageSuppressed] = useState(false);
  const [showSlowNetwork, setShowSlowNetwork] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => Cookies.get('newCustomer') === undefined);

  const { data: meta, isFetching: metaLoading } = useBibleMeta(language);
  const books = meta?.books ?? [];
  const versions = meta?.versions ?? [];

  const { data: chapterData, isFetching: chapterLoading } = useChapter({
    bookIndex: mapBookIndexForLanguage(bookIndex, language),
    chapter,
    version,
    language,
  });
  const verseCount = chapterData?.verseCount ?? 0;
  const chapterCount = chapterData?.chapterCount ?? 0;

  const { searchBook, searchWholeBible, isSearching } = useVerseSearch({ language, books });

  const loading = metaLoading || chapterLoading || isSearching;

  // Keep the selected version valid for the current language.
  useEffect(() => {
    const available = meta?.versions ?? [];
    if (available.length > 0 && !available.includes(version)) {
      setVersion(available[0]);
    }
  }, [meta, version]);

  // Show a hint when a request takes suspiciously long.
  useEffect(() => {
    if (!loading) {
      setShowSlowNetwork(false);
      return;
    }
    const timer = setTimeout(() => setShowSlowNetwork(true), SLOW_NETWORK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [loading]);

  // Push the selected passage into the preview whenever the selection or its data changes.
  useEffect(() => {
    if (passageSuppressed || !chapterData?.verses?.length) return;
    onDisplayChange({
      book: bookNameForLanguage(books, bookIndex, language),
      bookIndex,
      chapter,
      verse: verseFrom,
      till: verseTill,
      verses: chapterData.verses.slice(verseFrom - 1, verseTill ?? verseFrom),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterData, bookIndex, chapter, verseFrom, verseTill, passageSuppressed]);

  const selectPassage = ({ book = bookIndex, chapter: nextChapter = 1, verse = 1, till = null }) => {
    setPassageSuppressed(false);
    setBookIndex(book);
    setChapter(nextChapter);
    setVerseFrom(verse);
    setVerseTill(till);
  };

  const handleBookChange = (e) => {
    const listIndex = books.indexOf(e.target.value) + 1;
    selectPassage({ book: canonicalBookIndex(listIndex, language) });
  };

  const stepVerse = (delta) => {
    setPassageSuppressed(false);
    setVerseTill(null);
    setVerseFrom((verse) => Math.min(Math.max(verse + delta, 1), Math.max(verseCount, 1)));
  };

  const showSearchResults = (verses) => {
    setPassageSuppressed(true);
    onDisplayChange({ ...EMPTY_DISPLAY, verses });
  };

  const handleSearchKeyDown = (e) => {
    if (e.key !== 'Enter' || searchText.trim() === '') return;

    const reference = parseReference(searchText);
    const book = reference && findBook(books, reference.bookQuery);
    if (book) {
      selectPassage({
        book: canonicalBookIndex(book.bookIndex, language),
        chapter: reference.chapter,
        verse: reference.verse ?? 1,
        till: reference.till,
      });
      return;
    }

    if (wholeBible) {
      searchWholeBible({ text: searchText, version, onResults: showSearchResults });
    } else {
      searchBook({
        text: searchText,
        version,
        bookIndex: mapBookIndexForLanguage(bookIndex, language),
        onResults: showSearchResults,
      });
    }
  };

  const handleClear = () => {
    setPassageSuppressed(true);
    onDisplayChange(EMPTY_DISPLAY);
  };

  const dismissWelcome = () => {
    Cookies.set('newCustomer', 'false', { expires: 365 });
    setShowWelcome(false);
  };

  return (
    <div className="flex flex-wrap gap-2.5 rounded-[10px] bg-[#1f2937] p-5">
      <select
        className={`${fieldClass} cursor-pointer`}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {PREVIEW_LANGUAGES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        className={`${fieldClass} cursor-pointer`}
        value={version}
        onChange={(e) => setVersion(e.target.value)}
      >
        {versions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className={`${fieldClass} cursor-pointer`}
        value={bookNameForLanguage(books, bookIndex, language)}
        onChange={handleBookChange}
      >
        {books.map((book) => (
          <option key={book} value={book}>
            {book}
          </option>
        ))}
      </select>

      <select
        className={`${fieldClass} w-[60px] cursor-pointer`}
        value={chapter}
        onChange={(e) => selectPassage({ chapter: Number(e.target.value) })}
      >
        {Array.from({ length: chapterCount }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <select
        className={`${fieldClass} w-[60px] cursor-pointer`}
        value={verseFrom}
        onChange={(e) => selectPassage({ chapter, verse: Number(e.target.value) })}
      >
        {Array.from({ length: verseCount }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <select
        className={`${fieldClass} w-[60px] cursor-pointer`}
        value={verseTill ?? 1}
        onChange={(e) =>
          selectPassage({ chapter, verse: verseFrom, till: Number(e.target.value) })
        }
      >
        {Array.from({ length: verseCount }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <input
        className={fieldClass}
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleSearchKeyDown}
      />

      <div className="mt-4 flex justify-center">
        <label className="relative inline-flex cursor-pointer items-center gap-2 text-[0.8rem] font-medium text-white">
          <input
            type="checkbox"
            className="peer hidden"
            checked={wholeBible}
            onChange={(e) => setWholeBible(e.target.checked)}
          />
          <span
            className="relative h-5 w-10 rounded-full bg-[#ccc] transition-colors duration-[400ms]
              before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full
              before:bg-white before:transition-transform before:duration-[400ms]
              peer-checked:bg-[#4caf50] peer-checked:before:translate-x-5"
          />
          Search in Whole Bible
        </label>
      </div>

      <div className="flex items-center">
        <svg
          onClick={() => stepVerse(-1)}
          className="h-[30px] w-[30px] cursor-pointer text-[#edf8ff]"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.2"
          baseProfile="tiny"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 11h-7.244l1.586-1.586c.781-.781.781-2.049 0-2.828-.781-.781-2.047-.781-2.828 0l-6.414 6.414 6.414 6.414c.39.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.049 0-2.828l-1.586-1.586h7.244c1.104 0 2-.896 2-2 0-1.105-.896-2-2-2z" />
        </svg>
        <svg
          onClick={() => stepVerse(1)}
          className="h-[30px] w-[30px] cursor-pointer text-[#edf8ff]"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.2"
          baseProfile="tiny"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.586 6.586c-.781.779-.781 2.047 0 2.828l1.586 1.586h-7.244c-1.104 0-2 .895-2 2 0 1.104.896 2 2 2h7.244l-1.586 1.586c-.781.779-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l6.414-6.414-6.414-6.414c-.781-.781-2.047-.781-2.828 0z" />
        </svg>
      </div>

      <button
        className="cursor-pointer rounded-[5px] bg-[#dc3545] px-4 py-2 text-base text-white
          transition-colors duration-300 hover:bg-[#c82333] hover:shadow-[0_4px_8px_rgba(25,48,182,0.5)]"
        onClick={handleClear}
      >
        Clear
      </button>

      {loading && (
        <>
          <Loader />
          {showSlowNetwork && <div className="text-white">Your network is low!</div>}
        </>
      )}

      {showWelcome && <WelcomeFarmer onDismiss={dismissWelcome} />}
    </div>
  );
};

export default SearchPanel;

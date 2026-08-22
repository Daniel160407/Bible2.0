import { useEffect, useMemo, useRef, useState } from 'react';
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
import Combobox from '../../components/ui/Combobox';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import WelcomeFarmer from './WelcomeFarmer';

const SLOW_NETWORK_DELAY_MS = 2000;
const BOOK_HINT_LIMIT = 8;

const numberOptions = (count) =>
  Array.from({ length: count }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

const SearchPanel = ({ onDisplayChange, separatedVerse, onShow }) => {
  const [language, setLanguage] = useState('geo');
  const [version, setVersion] = useState('');
  const [bookIndex, setBookIndex] = useState(FIRST_BOOK_INDEX);
  const [chapter, setChapter] = useState(1);
  const [verseFrom, setVerseFrom] = useState(1);
  const [verseTill, setVerseTill] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [bookHintOpen, setBookHintOpen] = useState(false);
  const [bookHintIndex, setBookHintIndex] = useState(0);
  const [passageSuppressed, setPassageSuppressed] = useState(false);
  const [showSlowNetwork, setShowSlowNetwork] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => Cookies.get('newCustomer') === undefined);

  const searchInputRef = useRef(null);

  const { data: meta, isFetching: metaLoading } = useBibleMeta(language);
  const books = useMemo(() => meta?.books ?? [], [meta]);

  const { data: chapterData, isFetching: chapterLoading } = useChapter({
    bookIndex: mapBookIndexForLanguage(bookIndex, language),
    chapter,
    version,
    language,
  });
  const verseCount = chapterData?.verseCount ?? 0;
  const chapterCount = chapterData?.chapterCount ?? 0;

  const {
    run: runSearch,
    clear: clearSearch,
    next: nextResultPage,
    prev: prevResultPage,
    results: searchResults,
    isActive: searchActive,
    page: resultPage,
    pageCount: resultPageCount,
    total: resultTotal,
    hasPrev: hasPrevResults,
    hasNext: hasNextResults,
    isSearching,
  } = useVerseSearch({ language, books });

  const loading = metaLoading || chapterLoading || isSearching;

  const versionOptions = useMemo(
    () => (meta?.versions ?? []).map((item) => ({ value: item, label: item })),
    [meta],
  );
  const bookOptions = useMemo(() => books.map((book) => ({ value: book, label: book })), [books]);
  const bookHints = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (query === '' || books.length === 0) return [];
    if (books.some((book) => book.toLowerCase() === query)) return [];
    const starts = books.filter((book) => book.toLowerCase().startsWith(query));
    const contains = books.filter(
      (book) => !book.toLowerCase().startsWith(query) && book.toLowerCase().includes(query),
    );
    return [...starts, ...contains].slice(0, BOOK_HINT_LIMIT);
  }, [books, searchText]);

  const chapterOptions = useMemo(() => numberOptions(chapterCount), [chapterCount]);
  const verseOptions = useMemo(() => numberOptions(verseCount), [verseCount]);
  const verseTillOptions = useMemo(
    () => verseOptions.filter((option) => option.value >= verseFrom),
    [verseOptions, verseFrom],
  );

  useEffect(() => {
    const available = meta?.versions ?? [];
    if (available.length > 0 && !available.includes(version)) {
      setVersion(available[0]);
    }
  }, [meta, version]);

  useEffect(() => {
    if (!loading) {
      setShowSlowNetwork(false);
      return;
    }
    const timer = setTimeout(() => setShowSlowNetwork(true), SLOW_NETWORK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [loading]);

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

  useEffect(() => {
    if (!separatedVerse) return;
    setBookIndex(separatedVerse.bookIndex);
    setChapter(Number(separatedVerse.tavi));
    setVerseFrom(Number(separatedVerse.muxli));
    setVerseTill(null);
  }, [separatedVerse]);

  useEffect(() => {
    if (searchActive) onDisplayChange({ ...EMPTY_DISPLAY, verses: searchResults });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults, searchActive]);

  const selectPassage = ({
    book = bookIndex,
    chapter: nextChapter = 1,
    verse = 1,
    till = null,
  }) => {
    clearSearch();
    setPassageSuppressed(false);
    setBookIndex(book);
    setChapter(nextChapter);
    setVerseFrom(verse);
    setVerseTill(till);
  };

  const handleBookChange = (bookName) => {
    const listIndex = books.indexOf(bookName) + 1;
    selectPassage({ book: canonicalBookIndex(listIndex, language) });
  };

  const stepVerse = (delta) => {
    setPassageSuppressed(false);
    setVerseTill(null);
    setVerseFrom((verse) => Math.min(Math.max(verse + delta, 1), Math.max(verseCount, 1)));
  };

  const hintsVisible = bookHintOpen && bookHints.length > 0;

  const commitBookHint = (bookName) => {
    setSearchText(`${bookName} `);
    setBookHintOpen(false);
    setBookHintIndex(0);
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (next) => {
    setSearchText(next);
    setBookHintOpen(true);
    setBookHintIndex(0);
  };

  const handleSearchKeyDown = (e) => {
    if (hintsVisible) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setBookHintIndex((index) => (index + 1) % bookHints.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setBookHintIndex((index) => (index - 1 + bookHints.length) % bookHints.length);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setBookHintOpen(false);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        commitBookHint(bookHints[bookHintIndex]);
        return;
      }
    }

    if (e.key !== 'Enter' || searchText.trim() === '') return;

    setBookHintOpen(false);

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

    setPassageSuppressed(true);
    runSearch({ text: searchText, version });
  };

  const handleClear = () => {
    clearSearch();
    setPassageSuppressed(true);
    onDisplayChange(EMPTY_DISPLAY);
  };

  const dismissWelcome = () => {
    Cookies.set('newCustomer', 'false', { expires: 365 });
    setShowWelcome(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-[10px] bg-[#1f2937] p-5">
      <Input
        type="select"
        className="shrink-0 cursor-pointer"
        value={language}
        options={PREVIEW_LANGUAGES}
        onChange={(next) => {
          clearSearch();
          setLanguage(next);
        }}
      />

      <Combobox
        className="min-w-0 flex-[1.5]"
        ariaLabel="Version"
        value={version}
        options={versionOptions}
        onChange={setVersion}
      />

      <Combobox
        className="min-w-0 flex-1"
        ariaLabel="Book"
        value={bookNameForLanguage(books, bookIndex, language)}
        options={bookOptions}
        onChange={handleBookChange}
      />

      <Combobox
        className="w-[60px] shrink-0"
        ariaLabel="Chapter"
        value={chapter}
        options={chapterOptions}
        onChange={(next) => selectPassage({ chapter: next })}
      />

      <Combobox
        className="w-[60px] shrink-0"
        ariaLabel="First verse"
        value={verseFrom}
        options={verseOptions}
        onChange={(next) => selectPassage({ chapter, verse: next })}
      />

      <Combobox
        className="w-[60px] shrink-0"
        ariaLabel="Last verse"
        value={verseTill ?? verseFrom}
        options={verseTillOptions}
        onChange={(next) => selectPassage({ chapter, verse: verseFrom, till: next })}
      />

      <div className="relative min-w-[200px] flex-[2]">
        <Input
          ref={searchInputRef}
          className="w-full"
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => setBookHintOpen(true)}
          onBlur={() => setBookHintOpen(false)}
          onKeyDown={handleSearchKeyDown}
        />

        {hintsVisible && (
          <ul
            role="listbox"
            className="absolute left-0 top-[calc(100%+4px)] z-50 max-h-60 min-w-full overflow-y-auto
              rounded-[5px] border border-[#555] bg-[#1f2937] py-1 shadow-lg"
            onMouseDown={(e) => e.preventDefault()}
          >
            {bookHints.map((bookName, index) => (
              <li
                key={bookName}
                role="option"
                aria-selected={index === bookHintIndex}
                className={`cursor-pointer whitespace-nowrap px-3 py-2 text-base text-white ${
                  index === bookHintIndex ? 'bg-[#007bff]' : 'hover:bg-[#374151]'
                }`}
                onMouseEnter={() => setBookHintIndex(index)}
                onClick={() => commitBookHint(bookName)}
              >
                {bookName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {searchActive && (
        <div className="flex items-center gap-2 text-[0.8rem] font-medium text-white">
          <Button variant="subtle" onClick={prevResultPage} disabled={!hasPrevResults}>
            Prev
          </Button>
          <span>
            {searchResults === null
              ? 'Searching...'
              : searchResults.length > 0
                ? `${resultTotal} result${resultTotal === 1 ? '' : 's'} · Page ${resultPage} of ${resultPageCount}`
                : 'No results'}
          </span>
          <Button variant="subtle" onClick={nextResultPage} disabled={!hasNextResults}>
            Next
          </Button>
        </div>
      )}

      <div className="flex shrink-0 items-center">
        <Button
          variant="plain"
          onClick={() => stepVerse(-1)}
          aria-label="Previous verse"
          className="h-[30px] w-[30px] p-0 text-[#edf8ff]"
        >
          <svg
            className="h-full w-full"
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
        </Button>
        <Button
          variant="plain"
          onClick={() => stepVerse(1)}
          aria-label="Next verse"
          className="h-[30px] w-[30px] p-0 text-[#edf8ff]"
        >
          <svg
            className="h-full w-full"
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
        </Button>
      </div>

      <Button variant="success" className="shrink-0" onClick={onShow}>
        Show
      </Button>

      <Button variant="danger" className="shrink-0" onClick={handleClear}>
        Clear
      </Button>

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

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useBibleMeta, useChapter } from '../hooks/useBibleQueries';
import { useVerseSearch } from '../hooks/useVerseSearch';
import { parseReference, findBook } from '../lib/parseReference';
import {
  FIRST_BOOK_INDEX,
  PREVIEW_LANGUAGES,
  bookNameForLanguage,
  canonicalBookIndex,
  mapBookIndexForLanguage,
} from '../lib/constants';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import MadeBy from '../components/ui/MadeBy';

const COOKIE_OPTIONS = { expires: 7 };

const numberOptions = (count) =>
  Array.from({ length: count }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, '');

const BiblePage = () => {
  const [language, setLanguage] = useState(() => Cookies.get('language') ?? 'geo');
  const [version, setVersion] = useState(() => Cookies.get('version') ?? '');
  const [bookIndex, setBookIndex] = useState(() => Number(Cookies.get('book')) || FIRST_BOOK_INDEX);
  const [chapter, setChapter] = useState(() => Number(Cookies.get('chapter')) || 1);
  const [highlightedVerse, setHighlightedVerse] = useState(null);
  const [searchText, setSearchText] = useState('');

  const { data: meta, isFetching: metaLoading } = useBibleMeta(language);
  const versions = meta?.versions ?? [];

  const { data: chapterData, isFetching: chapterLoading } = useChapter({
    bookIndex: mapBookIndexForLanguage(bookIndex, language),
    chapter,
    version,
    language,
  });

  const books = meta?.books?.length ? meta.books : (chapterData?.books ?? []);

  const {
    run: runSearch,
    clear: clearSearch,
    next: nextResultPage,
    prev: prevResultPage,
    results: searchResults,
    isActive: searchActive,
    page: resultPage,
    pageCount: resultPageCount,
    hasPrev: hasPrevResults,
    hasNext: hasNextResults,
    isSearching,
  } = useVerseSearch({ language, books });
  const loading = metaLoading || chapterLoading || isSearching;

  const bookName = bookNameForLanguage(books, bookIndex, language);
  const verses = searchResults ?? chapterData?.verses ?? [];

  useEffect(() => {
    const available = meta?.versions ?? [];
    if (available.length > 0 && !available.includes(version)) {
      setVersion(available[0]);
    }
  }, [meta, version]);

  useEffect(() => {
    if (highlightedVerse == null) return;
    document
      .querySelector(`[data-verse="${highlightedVerse}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlightedVerse, chapterData]);

  const selectPassage = ({ book = bookIndex, chapter: nextChapter = 1, verse = null }) => {
    clearSearch();
    setBookIndex(book);
    setChapter(nextChapter);
    setHighlightedVerse(verse);
    Cookies.set('book', book, COOKIE_OPTIONS);
    Cookies.set('chapter', nextChapter, COOKIE_OPTIONS);
  };

  const handleLanguageChange = (next) => {
    setLanguage(next);
    clearSearch();
    Cookies.remove('version');
    Cookies.set('language', next, COOKIE_OPTIONS);
  };

  const handleVersionChange = (next) => {
    setVersion(next);
    Cookies.set('version', next, COOKIE_OPTIONS);
  };

  const handleBookChange = (next) => {
    const listIndex = books.indexOf(next) + 1;
    selectPassage({ book: canonicalBookIndex(listIndex, language) });
  };

  const handleSearchKeyDown = (e) => {
    if (e.key !== 'Enter' || searchText.trim() === '') return;

    const reference = parseReference(searchText);
    const book = reference && findBook(books, reference.bookQuery);
    if (book) {
      selectPassage({
        book: canonicalBookIndex(book.bookIndex, language),
        chapter: reference.chapter,
        verse: reference.verse,
      });
      return;
    }

    setHighlightedVerse(null);
    runSearch({ text: searchText, version });
  };

  const handleCopy = (verse) => {
    const text = stripHtml(verse.bv);
    const path = `${verse.book || bookName} ${verse.tavi}:${verse.muxli}`;
    const html = `
      <div style="font-family: Arial, sans-serif;">
        <p style="margin: 10px 0; font-size: 14px;">"${text}"</p>
        <p style="margin: 0; font-size: 18px; font-weight: bold;">${path}</p>
      </div>
    `;
    navigator.clipboard
      .write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([`${text}\n${path}`], { type: 'text/plain' }),
        }),
      ])
      .catch((error) => console.error('Failed to copy text:', error));
  };

  return (
    <div className="rounded-[10px] bg-panel p-5 text-white">
      <div className="mb-5 flex flex-wrap items-center max-md:flex-col max-md:items-stretch">
        <Input
          type="select"
          variant="page"
          className="w-[200px]"
          value={language}
          options={PREVIEW_LANGUAGES}
          onChange={handleLanguageChange}
        />
        <Input
          type="select"
          variant="page"
          className="w-[200px]"
          value={version}
          options={versions}
          onChange={handleVersionChange}
        />
        <Input
          type="select"
          variant="page"
          className="w-[200px]"
          value={bookName}
          options={books.slice(FIRST_BOOK_INDEX - 1)}
          onChange={handleBookChange}
        />
        <Input
          type="select"
          variant="page"
          className="w-[200px]"
          value={chapter}
          options={numberOptions(chapterData?.chapterCount ?? 0)}
          onChange={(next) => selectPassage({ chapter: Number(next) })}
        />
        <Input
          type="select"
          variant="page"
          className="w-[200px]"
          value={highlightedVerse ?? ''}
          options={[
            { value: '', label: '', disabled: true, hidden: true },
            ...numberOptions(chapterData?.verseCount ?? 0),
          ]}
          onChange={(next) => setHighlightedVerse(Number(next))}
        />
        <Input
          type="text"
          variant="page"
          className="max-w-[150px] placeholder:italic placeholder:text-[#b0b0b0] focus:shadow-[0_0_8px_#6e8bb0]"
          value={searchText}
          onChange={setSearchText}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search verses..."
        />
      </div>

      <div>
        {loading && <Loader />}
        <h1 className="my-[0.67em] text-center text-[2em] font-bold text-accent">{bookName}</h1>
        {searchActive &&
          (searchResults === null ? (
            <p>Searching...</p>
          ) : searchResults.length > 0 ? (
            <p>
              Page {resultPage} of {resultPageCount}
            </p>
          ) : (
            <p>No results found</p>
          ))}
        {verses.map((verse) => {
          const isHighlighted = !searchResults && Number(verse.muxli) === highlightedVerse;
          return (
            <div
              key={verse.id}
              data-verse={verse.muxli}
              className={`group relative mb-[15px] animate-fade-in-up rounded-lg border p-[15px]
                transition-[transform,box-shadow,background-color] duration-300
                hover:-translate-y-[5px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                max-sm:p-2.5 ${
                  isHighlighted ? 'border-card-active bg-card-active' : 'border-card bg-card'
                }`}
            >
              <h1
                className="mb-2.5 text-lg font-bold max-md:text-base max-sm:text-sm"
                dangerouslySetInnerHTML={{ __html: verse.bv }}
              />
              <h1 className="text-base font-bold text-[#b2b2b2] max-md:text-sm max-sm:text-xs">
                {verse.book || bookName} {verse.tavi}:{verse.muxli}
              </h1>
              <Button
                variant="plain"
                onClick={() => handleCopy(verse)}
                aria-label="Copy verse"
                className="invisible absolute bottom-2.5 right-2.5 h-6 w-6 p-0 opacity-0
                  hover:scale-[1.2] group-hover:visible group-hover:opacity-100"
              >
                <img src="/images/copy.png" alt="" className="h-full w-full" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-2.5">
        {searchActive ? (
          <>
            <Button variant="surface" onClick={prevResultPage} disabled={!hasPrevResults}>
              Previous
            </Button>
            <Button variant="surface" onClick={nextResultPage} disabled={!hasNextResults}>
              Next
            </Button>
          </>
        ) : (
          <Button variant="surface" onClick={() => selectPassage({ chapter: chapter + 1 })}>
            Next Chapter
          </Button>
        )}
      </div>

      <div className="mt-4">
        <MadeBy href="https://portfoliodanielabulashvili.netlify.app/" />
      </div>
    </div>
  );
};

export default BiblePage;

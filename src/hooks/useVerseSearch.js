import { useCallback, useRef, useState } from 'react';
import { bookIndexFromWigni, fetchBible, getSearchTotal, SEARCH_PAGE_SIZE } from '../api/bibleApi';
import { canonicalBookIndex } from '../lib/constants';

const WHOLE_BIBLE_INDEX = 1;

const normalizeSearchVerse = (verse, books, language) => {
  const listIndex = bookIndexFromWigni(verse.wigni);
  return {
    ...verse,
    searched: true,
    book: books[listIndex - 1],
    bookIndex: canonicalBookIndex(listIndex, language),
  };
};

export const useVerseSearch = ({ language, books }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(0); // 1-based current page; 0 = no active search
  const [pageCount, setPageCount] = useState(0);
  const [results, setResults] = useState(null);

  const runIdRef = useRef(0);
  const paramsRef = useRef({ text: '', version: '' });

  const goToPage = useCallback(
    async (targetPage) => {
      const runId = ++runIdRef.current;
      setIsSearching(true);
      try {
        const data = await fetchBible({
          book: WHOLE_BIBLE_INDEX,
          search: paramsRef.current.text,
          version: paramsRef.current.version,
          language,
          page: targetPage,
        }).catch(() => null);
        if (runIdRef.current !== runId) return;

        const hits = (data?.bibleData ?? []).map((v) => normalizeSearchVerse(v, books, language));
        setResults(hits);
        setPage(targetPage);
        setPageCount(Math.ceil(getSearchTotal(data) / SEARCH_PAGE_SIZE));
      } finally {
        if (runIdRef.current === runId) setIsSearching(false);
      }
    },
    [books, language],
  );

  const run = useCallback(
    ({ text, version }) => {
      paramsRef.current = { text, version };
      return goToPage(1);
    },
    [goToPage],
  );

  const next = useCallback(() => {
    if (page < pageCount) goToPage(page + 1);
  }, [goToPage, page, pageCount]);

  const prev = useCallback(() => {
    if (page > 1) goToPage(page - 1);
  }, [goToPage, page]);

  const clear = useCallback(() => {
    runIdRef.current += 1; // cancel any in-flight request
    setResults(null);
    setPage(0);
    setPageCount(0);
    setIsSearching(false);
  }, []);

  const isActive = page > 0;

  return {
    run,
    next,
    prev,
    clear,
    isSearching,
    isActive,
    results: isActive ? results : null,
    page,
    pageCount,
    hasPrev: page > 1,
    hasNext: page > 0 && page < pageCount,
  };
};

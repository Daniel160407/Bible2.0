import { useRef, useState } from 'react';
import { bookIndexFromWigni, fetchBible } from '../api/bibleApi';
import { canonicalBookIndex, FIRST_BOOK_INDEX } from '../lib/constants';

const MAX_CONCURRENT_REQUESTS = 3;
const REQUEST_DELAY_MS = 300;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Tags a search-result verse with its book name and canonical book index. */
const normalizeSearchVerse = (verse, books, language) => {
  const listIndex = bookIndexFromWigni(verse.wigni);
  return {
    ...verse,
    searched: true,
    book: books[listIndex - 1],
    bookIndex: canonicalBookIndex(listIndex, language),
  };
};

/**
 * Full-text verse search. Searching the whole Bible fires one request per book,
 * throttled in small batches so the holybible.ge server doesn't reject them,
 * and reports results incrementally through onResults.
 */
export const useVerseSearch = ({ language, books }) => {
  const [isSearching, setIsSearching] = useState(false);
  const runIdRef = useRef(0);

  const searchBook = async ({ text, version, bookIndex, onResults }) => {
    const runId = ++runIdRef.current;
    setIsSearching(true);
    try {
      const data = await fetchBible({ book: bookIndex, search: text, version, language });
      if (runIdRef.current !== runId) return;
      onResults((data.bibleData ?? []).map((verse) => normalizeSearchVerse(verse, books, language)));
    } finally {
      if (runIdRef.current === runId) setIsSearching(false);
    }
  };

  const searchWholeBible = async ({ text, version, onResults }) => {
    const runId = ++runIdRef.current;
    setIsSearching(true);
    const bookIndexes = Array.from(
      { length: books.length - (FIRST_BOOK_INDEX - 1) },
      (_, i) => i + FIRST_BOOK_INDEX,
    );
    const found = [];

    try {
      for (let i = 0; i < bookIndexes.length; i += MAX_CONCURRENT_REQUESTS) {
        const batch = bookIndexes.slice(i, i + MAX_CONCURRENT_REQUESTS);
        const results = await Promise.all(
          batch.map((bookIndex) =>
            fetchBible({ book: bookIndex, search: text, version, language })
              .then((data) => data.bibleData ?? [])
              .catch(() => []),
          ),
        );
        if (runIdRef.current !== runId) return;

        found.push(...results.flat().map((verse) => normalizeSearchVerse(verse, books, language)));
        onResults([...found]);

        if (i + MAX_CONCURRENT_REQUESTS < bookIndexes.length) await delay(REQUEST_DELAY_MS);
      }
    } finally {
      if (runIdRef.current === runId) setIsSearching(false);
    }
  };

  return { searchBook, searchWholeBible, isSearching };
};

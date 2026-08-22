import { useCallback, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { bookIndexFromWigni, fetchBible, getSearchTotal, SEARCH_PAGE_SIZE } from '../api/bibleApi';
import { canonicalBookIndex } from '../lib/constants';

const WHOLE_BIBLE_INDEX = 1;
const NO_SEARCH = { text: '', version: '', page: 0 };

const normalizeSearchVerse = (verse, books, language) => {
  const listIndex = bookIndexFromWigni(verse.wigni);
  return {
    ...verse,
    searched: true,
    book: books[listIndex - 1],
    bookIndex: canonicalBookIndex(listIndex, language),
  };
};

export const searchQueryOptions = ({ language, text, version, page }) => ({
  queryKey: ['verse-search', language, version, text, page],
  queryFn: () =>
    fetchBible({
      book: WHOLE_BIBLE_INDEX,
      search: text,
      version,
      language,
      page,
    }),
  staleTime: Infinity,
  gcTime: Infinity,
});

export const useVerseSearch = ({ language, books }) => {
  const [search, setSearch] = useState(NO_SEARCH); // page: 1-based; 0 = no active search

  const { text, version, page } = search;

  const { data, isFetching } = useQuery({
    ...searchQueryOptions({ language, text, version, page }),
    enabled: page > 0 && text.trim() !== '',
    select: (raw) => {
      const total = getSearchTotal(raw);
      return {
        hits: (raw?.bibleData ?? []).map((verse) => normalizeSearchVerse(verse, books, language)),
        total,
        pageCount: Math.ceil(total / SEARCH_PAGE_SIZE),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });

  const isActive = page > 0;
  const pageCount = data?.pageCount ?? 0;
  const total = data?.total ?? 0;

  const goToPage = useCallback(
    (targetPage) =>
      setSearch((current) =>
        current.page > 0 && targetPage !== current.page
          ? { ...current, page: targetPage }
          : current,
      ),
    [],
  );

  const run = useCallback(({ text: nextText, version: nextVersion }) => {
    setSearch({ text: nextText, version: nextVersion, page: 1 });
  }, []);

  const next = useCallback(() => {
    if (isFetching) return;
    if (page < pageCount) goToPage(page + 1);
  }, [goToPage, isFetching, page, pageCount]);

  const prev = useCallback(() => {
    if (isFetching) return;
    if (page > 1) goToPage(page - 1);
  }, [goToPage, isFetching, page]);

  const clear = useCallback(() => setSearch(NO_SEARCH), []);

  const results = useMemo(() => (isActive ? (data?.hits ?? null) : null), [data, isActive]);

  return {
    run,
    next,
    prev,
    clear,
    isSearching: isActive && isFetching,
    isActive,
    results,
    page,
    pageCount,
    total,
    hasPrev: page > 1 && !isFetching,
    hasNext: page > 0 && page < pageCount && !isFetching,
  };
};

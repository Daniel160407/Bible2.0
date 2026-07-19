import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { fetchBible, getChapterCount, getVerseCount } from '../api/bibleApi';
import { FIRST_BOOK_INDEX, PROJECTOR_LANGUAGES } from '../lib/constants';

const metaQueryOptions = (language) => ({
  queryKey: ['bible-meta', language],
  queryFn: () => fetchBible({ book: FIRST_BOOK_INDEX, language }),
  select: (data) => ({
    versions: data.versions ?? [],
    books: data.bibleNames ?? [],
  }),
  staleTime: Infinity,
});

/** Versions and book names for a language. */
export const useBibleMeta = (language) => useQuery(metaQueryOptions(language));

/** Versions and book names for every projector language at once, keyed by language key. */
export const useProjectorMeta = () =>
  useQueries({
    queries: PROJECTOR_LANGUAGES.map(({ apiCode }) => metaQueryOptions(apiCode)),
    combine: (results) =>
      Object.fromEntries(
        PROJECTOR_LANGUAGES.map(({ key }, i) => [key, results[i].data]),
      ),
  });

/** Verses of one chapter, plus the book's chapter count and the chapter's verse count. */
export const useChapter = ({ bookIndex, chapter, version, language }) =>
  useQuery({
    queryKey: ['chapter', language, version, bookIndex, chapter],
    queryFn: () => fetchBible({ book: bookIndex, chapter, version, language }),
    select: (data) => ({
      verses: data.bibleData ?? [],
      chapterCount: getChapterCount(data),
      verseCount: getVerseCount(data),
    }),
    enabled: Boolean(bookIndex && chapter && language),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

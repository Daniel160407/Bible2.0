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

export const chapterQueryOptions = ({ bookIndex, chapter, version, language }) => ({
  queryKey: ['chapter', language, version, bookIndex, chapter],
  queryFn: () => fetchBible({ book: bookIndex, chapter, version, language }),
  staleTime: Infinity,
  gcTime: Infinity,
});

export const useBibleMeta = (language) => useQuery(metaQueryOptions(language));

export const useProjectorMeta = () =>
  useQueries({
    queries: PROJECTOR_LANGUAGES.map(({ apiCode }) => metaQueryOptions(apiCode)),
    combine: (results) =>
      Object.fromEntries(
        PROJECTOR_LANGUAGES.map(({ key }, i) => [key, results[i].data]),
      ),
  });

export const useChapter = ({ bookIndex, chapter, version, language }) =>
  useQuery({
    ...chapterQueryOptions({ bookIndex, chapter, version, language }),
    select: (data) => ({
      verses: data.bibleData ?? [],
      books: data.bibleNames ?? [],
      chapterCount: getChapterCount(data),
      verseCount: getVerseCount(data),
    }),
    enabled: Boolean(bookIndex && chapter && language),
    placeholderData: keepPreviousData,
  });

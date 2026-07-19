import axios from 'axios';

const API_URL = 'https://holybible.ge/service.php';

/**
 * Response shape of service.php:
 * - versions:   available translations for the language
 * - bibleNames: [Bible, Old Testament, New Testament, ...66 book names]
 * - tavi[0].cc:  chapter count of the requested book
 * - muxli[0].cc: verse count of the requested chapter
 * - bibleData:  verses: { id, bv (html text), tavi (chapter), muxli (verse), wigni }
 *
 * The book parameter `w` is 1-based over the full bibleNames list,
 * so the first real book (Genesis) is w=4.
 */
export const fetchBible = async ({
  book = '',
  chapter = '',
  search = '',
  version = '',
  language,
  page = 1,
}) => {
  const { data } = await axios.get(API_URL, {
    params: { w: book, t: chapter, m: '', s: search, mv: version, language, page },
  });
  return data;
};

export const getChapterCount = (data) => data?.tavi?.[0]?.cc ?? 0;
export const getVerseCount = (data) => data?.muxli?.[0]?.cc ?? 0;

/** Search results reference books by `wigni`; convert it to the API book index (w). */
export const bookIndexFromWigni = (wigni) => parseInt(wigni, 10) + 3;

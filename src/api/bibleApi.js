import axios from 'axios';

const API_URL = 'https://holybible.ge/service.php';

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

export const getSearchTotal = (data) => parseInt(data?.pagecount?.[0]?.cc ?? 0, 10);

export const SEARCH_PAGE_SIZE = 40;

export const bookIndexFromWigni = (wigni) => parseInt(wigni, 10) + 3;

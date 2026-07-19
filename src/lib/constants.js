/** bibleNames[0..2] are section headers ("Bible", "Old/New Testament"); books start here. */
export const FIRST_BOOK_INDEX = 4;

/** Languages available for the preview panels. */
export const PREVIEW_LANGUAGES = [
  { value: 'geo', label: 'GEO' },
  { value: 'eng', label: 'ENG' },
  { value: 'russian', label: 'RUS' },
  { value: 'ua', label: 'UA' },
  { value: 'fr', label: 'FR' },
  { value: 'gr', label: 'GR' },
  { value: 'tr', label: 'TR' },
  { value: 'es', label: 'SP' },
];

/** Languages that can be shown on the projector simultaneously. */
export const PROJECTOR_LANGUAGES = [
  {
    key: 'geo',
    apiCode: 'geo',
    label: 'Georgian',
    defaultVersion: 'ახალი გადამუშავებული გამოცემა 2015',
  },
  {
    key: 'eng',
    apiCode: 'eng',
    label: 'English',
    defaultVersion: 'NASB New American Standard Bible',
  },
  {
    key: 'rus',
    apiCode: 'russian',
    label: 'Russian',
    defaultVersion: 'Синодальный перевод',
  },
];

/**
 * The English bibleNames list orders the epistles differently from the Georgian
 * canon (James..Jude come before Romans), so book indexes 48-68 must be remapped.
 */
export const ENGLISH_BOOK_INDEXES = {
  48: 62, 49: 63, 50: 64, 51: 65, 52: 66, 53: 67, 54: 68,
  55: 48, 56: 49, 57: 50, 58: 51, 59: 52, 60: 53, 61: 54,
  62: 55, 63: 56, 64: 57, 65: 58, 66: 59, 67: 60, 68: 61,
};

const CANONICAL_BOOK_INDEXES = Object.fromEntries(
  Object.entries(ENGLISH_BOOK_INDEXES).map(([geo, eng]) => [eng, Number(geo)]),
);

/** Canonical (Georgian-order) book index -> index in the given language's book list. */
export const mapBookIndexForLanguage = (bookIndex, apiCode) =>
  apiCode === 'eng' ? (ENGLISH_BOOK_INDEXES[bookIndex] ?? bookIndex) : bookIndex;

/** Index in the given language's book list -> canonical (Georgian-order) index. */
export const canonicalBookIndex = (listIndex, apiCode) =>
  apiCode === 'eng' ? (CANONICAL_BOOK_INDEXES[listIndex] ?? listIndex) : listIndex;

/** Book display name for a canonical index in the given language's book list. */
export const bookNameForLanguage = (books, bookIndex, apiCode) =>
  books?.[mapBookIndexForLanguage(bookIndex, apiCode) - 1] ?? '';

export const PROJECTOR_FONTS = ['Banner', 'Valera', 'Mouldy', 'Oswald'];

export const TEXT_COLORS = [
  { value: '#f4f4f4', label: 'White' },
  { value: '#000000', label: 'Black' },
  { value: '#2196f3', label: 'Blue' },
  { value: '#edc612', label: 'Yellow' },
  { value: '#31a24c', label: 'Green' },
  { value: '#ea1f36', label: 'Red' },
];

export const STROKE_COLORS = [
  { value: '#f4f4f4', label: 'White' },
  { value: '#000000', label: 'Black' },
];

export const BACKGROUNDS = Array.from({ length: 20 }, (_, i) => `/backgrounds/${i + 1}.jpeg`);

export const DEFAULT_BACKGROUND = '/backgrounds/16.jpeg';

/** Shape of "what is currently selected for preview/projection". */
export const EMPTY_DISPLAY = {
  book: null,
  bookIndex: null,
  chapter: null,
  verse: null,
  till: null,
  verses: null,
};

export const DEFAULT_PROJECTOR_STYLE = {
  fontSize: 7,
  font: 'Banner',
  textColor: '#f4f4f4',
  textAlign: 'left',
  strokeColor: '',
  strokeWidth: 0,
  background: DEFAULT_BACKGROUND,
};

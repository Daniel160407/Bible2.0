const REFERENCE_PATTERN = /(\d?\D+?) (\d+)(?::(\d+))?(?:-(\d+))?/;

/**
 * Parses a verse reference like "Mark 6:3" or "Mark 6:3-5" (chapter-only
 * references like "Mark 6" are also accepted).
 * Returns { bookQuery, chapter, verse, till } or null if the text is not a reference.
 */
export const parseReference = (text) => {
  const match = text.match(REFERENCE_PATTERN);
  if (!match) return null;

  return {
    bookQuery: match[1].trim(),
    chapter: parseInt(match[2], 10),
    verse: match[3] ? parseInt(match[3], 10) : null,
    till: match[4] ? parseInt(match[4], 10) : null,
  };
};

/**
 * Finds a book by prefix match (case-insensitive) in the full bibleNames list.
 * Returns { name, bookIndex } where bookIndex is the 1-based API index, or null.
 */
export const findBook = (books, query) => {
  const lowered = query.toLowerCase();
  const index = books.findIndex((book) => book.toLowerCase().startsWith(lowered));
  return index === -1 ? null : { name: books[index], bookIndex: index + 1 };
};

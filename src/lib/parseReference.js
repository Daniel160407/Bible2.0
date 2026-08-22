const REFERENCE_PATTERN = /(\d?\D+?) (\d+)(?::(\d+))?(?:-(\d+))?/;

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

export const findBook = (books, query) => {
  const lowered = query.toLowerCase();
  const index = books.findIndex((book) => book.toLowerCase().startsWith(lowered));
  return index === -1 ? null : { name: books[index], bookIndex: index + 1 };
};

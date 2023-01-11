refineBooks = (books) =>
  !books
    ? undefined
    : books.map(({ dataValues: book }) => {
        return {
          ...book,
          id: book.uuid,
          uuid: undefined,
          bookAuthor: undefined,
        };
      });

module.exports = (item) => {
  const data = item?.dataValues ?? item;

  return {
    ...data,
    id: item.uuid,
    books: item.books && refineBooks(item.books),
    uuid: undefined,
  };
};

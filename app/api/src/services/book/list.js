const { Book } = require("../../../db/MySQL/models");
const { bookList } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { defaultOptions, pagedOptions } = res.queryOptions;

  const books = await Book.findAll(pagedOptions);
  const booksCount = await Book.findAll(defaultOptions);

  res.jsonData = { data: bookList(books), total: booksCount.length };

  next();
};

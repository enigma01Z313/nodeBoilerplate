const { Book } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { defaultOptions, pagedOptions } = res.queryOptions;

  const books = await Book.findAll(pagedOptions);
  const booksCount = await Book.findAll(defaultOptions);

  res.jsonData = { data: books, total: booksCount.length };

  next();
};

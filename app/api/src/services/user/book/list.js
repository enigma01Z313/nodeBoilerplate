const { inspect } = require("../../../utils");
const { Book, User_book } = require("../../../../db/MySQL/models");
const { bookList } = require("../../../../db/MySQL/refines");
const { authorTypes, offPriceTypes } = require("../../../../db/staticDb/db");

module.exports = async (req, res, next) => {
  const {
    authenticatedUser: user,
    queryOptions: { defaultOptions, pagedOptions },
  } = res;

  defaultOptions.include = [
    ...defaultOptions.include,
    { model: User_book, where: { user_id: user.id } },
  ];

  pagedOptions.include = [
    ...pagedOptions.include,
    { model: User_book, where: { user_id: user.id } },
  ];

  const books = await Book.findAll(pagedOptions);
  const booksCount = await Book.findAll(defaultOptions);

  res.jsonData = {
    data: bookList(books),
    total: booksCount.length,
    meta: { authorTypes, offPriceTypes },
  };
  next();
};

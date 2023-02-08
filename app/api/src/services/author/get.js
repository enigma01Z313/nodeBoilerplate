const { Author } = require("../../../db/MySQL/models");
const {
  author: refineAuthor,
  bookList: refineBooks,
} = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const { withBook } = req.query;

  let books, totalBooks;

  const {
    queryOptions: { pagedOptions, defaultOptions },
  } = res;

  const author = await Author.findOne({ where: { uuid } });

  if (!author)
    return next(fError(404, " This id is not found", "این شناسه پیدا نشد"));

  if (withBook && withBook === "true") {
    books = await author.getBooks(pagedOptions);
    totalBooks = await author.getBooks(defaultOptions);
  }

  const responseBody = {
    ...refineAuthor(author),
    books: { data: refineBooks(books), total: totalBooks && totalBooks.length },
  };
  res.chainData.author = author;
  res.jsonData = responseBody;
  next();
};

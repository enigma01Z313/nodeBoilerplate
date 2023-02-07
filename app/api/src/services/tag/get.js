const { Tag } = require("../../../db/MySQL/models");
const {
  tag: refineTag,
  bookList: refineBooks,
} = require("../../../db/MySQL/refines");
const { fError, inspect } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const { withBook } = req.query;
  let books, totalBooks;
  const {
    queryOptions: { pagedOptions, defaultOptions },
  } = res;

  const tag = await Tag.findOne({ where: { uuid } });
  if (!tag) return fError(404, "Tag not found", "تگ مورد نظر وجود ندارد");

  if (withBook && withBook === "true") {
    books = await tag.getBooks(pagedOptions);
    totalBooks = await tag.getBooks(defaultOptions);
  }

  const responseBody = {
    ...refineTag(tag),
    books: { data: refineBooks(books), total: totalBooks && totalBooks.length },
  };

  res.chainData.tag = tag;
  res.jsonData = responseBody;
  next();
};

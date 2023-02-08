const { Category } = require("../../../db/MySQL/models");
const {
  category: refineCategory,
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

  const category = await Category.findOne({
    where: { uuid },
    include: [
      {
        model: Category,
      },
    ],
  });
  if (!category)
    return next(
      fError(404, "category not found", "دسته بندی مورد نظر وجود ندارد")
    );

  if (withBook && withBook === "true") {
    books = await category.getBooks(pagedOptions);
    totalBooks = await category.getBooks(defaultOptions);
  }

  const responseBody = {
    ...refineCategory(category),
    books: { data: refineBooks(books), total: totalBooks && totalBooks.length },
  };

  res.chainData.category = category;
  res.jsonData = responseBody;
  next();
};

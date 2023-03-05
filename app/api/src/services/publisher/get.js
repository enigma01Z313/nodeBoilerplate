const { Op } = require("sequelize");
const { User, Wallet } = require("../../../db/MySQL/models");
const {
  publisher: refinepublisher,
  bookList: refineBooks,
} = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const { withBook } = req.query;

  let books, totalBooks;

  const {
    queryOptions: { defaultOptions, pagedOptions },
  } = res;

  const publisher = await User.findOne({
    where: { [Op.and]: [{ uuid }, { roleId: 4 }] },
    include: [
      {
        model: Wallet,
      },
    ],
  });

  if (!publisher)
    return next(fError(404, " This id is not found", "این شناسه پیدا نشد"));

  if (withBook && withBook === "true") {
    books = await publisher.getBooks(pagedOptions);
    totalBooks = await publisher.getBooks(defaultOptions);
  }

  const responseBody = {
    ...refinepublisher(publisher),
    books: { data: refineBooks(books), total: totalBooks && totalBooks.length },
  };
  res.chainData.publisher = publisher;
  res.jsonData = responseBody;
  next();
};

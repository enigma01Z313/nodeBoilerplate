const {
  Tag,
  Category,
  Author,
  User,
  Book,
  Off_price,
} = require("../../../db/MySQL/models");

const { book: refineBook } = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const bookOption = {
    where: { uuid },
    include: [
      { model: Author, as: "authors", through: { attributes: ["authorType"] } },
      { model: Tag, as: "tags", through: { attributes: [] } },
      { model: Category, as: "categories", through: { attributes: [] } },
      { model: User, as: "publisher" },
      { model: Off_price },
    ],
  };
  const book = await Book.findOne(bookOption);
  if (!book) return next(fError(404, "Not found", "کتاب مورد نظر یافت نشد"));

  const data = refineBook(book);

  res.jsonData = data;
  next();
};

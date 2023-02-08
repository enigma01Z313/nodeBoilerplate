const {
  Tag,
  Category,
  Author,
  User,
  Book,
  Off_price,
  File,
} = require("../../../db/MySQL/models");
const { book: refineBook } = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");
const { authorTypes, offPriceTypes } = require("../../../db/staticDb/db");

module.exports = async (req, res, next) => {
  const uuid = req?.params?.uuid ?? res?.chainData?.createdUuid;

  const bookOption = {
    where: { uuid },
    include: [
      { model: File },
      {
        model: Author,
        as: "authors",
        through: { attributes: ["authorType", "isMain"] },
      },
      { model: Tag, as: "tags", through: { attributes: [] } },
      { model: Category, as: "categories", through: { attributes: [] } },
      { model: User, as: "publisher" },
      { model: Off_price },
    ],
  };
  const book = await Book.findOne(bookOption);

  if (!book) return next(fError(404, "Not found", "کتاب مورد نظر یافت نشد"));

  const data = refineBook(book);

  res.jsonData = { ...data, meta: { authorTypes, offPriceTypes } };
  next();
};

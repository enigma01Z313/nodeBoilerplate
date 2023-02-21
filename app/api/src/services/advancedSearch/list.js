const { Op } = require("sequelize");
const { Author, User, Off_price, Book } = require("../../../db/MySQL/models");

const { inspect } = require("../../utils");

module.exports = async (req, res, next) => {
  const criteria = req.query.criteria ?? "book";
  const bookType = req.query.bookType ?? "book";

  const include = [{ model: Off_price }];
  const where = {};

  if (criteria === "all") {
    include.push(
      { model: Author, as: "authors" },
      { model: User, as: "publisher", where: { roleId: 4 } }
    );
    where[Op.or] = [];
  } else {
  }
  let defaultOptions = { include, where };

  inspect(defaultOptions);

  const books = await Book.findAll(defaultOptions);

  return res.json(books);
};

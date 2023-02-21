const { Author, User, Off_price, Book } = require("../../../db/MySQL/models");

const { inspect } = require("../../utils");

module.exports = (req, res, next) => {
  const criteria = req.query.criteria ?? "book";
  const bookType = req.query.bookType ?? "book";

  const include = [{ model: Off_price }];

  if (criteria === "all") {
    include.push(
      { model: Author, as: "authors" },
      { model: User, as: "publisher", where: { roleId: 4 } }
    );
  } else {
  }
  let defaultOptions = { include };

  inspect(defaultOptions);

  const books = Book.findAll();

  return res.json(books);
};

const { reset } = require("nodemon");
const { Off_price } = require("../../../../db/MySQL/models");
const refineData = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { tag },
  } = res;

  const books = await tag.getBooks({ include: [{ model: Off_price }] });

  res.jsonData = refineData.bookList(books);
  next();
};

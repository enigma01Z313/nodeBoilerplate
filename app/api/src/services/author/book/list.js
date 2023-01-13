const { Off_price } = require("../../../../db/MySQL/models");
const refineData = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { author: author },
  } = res;

  const books = await author.getBooks({ include: [{ model: Off_price }] });

  res.jsonData = refineData.bookList(books);
  next();
};

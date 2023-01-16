const { Off_price } = require("../../../../db/MySQL/models");
const refineData = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { publisher },
  } = res;

  const books = await publisher.getBooks({
    include: [{ model: Off_price }],
    limit: 1,
    offset: 1,
  });

  res.jsonData = refineData.bookList(books);
  next();
};

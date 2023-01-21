const { Off_price } = require("../../../../db/MySQL/models");
const { offPrice: refineOffPrice } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { book },
  } = res;

  const { type, amount, startDate, endDate } = req.body;

  const bookId = book.id;

  const createOption = {
    type,
    amount,
    startDate,
    endDate,
    book_id: bookId,
  };

  console.log(createOption);

  await Off_price.destroy({
    where: {
      book_id: bookId,
    },
  });

  const createOffPrice = await Off_price.create(createOption);

  res.jsonData = refineOffPrice(createOffPrice);

  next();
};

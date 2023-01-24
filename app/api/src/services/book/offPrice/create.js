const { Off_price } = require("../../../../db/MySQL/models");
const { offPrice: refineOffPrice } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: {
      book: { id: book_id },
    },
  } = res;

  const { type, amount, startDate, endDate } = req.body;

  const createOption = {
    type,
    amount,
    startDate,
    endDate,
    book_id,
  };

  await Off_price.destroy({
    where: {
      book_id,
    },
  });

  const createOffPrice = await Off_price.create(createOption);

  res.jsonData = refineOffPrice(createOffPrice);

  next();
};

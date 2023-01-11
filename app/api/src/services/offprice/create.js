const { Off_price } = require("../../../db/MySQL/models");
module.exports = async (req, res, next) => {
  const { type, amount, startDate, endDate } = req.body;

  const {
    chainData: {
      book: { id: book_id },
    },
  } = res;


  const offPriceData = {
    type,
    amount,
    startDate,
    endDate,
    book_id,
  };

  const newOffPrice = await Off_price.bulkCreate([offPriceData]);

  res.jsonData = newOffPrice;
  next();
};

const { Off_price } = require("../../../db/MySQL/models");
const { regexOffPriceType, fError } = require("../../utils");
module.exports = async (req, res, next) => {
  const { type, amount, startDate, endDate, book_id: undefined } = req.body;

  if (!regexOffPriceType(type))
    return next(
      fError(404, " Type should be 1 or 2", "تایپ باید بین 1 یا 2 باشد")
    );

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

const { offPrice: refineOffPrice } = require("../../../../db/MySQL/refines");
const { Off_price } = require("../../../../db/MySQL/models");
const { fError } = require("../../../utils");

module.exports = async (req, res, next) => {
  const {
    chainData: { book },
  } = res;

  const OffPrice = await Off_price.findOne({ where: { book_id: book.id } });

  // if (!OffPrice)
  //   return fError(404, "offPrice not found", "این کتاب شامل تخفیف نمیباشد");

  res.jsonData = refineOffPrice(OffPrice);
  next();
};

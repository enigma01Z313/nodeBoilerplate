const { offPrice: refineOffPrice } = require("../../../../db/MySQL/refines");
const { Off_price } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: { book },
  } = res;

  const offPrice = await book.getOff_price();

  res.jsonData = offPrice ? refineOffPrice(offPrice) : {};
  next();
};

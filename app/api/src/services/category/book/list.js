const { Off_price } = require("../../../../db/MySQL/models");
module.exports = async (req, res, next) => {
  const {
    chainData: { category },
  } = res;

  res.jsonData = await category.getBooks({ include: [{ model: Off_price }] });
  next();
};

const { Off_price } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: { tag },
  } = res;

  res.jsonData = await tag.getBooks({ include: [{ model: Off_price }] });
  next();
};

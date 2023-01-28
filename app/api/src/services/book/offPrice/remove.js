const { Off_price } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: { book },
  } = res;

  await Off_price.destroy({ where: { book_id: book.id } });

  next();
};

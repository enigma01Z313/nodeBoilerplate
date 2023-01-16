const { Op } = require("sequelize");
const { Off_price } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: { books },
  } = res;

  const deleteOption = books.map(({ dataValues: { id } }) => id);

  await Off_price.destroy({
    where: {
      book_id: {
        [Op.or]: deleteOption,
      },
    },
  });

  next();
};
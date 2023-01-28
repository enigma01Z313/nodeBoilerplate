const { Op } = require("sequelize");
const { Off_price } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: { books },
  } = res;

  const { type, amount, startDate, endDate } = req.body;

  const bookIds = [];
  const createOption = books.map(({ dataValues: { id: book_id } }) => {
    bookIds.push(book_id);
    return {
      type,
      amount,
      startDate,
      endDate,
      book_id,
    };
  });

  await Off_price.destroy({
    where: {
      book_id: {
        [Op.or]: bookIds,
      },
    },
  });

  const createOffPrice = await Off_price.bulkCreate(createOption);

  res.jsonData = createOffPrice;
  next();
};
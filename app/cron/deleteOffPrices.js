const { Op } = require("sequelize");
const { Off_price } = require("../api/db/MySQL/models");

module.exports = () =>
  new Promise(async (resolve, reject) => {
    const now = new Date();
    await Off_price.destroy({
      where: { endDate: { [Op.lt]: now } },
    });
    resolve();
  });

const { Transactoin } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: { transactionId: uuid },
  } = res;

  const transaction = await Transactoin.findOne({ where: { uuid } });

  res.chainData.transaction = transaction;
  next();
};

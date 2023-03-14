const { Transaction } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: { transactionId: uuid },
  } = res;

  const transaction = await Transaction.findOne({ where: { uuid } });

  res.chainData.transaction = transaction;
  next();
};

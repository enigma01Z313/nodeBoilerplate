const { SettleUp } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { cardNumber, amount } = req.body;

  const settleUpData = {
    cardNumber,
    amount,
  };

  const newSettleUp = await SettleUp.create(settleUpData);

  res.jsonData = newSettleUp;
  next();
};

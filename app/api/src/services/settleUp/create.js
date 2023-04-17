const { SettleUp } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { cardNumber: cNumber, amount } = req.body;

  const {
    chainData: { card },
  } = res;

  const {
    dataValues: { cardNumber },
  } = card;

  console.log(cardNumber);

  return res.end("=============");
  const settleUpData = {
    cNumber,
    amount,
  };

  const newSettleUp = await SettleUp.create(settleUpData);

  res.jsonData = newSettleUp;
  next();
};

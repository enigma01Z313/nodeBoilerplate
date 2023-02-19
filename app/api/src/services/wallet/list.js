const { Wallet } = require("../../../db/MySQL/models");
const { walletList } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const wallet = await Wallet.findAll();

  res.jsonData = walletList(wallet);

  next();
};

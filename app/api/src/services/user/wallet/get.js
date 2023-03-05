const { wallet: refineWallet } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { user },
  } = res;

  const wallet = await user.getWallet();

  res.jsonData = wallet ? refineWallet(wallet) : {};
  next();
};

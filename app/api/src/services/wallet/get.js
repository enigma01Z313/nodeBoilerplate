const { Wallet, User } = require("../../../db/MySQL/models");
const { wallet: refineWallet } = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const wallet = await Wallet.findOne({
    where: { uuid },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!wallet)
    return next(fError(404, "Wallet not found", "کیف پول مورد نظر وجود ندارد"));

  res.jsonData = refineWallet(wallet);
  next();
};

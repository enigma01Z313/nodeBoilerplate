const { Op } = require("sequelize");
const { Wallet, User } = require("../../../db/MySQL/models");
const { walletList } = require("../../../db/MySQL/refines");
const { inspect } = require("../../utils");

module.exports = async (req, res, next) => {
  const { s: search } = req.query;

  const {
    dbOptions: { defaultOptions, paginationedOptions },
  } = res;

  let searchOption;

  if (search) {
    searchOption = {
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } },
        ],
      },
    };
  }

  const walletDefaultOption = {
    ...defaultOptions,
    include: [
      {
        model: User,
        ...searchOption,
      },
    ],
  };

  const walletPagedOption = {
    ...paginationedOptions,
    include: [
      {
        model: User,
        ...searchOption,
      },
    ],
  };

  const wallets = await Wallet.findAll(walletPagedOption);

  const totalWallets = await Wallet.findAll(walletDefaultOption);

  const responseBody = {
    data: walletList(wallets),
    total: totalWallets && totalWallets.length,
  };

  res.jsonData = responseBody;

  next();
};

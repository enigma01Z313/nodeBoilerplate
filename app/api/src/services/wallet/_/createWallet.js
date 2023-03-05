const { Wallet } = require("../../../../db/MySQL/models");

module.exports = async (ownerId) =>
  new Promise(async (resolve, reject) => {
    await Wallet.create({ ownerId });
    resolve();
  });

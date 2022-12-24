"use strict";
const { Asset } = require("../../mongoDb/");

module.exports = (sequelize, DataTypes) => {
  const User = require("./user")(sequelize, DataTypes);

  class UserWithAsset extends User {
    async getAsset() {
      const asset = await Asset.findOne({ userId: this.uuid }).select(
        "current"
      );

      return asset?.current ?? 0;
    }

    myJson() {
      return new Promise(async (resolve, reject) => {
        const asset = await this.getAsset();

        resolve({
          ...this.toJSON(),
          asset,
        });
      });
    }
  }

  return UserWithAsset;
};

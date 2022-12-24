"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {
        ...this.get(),
        id: this.uuid,
        coinsList: this.coinsList
          ? [...new Set(JSON.parse(this.coinsList))]
          : [],
        owner: undefined,
        uuid: undefined,
      };
    }
  }
  Watchlist.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      coinsList: {
        type: DataTypes.STRING,
        field: "coins_list",
      },
      owner: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Watchlist",
      tableName: "watchlists",
    }
  );
  return Watchlist;
};

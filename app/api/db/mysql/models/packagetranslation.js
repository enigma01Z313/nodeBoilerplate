"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PackageTranslation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Package }) {
      this.belongsTo(Package, { foreignKey: "package_id" });
      // define association here
    }
  }
  PackageTranslation.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      packageId: {
        type: DataTypes.STRING,
        field: "package_id",
        allowNull: false,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      lang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "packageTranslations",
      modelName: "PackageTranslation",
    }
  );
  return PackageTranslation;
};

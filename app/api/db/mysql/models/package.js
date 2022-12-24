"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    static associate({ PackageTranslation, Payment }) {
      this.hasMany(PackageTranslation, { foreignKey: "package_id" });
      // this.belongsTo(Payment, { foreignKey: "package_id" });
      // this.hasMany(Payment, {foreignKey: 'package_id'})
    }

    toJSON() {
      let name = "",
        description = "",
        price = "";

      if (this.get()?.PackageTranslations) {
        name = this.get()?.PackageTranslations[0]?.dataValues.name;
        description =
          this.get()?.PackageTranslations[0]?.dataValues.description;
        price = this.get()?.PackageTranslations[0]?.dataValues.price;
      }

      // console.log("----------------------");
      // console.log("----------------------");
      // console.log("----------------------");
      // console.log(this.get()?.PackageTranslations);
      // console.log(this.get()?.PackageTranslations[0]?.dataValues);
      // console.log(name, description, price);
      // console.log("----------------------");
      // console.log("----------------------");
      // console.log("----------------------");

      return {
        ...this.get(),
        name,
        description,
        price,
        PackageTranslations: undefined,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Package.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      imgId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      duration: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "packages",
      modelName: "Package",
    }
  );
  return Package;
};

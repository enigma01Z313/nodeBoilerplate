"use strict";
const { Model } = require("sequelize");
const getPaymentStatus = require("../../staticDb/paymentStatus");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    toJSON() {
      return {
        ...this.get(),
        id: this.uuid,
        status: getPaymentStatus(this.status),
        uuid: undefined,
      };
    }

    static associate({Package, User}) {
      // define association here
      // this.belongsTo(Package, { foreignKey: "package_id" });
      // this.hasOne(Package, { foreignKey: "package_id" });
      // this.hasMany(Package, { foreignKey: "package_id" });
    }
  }
  Payment.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "user_id"
      },
      packageId: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "package_id"
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      tableName: "payments",
      modelName: "Payment",
    }
  );
  return Payment;
};

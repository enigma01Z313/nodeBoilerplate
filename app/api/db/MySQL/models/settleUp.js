"use strict";
module.exports = (sequelize, DataTypes) =>
  sequelize.define("settleUp", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    cardNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "card_number",
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    attachment: {
      type: DataTypes.STRING,
    },
  });

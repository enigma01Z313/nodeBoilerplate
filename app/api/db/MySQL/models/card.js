"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("card", {
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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cardNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "card_number",
    },
    shebaNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "sheba_number",
    },
  });

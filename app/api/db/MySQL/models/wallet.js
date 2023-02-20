"use strict";
module.exports = (sequelize, DataTypes) =>
  sequelize.define("wallet", {
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
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

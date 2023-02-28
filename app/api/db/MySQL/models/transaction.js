"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("transaction", {
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
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    bookId: {
      type: DataTypes.INTEGER,
    },
    action: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    attachment: {
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

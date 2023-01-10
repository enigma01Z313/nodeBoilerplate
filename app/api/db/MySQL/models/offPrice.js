"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("off_price", {
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
    type: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.STRING,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.STRING,
      field: "end_date",
    },
  });

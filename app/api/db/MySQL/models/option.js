"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("option", {
    key: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING(10000),
    },
  });

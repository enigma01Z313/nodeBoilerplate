"use strict";
module.exports = (sequelize, DataTypes) =>
  sequelize.define("userMeta", {
    key: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

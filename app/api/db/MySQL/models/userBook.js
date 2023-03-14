"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("user_book", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("book_category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

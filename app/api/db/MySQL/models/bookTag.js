"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("book_tag", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("bookAuthor", {
    authorType: {
      type: DataTypes.INTEGER,
      field: "author_type",
    },
  });

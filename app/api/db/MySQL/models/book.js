"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("book", {
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

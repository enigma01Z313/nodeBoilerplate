"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("option", {
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    path: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
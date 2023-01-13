"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("file", {
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
    hasOwner: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    metaData: {
      allowNull: true,
      type: DataTypes.STRING(10000),
    },
  });

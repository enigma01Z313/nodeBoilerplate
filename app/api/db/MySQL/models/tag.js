"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("tag", {
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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING(10000),
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("comment", {
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
    content: {
      type: DataTypes.STRING(20000),
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

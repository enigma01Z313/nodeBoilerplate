"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("role", {
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
      unique: true,
    },
    permissions: {
      allowNull: false,
      type: DataTypes.STRING(2000),
      defaultValue: "",
      get() {
        return JSON.parse(this.getDataValue("permissions"));
      },
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 1,
    },
  });

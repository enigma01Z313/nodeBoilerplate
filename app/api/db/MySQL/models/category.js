"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("category", {
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
    parentId: {
      type: DataTypes.INTEGER,
      field: "parent_id",
    },
  });

"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("author", {
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
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "first_name",
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "last_name",
    },
    coutnry: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.STRING,
      field: "birth_date",
    },
    deathDate: {
      type: DataTypes.STRING,
      field: "death_date",
    },
    content: {
      type: DataTypes.STRING(10000),
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

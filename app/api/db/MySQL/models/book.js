"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("book", {
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
    publishedYear: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "published_year",
    },
    content: {
      type: DataTypes.STRING(10000),
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sitePercent: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "site_percent",
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

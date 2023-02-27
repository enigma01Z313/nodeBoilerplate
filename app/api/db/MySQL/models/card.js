"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("card", {
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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    card_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sheba_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

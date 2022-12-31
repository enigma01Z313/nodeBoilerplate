"use strict";

module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue("uuid");
      },
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      get() {
        undefined;
      },
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    confirmCode: {
      type: DataTypes.STRING(500),
      get() {
        undefined;
      },
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "role_id",
    },
    imageId: {
      type: DataTypes.STRING,
      field: "image_id",
    },
    ip: {
      type: DataTypes.STRING,
    },
    accessToken: {
      type: DataTypes.STRING,
      field: "access_token",
    },
    refreshToken: {
      type: DataTypes.STRING,
      field: "refresh_token",
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

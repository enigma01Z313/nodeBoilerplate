"use strict";
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { hashSecret } = require("../../../../config/hachConfig");

const password = crypto
  .createHmac("sha256", hashSecret)
  .update("12300321")
  .digest("hex");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: uuidv4(),
          phone: "09333950889",
          email: "f.ahmadyf94@gmail.com",
          nationalCode: "0017306140",
          employeeCode: "0000000",
          password,
          first_name: "Farzin",
          last_name: "Ahmady",
          role_id: 1,
          image_id: 1,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};

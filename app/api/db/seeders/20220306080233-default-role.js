'use strict';
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          uuid: uuidv4(),
          name: "USER1",
          permissions: `["SEE_USERS","ADD_USERS","EDIT_USERS","DELETE_USERS","UPLOAD_RECEIPTS","SEE_ALL_RECEIPTS","DELETE_RECEIPTS","SEE_OWN_RECEIPTS","SEND_BROADCAST_SMS"]`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", null, {});
  }
};

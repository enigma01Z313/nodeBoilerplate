"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          uuid: uuidv4(),
          name: "USER1",
          permissions: `["SEE_ROLES","ADD_ROLES","EDIT_ROLES","SEE_USERS","ADD_USERS","EDIT_USERS","MANAGE_ALL_PORTFOLIOS","MANAGE_ALL_JOURNALS","MANAGE_ALL_WATCHLISTS","MANAGE_PORTFOLIOS","MANAGE_JOURNALS","MANAGE_WATCHLISTS","MANAGE_PACKAGES","SEE_PORTFOLIOS","SEE_JOURNALS","SEE_PACKAGES","SEE_WATCHLISTS"]`,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "administrator",
          permissions: `["SEE_ROLES","ADD_ROLES","EDIT_ROLES","SEE_USERS","ADD_USERS","EDIT_USERS","MANAGE_ALL_PORTFOLIOS","MANAGE_ALL_JOURNALS","MANAGE_ALL_WATCHLISTS","MANAGE_PORTFOLIOS","MANAGE_JOURNALS","MANAGE_WATCHLISTS","MANAGE_PACKAGES","SEE_PORTFOLIOS","SEE_JOURNALS","SEE_PACKAGES","SEE_WATCHLISTS"]`,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "CUSTOMER",
          permissions: `["MANAGE_PORTFOLIOS","MANAGE_JOURNALS","MANAGE_WATCHLISTS","MANAGE_PACKAGES"]`,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", null, {});
  },
};

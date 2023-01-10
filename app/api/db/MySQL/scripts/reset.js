"use strict";

const db = require("../models");

db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0")
  .sync({ force: true })
  .query("SET FOREIGN_KEY_CHECKS = 1")
  .then(() => {
    console.log("Database has been reset and ready to use");
    process.exit;
  });

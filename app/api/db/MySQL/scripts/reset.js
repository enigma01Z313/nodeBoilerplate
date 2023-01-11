"use strict";

const db = require("../models");

db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0")
  .then(function () {
    return db.sequelize.sync({ force: true });
  })
  .then(function () {
    return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  })
  .then(
    function () {
      console.log("Database has been reset and ready to use");
      process.exit;
    },
    function (err) {
      console.log(err);
    }
  );

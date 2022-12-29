"use strict";

const fs = require("fs");
const path = require("path");

const refiners = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const refiner = require(path.join(__dirname, file));
    refiners[file.slice(0, -3)] = refiner;
  });

module.exports = refiners;

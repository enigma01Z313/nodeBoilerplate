"use strict";

const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
const services = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file !== basename;
  })
  .forEach((directory) => {
    const dirName = directory[0].toUpperCase() + directory.substring(1);

    const dirServices = {};

    const serviceDirectory = path.join(__dirname, directory);
    fs.readdirSync(serviceDirectory).forEach((file) => {
      const service = require(path.join(serviceDirectory, file));
      dirServices[file.slice(0, -3)] = service;
      services[dirName] = dirServices;
    });
  });

module.exports = services;

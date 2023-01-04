const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
const services = {};

const capitaliseWord = (txt) => txt[0].toUpperCase() + txt.substring(1);

const getDirectoryServices = (directoryPath) => {
  const directoryServices = {};
  fs.readdirSync(directoryPath).forEach((file) => {
    if (file.includes(".js")) {
      const service = require(path.resolve(directoryPath, file));
      directoryServices[file.slice(0, -3)] = service;
    } else {
      const subDir = path.resolve(directoryPath, file);
      const curDirectoryName = capitaliseWord(file);
      directoryServices[curDirectoryName] = getDirectoryServices(subDir);
    }
  });

  return directoryServices;
};

fs.readdirSync(__dirname)
  .filter((file) => file !== basename)
  .forEach((directory) => {
    const directoryServices = {};
    const curDirectoryName = capitaliseWord(directory);
    const curDirectory = path.resolve(__dirname, directory);

    services[curDirectoryName] = getDirectoryServices(curDirectory);
  });

module.exports = services;

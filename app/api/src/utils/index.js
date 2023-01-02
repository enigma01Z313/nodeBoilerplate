const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
const utils = {};

const capitaliseWord = (txt) => txt[0].toUpperCase() + txt.substring(1);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file !== basename;
  })
  .forEach((file) => {
    if (file.includes(".js")) {
      const util = require(path.join(__dirname, file));
      utils[file.slice(0, -3)] = util;
    } else {
      const subUtilPath = path.resolve(__dirname, file);
      const subUtils = {};
      fs.readdirSync(subUtilPath)
        .filter((file) => file[0] !== "_")
        .filter((item) => item.includes(".js"))
        .forEach((subFile) => {
          const util = require(path.join(subUtilPath, subFile));
          subUtils[subFile.slice(0, -3)] = util;
        });
      utils[capitaliseWord(file)] = subUtils;
    }
  });

module.exports = utils;

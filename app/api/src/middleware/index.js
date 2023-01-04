const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
const middlewares = {};

const capitaliseWord = (txt) => txt[0].toUpperCase() + txt.substring(1);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file !== basename;
  })
  .forEach((file) => {
    if (file.includes(".js")) {
      const middleware = require(path.join(__dirname, file));
      middlewares[file.slice(0, -3)] = middleware;
    } else {
      const subMiddlewarePath = path.resolve(__dirname, file);
      const subMidlewares = {};
      fs.readdirSync(subMiddlewarePath)
        .filter((file) => file[0] !== "_")
        .forEach((subFile) => {
          const middleware = require(path.join(subMiddlewarePath, subFile));
          subMidlewares[subFile.slice(0, -3)] = middleware;
        });
      middlewares[capitaliseWord(file)] = subMidlewares;
    }
  });

module.exports = middlewares;

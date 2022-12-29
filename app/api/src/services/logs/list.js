const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  res.jsonData = fs.readdirSync(path.resolve("./", "app", "logs"));

  next();
};

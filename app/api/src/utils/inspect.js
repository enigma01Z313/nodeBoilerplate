const util = require("util");

module.exports = (object) =>
  console.log(
    util.inspect(object, (showHidden = false), (depth = 30), (colorize = true))
  );

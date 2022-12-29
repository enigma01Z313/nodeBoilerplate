const fs = require("fs");
const path = require("path");
const fError = require("../../utils/fError");

module.exports = (req, res, next) => {
  const { target } = req.params;

  fs.readFile(
    path.resolve("./", "app", "logs", `${target}.log`),
    function (err, data) {
      if (err)
        return next(fError(err.status, "Access Error", "خطای دسترسی به لاگ"));

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  );
};

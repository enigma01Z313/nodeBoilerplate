const fs = require("fs");
const path = require("path");

const getDocs = (req, res, next) => {
  const apis = [];
  fs.readdirSync(path.resolve(__dirname, "../../../../public/docs"))
    .filter(
      (item) =>
        !(
          item.includes(".html") ||
          item.includes(".css") ||
          item.includes(".js")
        )
    )
    .forEach((item) => apis.push(item));

  return res.json(apis);
};

module.exports = getDocs;

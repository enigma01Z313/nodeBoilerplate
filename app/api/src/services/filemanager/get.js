const path = require("path");

module.exports = async (req, res) => {
  const { jsonData: item } = res;

  const filePath = path.join(__dirname, "../../../../filemanager/", item.path);
  return res.status(200).sendFile(filePath);
};

const path = require("path");

const getFile = async (req, res) => {
  const {
    jsonData: { path: fileName },
  } = res;

  const filePath = path.join(__dirname, "../../../../filemanager/", fileName);
  return res.status(200).sendFile(filePath);
};

module.exports = getFile;

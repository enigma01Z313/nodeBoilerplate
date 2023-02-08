const { Author } = require("../../../db/MySQL/models");
const { authorList } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const author = await Author.findAll();
  res.jsonData = authorList(author);
  next();
};

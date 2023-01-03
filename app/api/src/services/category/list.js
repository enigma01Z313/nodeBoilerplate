const { Category } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const category = await Category.findAll();
  res.jsonData = category;
  next();
};

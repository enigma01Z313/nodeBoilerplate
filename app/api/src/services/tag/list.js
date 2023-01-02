const { Tag } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const tag = await Tag.findAll();
  res.jsonData = tag;
  next();
};

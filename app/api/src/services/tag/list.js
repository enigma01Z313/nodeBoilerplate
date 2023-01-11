const { Tag } = require("../../../db/MySQL/models");
const { tagList } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const tag = await Tag.findAll();
  res.jsonData = tagList(tag);
  next();
};

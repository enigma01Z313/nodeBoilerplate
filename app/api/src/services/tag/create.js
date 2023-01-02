const { Tag } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { name } = req.body;

  const tagData = {
    name,
  };

  const newTag = await Tag.create(tagData);
  res.jsonData = newTag;
  next();
};

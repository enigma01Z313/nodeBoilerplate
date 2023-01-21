const { Tag } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { name, content } = req.body;

  const tagData = {
    name,
    content,
  };

  const newTag = await Tag.create(tagData);
  res.jsonData = newTag;
  next();
};

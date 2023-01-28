const { Tag } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { name, content, status } = req.body;

  const tagData = {
    name,
    content,
    status,
  };

  const newTag = await Tag.create(tagData);
  res.jsonData = newTag;
  next();
};

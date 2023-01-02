const { Tag } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  let uppedData = false;
  const {
    chainData: { tag },
  } = res;

  const { name } = req.body;

  if (name && name !== tag.name) tag.name = uppedData = name;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }
  const updatedTag = await tag.save();

  res.jsonData = updatedTag;
  next();
};

const { Tag } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const tag = await Tag.findOne({
    where: { uuid },
  });

  res.jsonData = tag;

  next();
};

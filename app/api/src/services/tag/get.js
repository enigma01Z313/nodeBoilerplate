const { Tag } = require("../../../db/MySQL/models");
const { tag: refineTag } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const tag = await Tag.findOne({
    where: { uuid },
  });

  res.jsonData = refineTag(tag);

  next();
};

const { Tag } = require("../../../db/MySQL/models");
const { tag: refineTag } = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const tag = await Tag.findOne({
    where: { uuid },
  });

  if (!tag) return fError(404, "Tag not found", "تگ مورد نظر وجود ندارد");

  res.chainData.tag = tag;
  res.jsonData = refineTag(tag);

  next();
};

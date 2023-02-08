const { tag: refinedTag } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  let uppedData = false;
  const {
    chainData: { tag },
  } = res;

  const { name, content, status } = req.body;

  if (name && name !== tag.name) tag.name = uppedData = name;

  if (content && content !== tag.content) tag.content = uppedData = content;

  if (typeof status !== "undefined" && status !== tag.status)
    tag.status = uppedData = status;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }
  const updatedTag = await tag.save();

  res.jsonData = refinedTag(updatedTag);
  next();
};

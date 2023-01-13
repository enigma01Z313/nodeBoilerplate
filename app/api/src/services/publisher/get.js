const { Op } = require("sequelize");
const { User } = require("../../../db/MySQL/models");
const refineData = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const publisher = await User.findOne({
    where: { [Op.and]: [{ uuid }, { roleId: 4 }] },
  });

  if (!publisher)
    return next(fError(404, " This id is not found", "این شناسه پیدا نشد"));

  res.chainData.publisher = publisher;
  res.jsonData = refineData.publisher(publisher);
  next();
};

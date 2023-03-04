const { File } = require("../../../db/MySQL/models");
const fError = require("../../utils/fError");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const item = await File.findOne({
    where: { [Op.or]: [{ uuid }, { path: uuid }] },
  });

  if (!item)
    return next(
      fError(
        404,
        `Not found: 'file' with id '${uuid}' does not exist`,
        `یافت نشد: فایل با ${uuid} وجود ندارد`
      )
    );

  res.jsonData = item;
  next();
};

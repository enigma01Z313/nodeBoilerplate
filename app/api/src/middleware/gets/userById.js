const { UserWithAsset, Role } = require("../../../db/mysql/models");
const fError = require("../../utils/fError");

const userById = async (req, res, next) => {
  const { userId: uuid } = req.params;
  const user = await UserWithAsset.findOne({ where: { uuid }, include: Role });

  if (!user) return next(fError(404, "Not Found", "کاربر مورد نظر وجود ندارد"));

  res.user = user;
  next();
};

module.exports = userById;

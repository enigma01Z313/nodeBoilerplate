const { User } = require("../../../db/MySQL/models");
const { fError } = require("../../utils");

module.exports = (params) => async (req, res, next) => {
  const from = params?.from ?? "body";
  const field = params?.field ?? "publisher";

  const uuid = req[from][field];

  const publisher = await User.findOne({ where: { uuid, roleId: 4 } });

  if (!publisher)
    return next(
      fError(404, "publisher does not exist", "انتشارات مورد نظر وجود ندارد")
    );

  res.chainData.publisher = publisher;
  next();
};

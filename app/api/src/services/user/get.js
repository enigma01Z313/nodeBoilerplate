const { User, UserMeta } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const user = await User.findOne({
    where: { uuid },
    include: [
      {
        model: UserMeta,
      },
    ],
  });
  res.jsonData = user;
  next();
};

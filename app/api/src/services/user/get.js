const { User, UserMeta, Role, Wallet } = require("../../../db/MySQL/models");
const { user: refinedUser } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const user = await User.findOne({
    where: { uuid },
    include: [
      {
        model: UserMeta,
      },
      {
        model: Role,
      },
      {
        model: Wallet,
      },
    ],
  });

  res.jsonData = refinedUser(user);
  next();
};

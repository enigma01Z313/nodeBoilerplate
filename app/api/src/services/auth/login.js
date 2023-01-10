const { Op } = require("sequelize");
const { User, Role } = require("../../../db/MySQL/models");
const hash = require("../../utils/hash");
const fError = require("../../utils/fError");
const createJWT = require("../../utils/createJWT");
const statusList = require("../../../db/staticDb/db");

module.exports = async (req, res, next) => {
  const { password, username } = req.body;

  const user = await User.findOne({
    where: {
      [Op.or]: [{ phone: username }, { email: username }],
      password: hash(password),
    },
    include: Role,
  });

  if (!user) {
    const cookieHeader = req.cookies;
    const failedAttempt = cookieHeader?.failedAttempt ?? 0;
    res.cookie("failedAttempt", +failedAttempt + 1, {
      maxAge: 15000,
    });

    return next(
      fError(401, "Authentication Error", "نام کاربری یا رمز عبور اشتباه است")
    );
  }

  const { accessToken, refreshToken } = createJWT(user);
  await user.update({ accessToken, refreshToken });

  res.jsonData = {
    accessToken,
    refreshToken,
    user,
    meta: { ...statusList },
  };
  next();
};

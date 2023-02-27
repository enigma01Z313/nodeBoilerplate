const { User } = require("../../../db/MySQL/models");
const fError = require("../../utils/fError");

module.exports = (token) =>
  new Promise(async (resolve, reject) => {
    const user = await User.findOne({
      where: { accessToken: token.split(" ")[1] },
    });

    if (!user) reject(fError(401, "Token not valid", "توکن نا معتبر میباشد"));
    resolve(user);
  });

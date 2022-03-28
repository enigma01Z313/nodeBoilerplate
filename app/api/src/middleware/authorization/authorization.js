const { User, Role } = require("../../../db/models");
const fError = require("../../utils/fError");

const getUser = (req, next) =>
  new Promise(async (resolve, reject) => {
    const { authorization } = req.headers;

    if (!authorization)
      return next(fError(401, "Authorization not sent", "خطای اطلاعات ارسالی"));

    const user = await User.findOne({
      where: { accessToken: authorization },
      include: Role,
    });
    if (!user)
      return next(fError(404, "Token not valid", "توکن نا معتبر میباشد"));

    resolve(user);
  });

const authorizationDef = (permission) => async (req, res, next) => {
  const user = await getUser(req, next);
  const {
    Role: { permissions: grantedPermissions },
  } = user;

  if (!grantedPermissions.includes(permission))
    return next(
      fError(
        401,
        `Permission denied, you need permission '${permission}'`,
        `عدم دسترسی به ریسورس فراخوانی دشه، '${permission}'`
      )
    );

  return next();
};

const authorizationAnd = (permissions) => async (req, res, next) => {
  const user = await getUser(req, next);
  const {
    Role: { permissions: grantedPermissions },
  } = user;

  for (permission of permissions)
    if (!grantedPermissions.includes(permission))
      return next(
        fError(
          401,
          `Permission denied, you need permissions '${permissions.join(
            "', '"
          )}'`,
          `عدم دسترسی به ریسورس فراخوانی دشه، '${permissions.join("', '")}'`
        )
      );

  return next();
};

const authorizationOr = (permissions) => async (req, res, next) => {
  const user = await getUser(req, next);
  const {
    Role: { permissions: grantedPermissions },
  } = user;

  for (permission of permissions)
    if (grantedPermissions.includes(permission)) return next();

  return next(
    fError(
      401,
      `Permission denied, you need one of '${permissions.join(
        "', '"
      )}' permissions`,
      `عدم دسترسی به ریسورس فراخوانی دشه، '${permissions.join("', '")}'`
    )
  );
};

module.exports = {
  def: authorizationDef,
  and: authorizationAnd,
  or: authorizationOr,
};

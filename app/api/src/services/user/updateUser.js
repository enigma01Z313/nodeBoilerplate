const { UserWithAsset } = require("../../../db/mysql/models");
const hash = require("../../utils/hash");

const updateUser = async (req, res, next) => {
  let uppedData = false;
  const { theSameUser } = res;
  const { phone, email, firstName, lastName, imageId, status, password } =
    req.body;
  const { Role } = res;
  const { uuid } = req.params;

  const user = await UserWithAsset.findOne({ where: { uuid } });

  const roleId = Role?.id;

  if (phone && phone !== user.phone) user.phone = uppedData = phone;

  if (email && email !== user.email) user.email = uppedData = email;

  if (firstName && firstName !== user.firstName)
    user.firstName = uppedData = firstName;

  if (lastName && lastName !== user.lastName)
    user.lastName = uppedData = lastName;

  if (imageId && imageId !== user.imageId) user.imageId = uppedData = imageId;
  else if (!imageId) user.imageId = uppedData = null;

  if (
    !theSameUser &&
    typeof status !== typeof undefined &&
    status !== user.status
  )
    user.status = uppedData = status;

  if (!theSameUser && roleId && roleId !== user.roleId)
    user.roleId = uppedData = roleId;

  if (password && password !== user.password)
    user.password = uppedData = hash(password);

  // console.log(theSameUser);
  // console.log(user);
  // console.log(req.body);
  // console.log(uppedData);

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  res.jsonData = await user.save();
  next();
};

module.exports = updateUser;

const { User } = require("../../../db/MySQL/models");
const hash = require("../../utils/hash");
const updateMetaData = require("./_updateMeta");

module.exports = async (req, res, next) => {
  let uppedData = false;
  const { theSameUser } = res;
  const {
    phone,
    email,
    firstName,
    lastName,
    imageId,
    status,
    password,
    ...metaFields
  } = req.body;

  const { role } = res.chainData;
  const { uuid } = req.params;

  const user = await User.findOne({ where: { uuid } });

  const roleId = role?.id;

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

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  const userMeta = await updateMetaData(metaFields, req.body);

  await user.setUserMeta(userMeta);

  res.jsonData = await user.save();
  next();
};

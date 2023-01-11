const { User } = require("../../../db/MySQL/models");
const updateMetaData = require("./_updateMeta");

module.exports = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    status,
    imageId,
    roleId: undefined,
    ...metaFields
  } = req.body;

  const {
    chainData: {
      role: { id: roleId },
    },
  } = res;

  console.log(res.chainData);

  const userData = {
    firstName,
    lastName,
    roleId,
    email,
    phone,
    password,
    status,
    imageId,
    creditTime: new Date().getTime(),
  };

  const newUser = await User.create(userData);

  const userMeta = await updateMetaData(metaFields, req.body);

  newUser.setUserMeta(userMeta);

  res.statusCode = 201;
  res.jsonData = newUser;
  next();
};

const { User, Wallet } = require("../../../db/MySQL/models");
const { user: refinedUser } = require("../../../db/MySQL/refines");
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

  await Wallet.create({ ownerId: newUser.id });

  const userMeta = await updateMetaData(metaFields, req.body);

  newUser.setUserMeta(userMeta);

  res.statusCode = 201;
  res.jsonData = refinedUser(newUser);
  next();
};

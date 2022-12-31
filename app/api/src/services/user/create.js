const { User } = require("../../../db/MySQL/models");
const updateMetaData = require("./_updateMeta");

module.exports = async (req, res, next) => {
  const { firstName, lastName, email, phone, password, status, ...metaFields } =
    req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    roleId: res.Role.id,
    email,
    phone,
    password,
    status,
    creditTime: new Date().getTime(),
  });

  //add role data to created user
  const roleData = {
    role: {
      id: res.Role.uuid,
      name: res.Role.name,
      label: res.Role.label,
    },
    permissions: JSON.parse(res.Role.permissions),
  };
  const modifiedUser = { ...newUser.toJSON(), ...roleData };

  const userMeta = await updateMetaData(metaFields, req.body);

  newUser.setUserMeta(userMeta);

  res.statusCode = 201;
  res.jsonData = modifiedUser;
  next();
};

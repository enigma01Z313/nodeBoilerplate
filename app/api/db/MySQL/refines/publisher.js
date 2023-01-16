const status = require("../../staticDb")("defaultStatus");

module.exports = ({ dataValues: data }) => {
  return {
    ...data,
    id: data.uuid,
    name: data.firstName,
    status: status(data.status),
    uuid: undefined,
    confirmCode: undefined,
    firstName: undefined,
    phone: undefined,
    password: undefined,
    lastName: undefined,
    roleId: undefined,
    role_id: undefined,
    ip: undefined,
    accessToken: undefined,
    refreshToken: undefined,
  };
};

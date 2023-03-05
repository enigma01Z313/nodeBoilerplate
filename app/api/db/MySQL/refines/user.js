const status = require("../../staticDb")("defaultStatus");

const refineRole = ({ dataValues: { uuid: id, name, permissions } }) => ({
  id,
  name,
  permissions: permissions[0] === "[" ? JSON.parse(permissions) : [permissions],
});

const refineMeta = (userMeta) =>
  !userMeta || userMeta.length === 0
    ? undefined
    : userMeta.map(({ dataValues: { key, value } }) => ({ key, value }));

const refineFullname = (firstName, lastName) =>
  (firstName && lastName && `${firstName} ${lastName}`) ||
  (firstName && !lastName && firstName) ||
  (!firstName && lastName && lastName) ||
  "";

const refineWallet = (item) => {
  if (!item) return undefined;
  return item.amount;
};

module.exports = (item) => {
  const { dataValues: data } = item;

  return {
    ...data,
    id: data.uuid,
    fullName: refineFullname(item.firstName, item.lastName),
    role: item.role && refineRole(item.role),
    meta: item.userMeta && refineMeta(item.userMeta),
    status: status(data.status),
    wallet: refineWallet(item.wallet),
    uuid: undefined,
    ip: undefined,
    password: undefined,
    confirmCode: undefined,
    roleId: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    role_id: undefined,
    userMeta: undefined,
  };
};

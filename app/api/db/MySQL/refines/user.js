const refineRole = (role) => {
  return {
    id: role.dataValues.uuid,
    name: role.dataValues.name,
    permissions: JSON.parse(role.dataValues.permissions),
  };
};

module.exports = (item) => {
  const { dataValues: data } = item;

  return {
    ...data,
    id: data.uuid,
    fullName: `${item.firstName ?? ""} ${item.lastName ?? ""}`,
    role: item.role && refineRole(item.role),
    uuid: undefined,
    ip: undefined,
    password: undefined,
    confirmCode: undefined,
    roleId: undefined,
    role_id: undefined,
  };
};

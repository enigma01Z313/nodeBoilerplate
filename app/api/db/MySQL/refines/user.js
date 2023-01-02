const refineRole = (role) => {
  return {
    id: role.dataValues.uuid,
    name: role.dataValues.name,
    permissions: JSON.parse(role.dataValues.permissions),
  };
};

const refineMeta = (userMeta) => {
  let refinedMeta = [];
  for (let meta of userMeta) {
    refinedMeta.push({
      key: meta.dataValues.key,
      value: meta.dataValues.value,
    });
  }
  return refinedMeta;
};

module.exports = (item) => {
  const { dataValues: data } = item;

  return {
    ...data,
    id: data.uuid,
    fullName: `${item.firstName ?? ""} ${item.lastName ?? ""}`,
    role: item.role && refineRole(item.role),
    meta: item.userMeta && refineMeta(item.userMeta),
    uuid: undefined,
    ip: undefined,
    password: undefined,
    confirmCode: undefined,
    roleId: undefined,
    role_id: undefined,
  };
};

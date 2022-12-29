const refineRole = (role) => {
  
}

module.exports = (item) => {
  const { dataValues: data } = item;

  return {
    ...data,
    id: data.uuid,
    fullName: `${item.firstName ?? ""} ${item.lastName ?? ""}`,
    role: item.role && refineRole(item.role),
    uuid: undefined,
    roleId: undefined,
    role_id: undefined,
  };
};

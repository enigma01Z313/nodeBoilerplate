const refineFullname = (firstName, lastName) =>
  (firstName && lastName && `${firstName} ${lastName}`) ||
  (firstName && !lastName && firstName) ||
  (!firstName && lastName && lastName) ||
  "";

const refineUser = ({
  dataValues: { uuid: id, firstName, lastName, phone, email },
}) => ({
  id,
  fullName: refineFullname(firstName, lastName),
  phone,
  email,
});

module.exports = (item) => {
  if (!item) return undefined;

  const data = item?.dataValues ?? item;

  return {
    ...data,
    id: data.uuid,
    user: refineUser(data.user),
    uuid: undefined,
    ownerId: undefined,
  };
};

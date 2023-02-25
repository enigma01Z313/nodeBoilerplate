module.exports = (item) => {
  console.log(item);
  if (!item) return undefined;

  const data = item?.dataValues ?? item;

  return {
    ...data,
    id: data.uuid,
    uuid: undefined,
    ownerId: undefined,
  };
};

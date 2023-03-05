module.exports = (item) => {
  if (!item) return undefined;
  const data = item?.dataValues ?? item;
  return {
    ...data,
    id: data.uuid,
    uuid: undefined,
    wallet_id: undefined,
  };
};

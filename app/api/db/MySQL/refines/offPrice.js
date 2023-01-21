module.exports = (item) => {
  const data = item?.dataValues ?? item;

  return {
    ...data,
    id: data.uuid,
    uuid: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    book_id: undefined,
  };
};

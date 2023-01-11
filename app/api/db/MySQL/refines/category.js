module.exports = (item) => {
  //   const { dataValues: data } = item;

  const data = item?.dataValues ?? item;
  console.log(data);
  return {
    ...data,
    id: data.uuid,
    uuid: undefined,
    parentId: undefined,
  };
};

module.exports = (data) => {
  const item = data?.dataValues ?? data;

  console.log(data);
  console.log(item);
  //   return {
  //     ...item,
  //     id: item.uuid,
  //     uuid: undefined,
  //     createdAt: undefined,
  //     updatedAt: undefined,
  //   };
};

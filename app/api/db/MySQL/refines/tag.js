const status = require("../../staticDb")("defaultStatus");

module.exports = (item) => {
  const data = item?.dataValues ?? item;

  return {
    ...data,
    id: data.uuid,
    status: status(data.status),
    uuid: undefined,
  };
};
 
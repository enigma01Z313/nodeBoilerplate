const status = require("../../staticDb")("commentStatus");

const refineFullname = (firstName, lastName) =>
  (firstName && lastName && `${firstName} ${lastName}`) ||
  (firstName && !lastName && firstName) ||
  (!firstName && lastName && lastName) ||
  "";

const refineUser = (items) => {
  if (!items) return undefined;
  const {
    dataValues: { firstName, lastName },
  } = items;
  return {
    fullName: refineFullname(firstName, lastName),
  };
};

const refineBook = (item) => {
  if (!item) return undefined;
  return item.name;
};

module.exports = (item) => {
  const data = item?.dataValues ?? item;

  return {
    ...data,
    id: data.uuid,
    user: refineUser(data.user),
    book: refineBook(data.book),
    status: status(data.status),
    uuid: undefined,
  };
};

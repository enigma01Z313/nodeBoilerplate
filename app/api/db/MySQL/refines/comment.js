const status = require("../../staticDb")("commentStatus");

const refineFullname = (firstName, lastName) =>
  (firstName && lastName && `${firstName} ${lastName}`) ||
  (firstName && !lastName && firstName) ||
  (!firstName && lastName && lastName) ||
  "";

const refineUser = (items) => {
  if (!items) return undefined;
  const {
    dataValues: { uuid: id, firstName, lastName },
  } = items;
  return {
    id,
    fullName: refineFullname(firstName, lastName),
  };
};

const refineBook = (items) => {
  if (!items) return undefined;
  const {
    dataValues: { uuid: id, name },
  } = items;
  return {
    id,
    name,
  };
};

module.exports = (item) => {
  const data = item?.dataValues ?? item;

  return {
    ...data,
    id: data.uuid,
    user: refineUser(data.user),
    book: refineBook(data.book),
    status: status(data.status),
    repliesTo: undefined,
    uuid: undefined,
    bookId: undefined,
    userId: undefined,
  };
};

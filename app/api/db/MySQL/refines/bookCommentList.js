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

module.exports = (data) =>
  data.map((comment) => {
    const data = comment?.dataValues ?? comment;

    return {
      ...data,
      id: data.uuid,
      user: refineUser(data.user),
      status: status(data.status),
      uuid: undefined,
      bookId: undefined,
      userId: undefined,
    };
  });

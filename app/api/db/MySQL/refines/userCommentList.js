const status = require("../../staticDb")("commentStatus");

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

module.exports = (data) =>
  data.map((comment) => {
    const data = comment?.dataValues ?? comment;

    return {
      ...data,
      id: data.uuid,
      book: refineBook(data.book),
      status: status(data.status),
      uuid: undefined,
      bookId: undefined,
      userId: undefined,
    };
  });

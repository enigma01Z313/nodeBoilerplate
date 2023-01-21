const bookRefiner = require("./book");

module.exports = (data) =>
  data.map(({ dataValues: item }) => ({
    ...bookRefiner(item, true),
    content: undefined,
  }));

const rfineComment = require("./comment");

module.exports = (data) =>
  data.reduce((acc, cur) => {
    if (!cur.repliesTo) return acc.concat(rfineComment(cur));
    else return acc;
  }, []);

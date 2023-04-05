const rfineComment = require("./comment");

module.exports = (data) => data.map((comment) => rfineComment(comment));

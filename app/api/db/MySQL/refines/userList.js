const rfineUser = require("./user");

module.exports = (data) => data.map((user) => rfineUser(user));

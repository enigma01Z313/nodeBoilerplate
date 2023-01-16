const rfinePublisher = require("./publisher");

module.exports = (data) => data.map((publisher) => rfinePublisher(publisher));

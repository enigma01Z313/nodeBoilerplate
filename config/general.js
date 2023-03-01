const path = require("path");
require("dotenv").config({ path: path.resolve("./config/.env") });

module.exports = {
  oneTimeLoginTime: process.env.ONE_TIME_LOGIN_TIME,
  host:
    (process.env.RUN_ENV === "server" && process.env.HOST_ONLINE) ||
    (process.env.RUN_ENV === "development" && process.env.HOST),
};

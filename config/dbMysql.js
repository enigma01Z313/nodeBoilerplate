const path = require("path");
require("dotenv").config({ path: path.resolve("./config/.env") });
const {
  RUN_ENV,
  MYSQL_HOST_ONLINE,
  MYSQL_NAME_ONLINE,
  MYSQL_USER_ONLINE,
  MYSQL_PASS_ONLINE,
  MYSQL_HOST,
  MYSQL_NAME,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_NAME_TEST,
  MONGOOSE_URL,
} = process.env;

module.exports = {
  dbHost:
    (RUN_ENV === "server" && MYSQL_HOST_ONLINE) ||
    (RUN_ENV === "development" && MYSQL_HOST),
  dbName:
    (RUN_ENV === "server" && MYSQL_NAME_ONLINE) ||
    (RUN_ENV === "development" && MYSQL_NAME),
  dbUser:
    (RUN_ENV === "server" && MYSQL_USER_ONLINE) ||
    (RUN_ENV === "development" && MYSQL_USER),
  dbPass:
    (RUN_ENV === "server" && MYSQL_PASS_ONLINE) ||
    (RUN_ENV === "development" && MYSQL_PASS),
  dbNameTest: MYSQL_NAME_TEST,
  dbUrl: MONGOOSE_URL,
};

const path = require("path");
require("dotenv").config({ path: path.resolve("./config/.env") });

module.exports = {
  url: process.env.SMS_URL,
  from: process.env.SMS_FROM,
  username: process.env.SMS_USER,
  password: process.env.SMS_PASS,
};

const path = require("path");
require("dotenv").config({ path: path.resolve("./config/.env") });

module.exports = {
  smtpHost: process.env.SMTP_HOST,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
};

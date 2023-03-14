const path = require("path");
require("dotenv").config({ path: path.resolve("./config/.env") });

module.exports = {
  merchantCode: process.env.MERCHANT_CODE,
};

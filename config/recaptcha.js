const path = require('path');
require('dotenv').config({path: path.resolve('./config/.env')});

module.exports = {
  secretKey: process.env.RECAPTCHA_SECRET
}
const path = require('path');
require('dotenv').config({path: path.resolve('./config/.env')});

module.exports = {
  dbUrl: process.env.MONGOOSE_URL_ONLINE
}
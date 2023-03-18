const emailNotification = require("./email");
const smsNotification = require("./sms");

module.exports = { email: emailNotification, sms: smsNotification };

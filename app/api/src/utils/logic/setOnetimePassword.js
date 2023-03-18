const res = require("express/lib/response");
const generateRandom = require("../generateRandom");
const hash = require("../hash");
const { sms: sendSMS } = require("../../utils/notifications");

const setOnetimePassword = async (user) => {
  const { phone } = user;

  const random = Math.random();
  const code = (random === 0 && 1000) || Math.floor(Math.random() * 9000 + 999);

  await sendSMS({ to: phone, text: `کد تایید حساب کاربری: ${code}` });
  await user.update({ confirmCode: hash("" + code) });

  return {
    id: user.uuid,
    code,
  };
};

module.exports = setOnetimePassword;

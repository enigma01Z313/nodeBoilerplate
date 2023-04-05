const res = require("express/lib/response");
const generateRandom = require("../generateRandom");
const hash = require("../hash");
<<<<<<< HEAD
const { sms: sendSMS } = require("../../utils/notifications");

const setOnetimePassword = async (user) => {
  const { phone } = user;

  const random = Math.random();
  const code = (random === 0 && 1000) || Math.floor(Math.random() * 9000 + 999);

  await sendSMS({ to: phone, text: `کد تایید حساب کاربری: ${code}` });
=======
const sendSms = require("../thirdParty/sendSms");
const setOnetimePassword = async (user) => {
  const { email } = user;
  const code = Math.floor(Math.random() * 9000 + 1000);
  // const oneTimeLogin = generateRandom(true, 6);
  // await sendSms(email, oneTimeLogin);
>>>>>>> comment
  await user.update({ confirmCode: hash("" + code) });
  return {
    id: user.uuid,
    code,
  };
};
module.exports = setOnetimePassword;

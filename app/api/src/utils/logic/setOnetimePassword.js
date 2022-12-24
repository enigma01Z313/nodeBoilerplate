const res = require("express/lib/response");
const generateRandom = require("../generateRandom");
const hash = require("../hash");
const sendSms = require("../thirdParty/sendSms");

const setOnetimePassword = async (user) => {
  const { email } = user;
  const code = Math.floor(Math.random() * 900000 + 100000);
  
  // const oneTimeLogin = generateRandom(true, 6);
  // await sendSms(email, oneTimeLogin);
  await user.update({ confirmCode: hash("" + code) });

  return {
    id: user.uuid,
    code,
  };
};

module.exports = setOnetimePassword;

"use strinct";

const { User } = require("../../../db/MySQL/models");
const fError = require("../../utils/fError");
const { sms: sendSMS } = require("../../utils/notifications");
const hash = require("../../utils/hash");
const nodemailer = require("nodemailer");
const createWallet = require("../wallet/_/createWallet.js");

module.exports = async (req, res, next) => {
  const { phone } = req.body;

  const random = Math.random();
  const code = (random === 0 && 1000) || Math.floor(Math.random() * 9000 + 999);
  // const emailTemplate = `<h1>کد تایید: ${code}</h1><table border="1"><tr><td>ss</td><td>ww</td></tr></table>`;
  // const notifRes = await notification.email({
  //   to: email,
  //   subject: "ساخت حساب کاربری ✔",
  //   html: emailTemplate,
  // });

  const c = "" + code;
  const hashw = hash(c);

  const newUser = await User.create({
    phone,
    confirmCode: hashw,
    roleId: 2,
    creditTime: new Date().getTime(),
    status: 0,
  });

  await createWallet(newUser.id);
  // await sendSMS({ to: phone, text:  `کد تایید حساب کاربری: ${code}`});

  res.jsonData = { id: newUser.toJSON().uuid, code };
  next();
};

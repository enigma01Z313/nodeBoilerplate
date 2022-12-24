"use strinct";

const { UserWithAsset, Watchlist } = require("../../../db/mysql/models");
const fError = require("../../utils/fError");
const notification = require("../../utils/notifications");
const hash = require("../../utils/hash");
const nodemailer = require("nodemailer");
const { smtpHost, smtpUser, smtpPass } = require("../../../../../config/smtp");

const register = async (req, res, next) => {
  const { email } = req.body;

  const code = Math.floor(Math.random() * 900000 + 100000);
  // const emailTemplate = `<h1>کد تایید: ${code}</h1><table border="1"><tr><td>ss</td><td>ww</td></tr></table>`;
  // const notifRes = await notification.email({
  //   to: email,
  //   subject: "ساخت حساب کاربری ✔",
  //   html: emailTemplate,
  // });

  const newUser = await UserWithAsset.create({
    email,
    confirmCode: hash("" + code),
    roleId: 2,
    creditTime: new Date().getTime(),
    status: 0,
  });

  res.jsonData = { id: newUser.toJSON().id, code };
  next();
};
module.exports = register;

"use strinct";

const axios = require("axios");
var FormData = require("form-data");

// const nodemailer = require("nodemailer");
const {
  smtpHost,
  smtpUser,
  smtpPass,
} = require("../../../../../../config/smtp");

const emailNotification = async ({ to, subject, html }) => {
  const options = {
    url: "https://mailer.touriya.ir/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: { to, subject, html, token: "123" },
  };


  const response = await axios(options);
  console.log(response.data);
  if (response.data.status !== "200") throw new Error("1234");

  return response;
};

module.exports = emailNotification;

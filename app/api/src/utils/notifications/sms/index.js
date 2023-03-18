const axios = require("axios");
const {
  url,
  from,
  username,
  password,
} = require("../../../../../../config/smsGateway");

module.exports = async ({ to, text }) => {
  const options = {
    url,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      username,
      password,
      from,
      to,
      text,
    },
  };

  const smsResult = await axios(options);
  // console.log(smsResult);
};

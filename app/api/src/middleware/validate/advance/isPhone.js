const required = require("../blocks/required");

const isPhone = () => ({
  parameter: "phone",
  validations: {
    required: required("phone", "شماره موبایل"),
    regex: {
      value: /^09[0-9]{9}$/,
      violations: [
        "wrong format",
        "لطفا فرمت صحیح وارد کنید(11 عدد با شروع 09)",
      ],
    },
  },
});

module.exports = isPhone;

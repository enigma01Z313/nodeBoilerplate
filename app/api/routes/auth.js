const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const { ValidateF, validator } = require("../src/middleware/validate");
const userById = require("../src/middleware/gets/userById");
const isUnique = require("../src/middleware/isUnique");
const verifyRecaptcha = require("../src/middleware/verifyRecaptcha");
const checkCaptchaNecessity = require("../src/middleware/checkCaptchaNecessity");

const {
  Auth: { oneTimeLogin, oneTimeConfirm, register, login },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const loginSchema = new ValidateF()
  .param("username", "شماره تماس/ایمیل")
  .regex(
    /(^09(1[0-9]|3[0-9]|2[0-9])-?[0-9]{3}-?[0-9]{4}$)|(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$)/
  )
  .required()
  .param("password", "رمز عبور")
  .required()
  .param("captchaCode", "کپچا")
  // .required()
  .done();

const phoneSchema = new ValidateF().phoneSchema().done();

const emailSchema = new ValidateF()
  .param("email", "ایمیل")
  .required()
  .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/)
  .done();

const confirmCodeSchema = new ValidateF()
  .param("confirmCode", "کد تایید")
  .required()
  .length(6)
  .done();

/**************************/
/*         routes         */
/**************************/
router.post(
  "/register",
  use(validator(phoneSchema)),
  use(checkCaptchaNecessity),
  use(verifyRecaptcha),
  use(isUnique("User", "کاربر", "phone", "شماره تماس")),
  use(register),
  serveJson
);

router.post(
  "/login",
  use(validator(loginSchema)),
  use(checkCaptchaNecessity),
  use(verifyRecaptcha),
  use(login),
  serveJson
);

router.post("/", use(validator(phoneSchema)), use(oneTimeLogin), serveJson);

router.post(
  "/:userId",
  use(checkCaptchaNecessity),
  use(verifyRecaptcha),
  use(validator(confirmCodeSchema)),
  use(userById),
  use(oneTimeConfirm),
  serveJson
);

module.exports = router;

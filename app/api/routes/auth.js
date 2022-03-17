const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const validate = require("../src/middleware/validate");

const userById = require("../src/middleware/gets/userById");

const {
  authornticate,
  oneTimeLogin,
  oneTimeConfirm,
} = require("../src/services/auth");

router.post(
  "/login",
  use(
    validate.data([
      validate.isPhone(),
      validate.isRequired("password", "رمز عبور"),
    ])
  ),
  use(authornticate),
  serveJson
);

router.post(
  "/",
  use(validate.data([validate.isPhone()])),
  use(oneTimeLogin),
  serveJson
);

router.post(
  "/:userId",
  use(
    validate.data([
      validate.isRequired("confirmCode", "کد تایید"),
      validate.length(6, "confirmCode", "کد تایید"),
    ])
  ),
  use(userById),
  use(oneTimeConfirm),
  serveJson
);

module.exports = router;

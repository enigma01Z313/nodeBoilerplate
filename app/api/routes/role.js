const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const validate = require("../src/middleware/validate");

const authorization = require("../src/middleware/authorization/authorization");

router.get(
  "/permissions",
  use(authorization.or(["sss", "aaa"])),
  (req, res) => {
    res.end("aaaaaaa");
  }
);

module.exports = router;

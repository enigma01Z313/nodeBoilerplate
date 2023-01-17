const express = require("express");
const router = express.Router();
const {
  serveJson,
  Auth: { authentication, authorization },
} = require("../src/middleware");

const {
  Logs: { list, get },
} = require("../src/services");

router.get("/", use(authentication), list, serveJson);
router.get("/:target", use(authentication), get);

module.exports = router;

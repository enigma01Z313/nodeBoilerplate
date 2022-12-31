const express = require("express");
const router = express.Router();
const serveJson = require("../src/middleware/serveJson");

const {
  Logs: { list, get },
} = require("../src/services");

router.get("/", list, serveJson);
router.get("/:target", get);

module.exports = router;

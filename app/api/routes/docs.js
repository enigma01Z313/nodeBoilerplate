const express = require("express");
const router = express.Router();
const serveJson = require("../src/middleware/serveJson");

const {
  Docs: { list },
} = require("../src/services");

router.get("/", list, serveJson);

module.exports = router;

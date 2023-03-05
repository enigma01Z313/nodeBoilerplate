const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");

const {
  AdvancedSearch: { list: serarch },
} = require("../src/services");

router.get("/", use(serarch), serveJson);

module.exports = router;

const express = require("express");
const router = express.Router();
const serveJson = require("../src/middleware/serveJson");

const { getDocs } = require("../src/services");

router.get("/", getDocs, serveJson);

module.exports = router;

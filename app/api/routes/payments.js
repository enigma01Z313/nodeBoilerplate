const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");

const {
  Payment: { verify },
  Book: { addBook },
} = require("../src/services");

router.get("/", use(verify), use(addBook), (req, res) => res.end("1111111"));

module.exports = router;

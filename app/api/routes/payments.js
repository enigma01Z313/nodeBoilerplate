const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");

const {
  Payment: { verify },
  Book: { addBook },
  Transaction: { get: getTransaction },
} = require("../src/services");

router.get("/", verify, use(getTransaction), use(addBook));

module.exports = router;

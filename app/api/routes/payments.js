const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");

const {
  Payment: { verify },
  User: { addBook },
  Transaction: { get: getTransaction },
} = require("../src/services");

router.get("/", use(verify), use(getTransaction), use(addBook));
// router.get("/", use(addBook));

module.exports = router;

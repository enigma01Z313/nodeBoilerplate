const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const authentication = require("../src/middleware/auth/authentication");
const authorization = require("../src/middleware/auth/authorization");
const getDataByUUID = require("../src/middleware/getDataByUUID");

const { uploadFile, getFile } = require("../src/services");

router.post(
  "/",
  // use(authentication),
  use(
    uploadFile({
      name: "image",
      types: ["jpg", "png", "gif"],
      maxAllowedSize: "2Mb",
    })
  ),
  serveJson
);

// get image route
router.get("/:uuid", use(getDataByUUID("File", "فایل")), getFile);

module.exports = router;

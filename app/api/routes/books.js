const express = require("express");
const router = express.Router();

const { use } = require("../src/utils");

const {
  serveJson,
  Validate: {
    index: { ValidateF, validator },
  },
  Auth: { authentication, authorization },
  getDataByUUID,
  getDataList,
  getEntityByUuid,
  filteredData,
} = require("../src/middleware");

const {
  Book: { list },
} = require("../src/services");

/**************************/
/*         routes         */
/**************************/
router.get("/", list, serveJson);

router.get("/:uuid", (req, res) => res.end("getting book"), serveJson);

router.get(
  "/:uuid/tags",
  (req, res) => res.end("getting book tags"),
  serveJson
);

router.get(
  "/:uuid/similar",
  (req, res) => res.end("getting similar books"),
  serveJson
);

module.exports = router;

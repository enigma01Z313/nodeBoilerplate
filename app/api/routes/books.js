const express = require("express");
const router = express.Router();

const { use } = require("../src/utils");

const {
  serveJson,
  Validate: {
    index: { ValidateF, validator },
  },
  Auth: { authentication, authorization },
  Book: { query: bookQuery },
  getDataByUUID,
  getDataList,
  getEntityByUuid,
  filteredData,
} = require("../src/middleware");

const {
  Book: { list, get },
} = require("../src/services");

/**************************/
/*         routes         */
/**************************/
router.get("/", use(bookQuery), use(list), serveJson);

router.get("/:uuid", use(get), serveJson);

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

const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");

const {
  serveJson,
  Auth: { authentication, authorization },
  Validate: {
    index: { ValidateF, validator },
  },
  getDataList,
  isUnique,
  getEntityByUuid,
} = require("../src/middleware");

const {
  Publisher: {
    get,
    Book: { list: bookList },
  },
} = require("../src/services");

/**************************/
/*         routes         */
/**************************/
router.get("/:uuid", use(get), serveJson);

router.get("/:uuid/books", use(get), use(bookList), serveJson);

module.exports = router;

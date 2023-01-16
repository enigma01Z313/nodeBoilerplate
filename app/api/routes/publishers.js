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
  filteredData,
  Book: { bookList },
} = require("../src/middleware");

const {
  Publisher: {
    get,
    // Book: { list: bookList },
  },
} = require("../src/services");

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(filteredData({ roleId: 4 })),
  use(getDataList("User", "انتشارات", undefined, undefined, "publisherList")),
  serveJson
);

router.get("/:uuid", use(get), serveJson);

const publisherBooksOption = {
  baseModel: "publisher",
  includes: [{ model: "Off_price" }],
};
router.get(
  "/:uuid/books",
  use(get),
  use(filteredData({})),
  use(bookList(publisherBooksOption)),
  serveJson
);

module.exports = router;

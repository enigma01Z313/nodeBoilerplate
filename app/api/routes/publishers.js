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
  filteredSearch,
  sortedData,
  Book: { bookList, query: bookQuery },
} = require("../src/middleware");

const {
  Publisher: {
    get,
    Card: { list: listCards },
  },
} = require("../src/services");

const services = require("../src/services");

console.log(services);
/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(filteredData({ roleId: 4 })),
  use(sortedData),
  use(getDataList("User", "انتشارات", "Wallet", undefined, "publisherList")),
  serveJson
);

router.get("/:uuid", use(bookQuery), use(get), serveJson);

const publisherBooksOption = {
  baseModel: "publisher",
  includes: [{ model: "Off_price" }],
};

router.get(
  "/:uuid/books",
  use(bookQuery),
  use(get),
  use(filteredData({})),
  use(
    filteredSearch({
      model: "Book",
      fields: ["name"],
    })
  ),
  use(bookList(publisherBooksOption)),
  serveJson
);

router.get(
  "/:uuid/cards",
  use(authentication),
  use(filteredData({})),
  use(getEntityByUuid({ model: "User", fields: ["uuid"] })),
  use(sortedData),
  use(listCards),
  serveJson
);

module.exports = router;

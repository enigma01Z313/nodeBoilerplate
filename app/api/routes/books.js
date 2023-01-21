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
  getEntitiesByUuid,
  filteredData,
} = require("../src/middleware");

const {
  Book: {
    list,
    get,
    similar: similarBooks,
    OffPrice: { get: getOffPrice, create, update, remove },
  },
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

router.get("/:uuid/similar", use(get), use(similarBooks), serveJson);

router.get(
  "/:uuid/offprice",
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(getOffPrice),
  serveJson
);

router.post(
  "/:uuid/offprice",
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(create),
  serveJson
);

router.put(
  "/:uuid/offprice",
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(update),
  serveJson
);

router.delete(
  "/:uuid/offprice",
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(remove),
  serveJson
);

module.exports = router;

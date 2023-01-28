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
/*   validation schemas   */
/**************************/
const newOffPriceSchema = new ValidateF()
  .param("type", "نوع")
  .regex(/^(1|2)$/)
  .requiredNumber()
  .param("amount", "مقدار")
  .requiredNumber()
  .param("startDate", "تاریخ شروع")
  .requiredString()
  .param("endDate", "تاریخ پایان")
  .requiredString()
  .done();

const updatedOffPriceSchema = new ValidateF()
  .param("type", "نوع")
  .regex(/^(1|2)$/)
  .number()
  .param("amount", "مقدار")
  .number()
  .param("startDate", "تاریخ شروع")
  .string()
  .param("endDate", "تاریخ پایان")
  .string()
  .done();

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
  use(validator(newOffPriceSchema)),
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(create),
  serveJson
);

router.put(
  "/:uuid/offprice",
  use(validator(updatedOffPriceSchema)),
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

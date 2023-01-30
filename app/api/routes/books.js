const express = require("express");
const router = express.Router();

const { use, inspect } = require("../src/utils");

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
  Book,
  Book: {
    list,
    get,
    create,
    similar: similarBooks,
    OffPrice: {
      get: getOffPrice,
      create: createOffPrice,
      update: updateOffPrice,
      remove,
    },
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

const bookAuthorsSchema = (function () {
  const authorTypes = require("../db/staticDb")("authorTypes")();

  const authorsSchema = new ValidateF();
  authorTypes.forEach(({ key, label }) => {
    authorsSchema.param(key, label).array("string");
  });
  return authorsSchema.done();
})();

const newBookSchema = new ValidateF()
  .param("name", "نام کتاب")
  .requiredString()
  .param("image", "تصویر کتاب")
  .requiredString(36)
  .param("content", "محتوا")
  .string()
  .param("publishedYear", "تاریخ انتشار")
  .number()
  .param("price", "قیمت")
  .number()
  .param("offPrice", "تخفیف")
  .requiredObject(newOffPriceSchema)
  .param("publisher", "ناشر")
  .requiredString(36)
  .param("categories", "دسته بندی")
  .array("string")
  .param("tags", "دسته بندی")
  .array("string")
  .param("authors", "مولف")
  .array(bookAuthorsSchema)
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

router.post("/", use(validator(newBookSchema)), use(create), serveJson);

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
  use(createOffPrice),
  serveJson
);

router.put(
  "/:uuid/offprice",
  use(validator(updatedOffPriceSchema)),
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(updateOffPrice),
  serveJson
);

router.delete(
  "/:uuid/offprice",
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(remove),
  serveJson
);

module.exports = router;

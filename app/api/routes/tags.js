const express = require("express");
const { Op } = require("sequelize");
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
  Tag: { get, create, update, list },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newTagSchema = new ValidateF()
  .param("name", "نام")
  .requiredString()
  .param("content", "محتوا")
  .string()
  .param("status", "وضیعیت")
  .requiredNumber()
  .regex(/^(1|2)$/)
  .done();

const updatedTagSchema = new ValidateF()
  .param("name", "نام")
  .string()
  .param("content", "محتوا")
  .string()
  .param("status", "وضیعیت")
  .number()
  .regex(/^(1|2)$/)
  .done();

/**************************/
/*         routes         */
/**************************/
router.get("/", use(list), use(getDataList("Tag", "تگ")), serveJson);

router.get("/:uuid", use(get), serveJson);

const bookListOption = {
  baseModel: "tag",
  includes: [{ model: "Off_price" }],
};
router.get(
  "/:uuid/books",
  use(get),
  use(filteredData({})),
  use(bookList(bookListOption)),
  serveJson
);

router.post(
  "/",
  use(validator(newTagSchema)),
  use(authentication),
  use(isUnique("Tag", "برچسب", "name", "نام")),
  use(create),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedTagSchema)),
  use(authentication),
  use(isUnique("Tag", "برچسب", "name", "نام")),
  use(getEntityByUuid({ model: "Tag", fields: ["uuid"] })),
  use(update),
  serveJson
);

module.exports = router;

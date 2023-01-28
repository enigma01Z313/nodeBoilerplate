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
  Category: { get, create, update, list },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newCategorySchema = new ValidateF()
  .param("name", "نام")
  .requiredString()
  .param("parentId")
  .string()
  .length(36)
  .param("content", "محتوا")
  .string()
  .param("status", "وضیعیت")
  .requiredNumber()
  .regex(/^(1|2)$/)
  .done();

const updatedCategorySchema = new ValidateF()
  .param("name", "نام")
  .string()
  .param("parentId")
  .string()
  .length(36)
  .param("content", "محتوا")
  .string()
  .param("status", "وضیعیت")
  .number()
  .regex(/^(1|2)$/)
  .done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  filteredData({ status: { [Op.ne]: 0 } }),
  use(getDataList("Category", "دسته بندی ")),
  serveJson
);

router.get("/:uuid", use(get), serveJson);

const bookListOption = {
  baseModel: "category",
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
  use(validator(newCategorySchema)),
  use(authentication),
  use(isUnique("Category", "دسته بندی", "name", "نام")),
  use(getEntityByUuid({ model: "Category", fields: ["parentId"] })),
  use(create),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedCategorySchema)),
  use(authentication),
  use(isUnique("Category", "دسته بندی", "name", "نام")),
  use(getEntityByUuid({ model: "Category", fields: ["uuid"] })),
  use(
    getEntityByUuid({
      model: "Category",
      fields: ["parentId"],
      as: "parentCategory",
    })
  ),
  use(update),
  serveJson
);

module.exports = router;

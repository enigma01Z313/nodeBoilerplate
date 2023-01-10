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
} = require("../src/middleware");

const {
  Category: {
    get,
    create,
    update,
    list,
    Book: { list: bookList },
  },
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
  .done();

const updatedCategorySchema = new ValidateF()
  .param("name", "نام")
  .string()
  .param("parentId")
  .string()
  .length(36)
  .done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(authentication),
  use(filteredData()),
  use(list),
  serveJson
);

router.get("/:uuid", use(authentication), use(get), serveJson);

router.get(
  "/:uuid/books",
  use(authentication),
  use(getEntityByUuid({ model: "Category", fields: ["uuid"] })),
  use(bookList),
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

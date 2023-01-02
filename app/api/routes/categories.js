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
  Category: { get, create, update },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newCategorySchema = new ValidateF()
  .param("name", "نام")
  .requiredString()
  .param("parentId")
  .number()
  .done();

const updatedCategorySchema = new ValidateF()
  .param("name", "نام")
  .string()
  .param("parentId")
  .number()
  .done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(authentication),
  use(getDataList("Category", "دسته بندی")),
  serveJson
);

router.get("/:uuid", use(authentication), use(get), serveJson);

router.post(
  "/",
  use(validator(newCategorySchema)),
  use(authentication),
  use(isUnique("Category", "دسته بندی", "name", "نام")),
  use(create),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedCategorySchema)),
  use(authentication),
  use(isUnique("Category", "دسته بندی", "name", "نام")),
  use(getEntityByUuid({ model: "Category", fields: ["uuid"] })),
  use(update),
  serveJson
);

module.exports = router;

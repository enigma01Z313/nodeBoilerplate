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
  Tag: {
    list,
    get,
    create,
    update,
    Book: { list: bookList },
  },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newTagSchema = new ValidateF()
  .param("name", "نام")
  .requiredString()
  .done();

const updatedTagSchema = new ValidateF().param("name", "نام").string().done();

/**************************/
/*         routes         */
/**************************/
router.get("/", use(authentication), use(list), serveJson);

router.get("/:uuid", use(authentication), use(get), serveJson);

router.get(
  "/:uuid/books",
  use(authentication),
  use(getEntityByUuid({ model: "Tag", fields: ["uuid"] })),
  use(bookList),
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

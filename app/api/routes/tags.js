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
} = require("../src/middleware");

const {
  Tag: { list, get, create },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newTagSchema = new ValidateF()
  .param("name", "نام")
  .requiredString()
  .done();

const updateTagSchema = new ValidateF().param("name", "نام").string().done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(authentication),
  use(getDataList("Tag", "برچسب")),
  serveJson
);

router.get("/:uuid", use(authentication), use(get), serveJson);

router.post(
  "/",
  use(validator(newTagSchema)),
  use(authentication),
  use(isUnique("Tag", "برچسب", "name", "نام")),
  use(create),
  serveJson
);

module.exports = router;

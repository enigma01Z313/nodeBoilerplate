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
} = require("../src/middleware");

const {
  Tag: { list, get },
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

module.exports = router;

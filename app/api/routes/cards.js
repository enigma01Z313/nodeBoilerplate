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
  filteredData,
  filteredSearch,
} = require("../src/middleware");

const {
  Card: { get, update },
} = require("../src/services");

/**************************/
/*         routes         */
/**************************/

router.get("/:uuid", use(authentication), use(get), serveJson);

router.put("/:uuid", use(update), serveJson);

module.exports = router;

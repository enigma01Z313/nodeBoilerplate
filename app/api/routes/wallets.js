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
  sortedData,
} = require("../src/middleware");

const {
  Wallet: { list, get },
} = require("../src/services");

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(authentication),
  use(filteredData({})),
  use(sortedData),
  use(list),
  serveJson
);

router.get("/:uuid", use(authentication), use(get), serveJson);

module.exports = router;

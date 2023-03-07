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
  filteredData,
  filteredSearch,
  sortedData,
  getDataList,
  getEntityByUuid,
} = require("../src/middleware");

const {
  Comment: { list, update },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const updatedCommentSchema = new ValidateF()
  .param("status", "وضعیت")
  .number()
  .regex(/^(0|1|2)$/)
  .done();

/**************************/
/*         routes         */
/**************************/

router.get(
  "/",
  use(authentication),
  use(filteredData({})),
  // use(
  //   filteredSearch({
  //     model: "Book",
  //     fields: ["name"],
  //   })
  // ),
  use(sortedData),
  use(list),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedCommentSchema)),
  use(authentication),
  use(getEntityByUuid({ model: "Comment", fields: ["uuid"] })),
  use(update),
  serveJson
);

module.exports = router;

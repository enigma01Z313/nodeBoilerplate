const express = require("express");
const router = express.Router();
const use = require("../src/utils/use");
const {
  serveJson,
  Auth: { authentication, authorization },
  Validate: {
    index: { ValidateF, validator },
  },
  isUnique,
  getEntityByUuid,
  getDataList,
  filteredData,
  filteredSearch,
} = require("../src/middleware");

const {
  Card: { get, update },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/

const updatedCardSchema = new ValidateF()
  .param("name", "نام")
  .string()
  .param("cardNumber", "شماره کارت")
  .string()
  .regex(/^[0-9]{16}$/)
  .param("shebaNumber", "شماره شبا")
  .string()
  .regex(/^IR[0-9]{24}$/)
  .done();

/**************************/
/*         routes         */
/**************************/

router.get("/:uuid", use(authentication), use(get), serveJson);

router.put(
  "/:uuid",
  use(validator(updatedCardSchema)),
  use(authentication),
  use(isUnique("Card", "کارد", "cardNumber", "شماره کارت")),
  use(isUnique("Card", "کارد", "shebaNumber", "شماره شبا")),
  use(getEntityByUuid({ model: "Card", fields: ["uuid"] })),
  use(update),
  serveJson
);

module.exports = router;

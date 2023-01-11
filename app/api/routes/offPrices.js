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
  Offprice: { create, update },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newOffPriceSchema = new ValidateF()
  .param("type", "نوع")
  .regex(/^(1|2)$/)
  .requiredNumber()
  .param("amount", "مقدار")
  .requiredNumber()
  .param("startDate", "تاریخ شروع")
  .requiredString()
  .param("endDate", "تاریخ پایان")
  .requiredString()
  .done();

const updatedOffPriceSchema = new ValidateF()
  .param("type", "نوع")
  .regex(/^(1|2)$/)
  .number()
  .param("amount", "مقدار")
  .number()
  .param("startDate", "تاریخ شروع")
  .string()
  .param("endDate", "تاریخ پایان")
  .string()
  .done();

/**************************/
/*         routes         */
/**************************/
router.post(
  "/",
  use(validator(newOffPriceSchema)),
  use(authentication),
  use(getEntityByUuid({ model: "Book", fields: ["book_id"] })),
  use(create),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedOffPriceSchema)),
  use(authentication),
  use(getEntityByUuid({ model: "Off_price", fields: ["uuid"] })),
  use(update),
  serveJson
);

module.exports = router;

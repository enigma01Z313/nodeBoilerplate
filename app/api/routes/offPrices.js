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
  getEntitiesByUuid,
} = require("../src/middleware");

const {
  Offprice: { create, remove },
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
  use(
    getEntitiesByUuid({
      model: "Book",
      field: "book_id",
      chainKey: "books",
    })
  ),
  use(create),
  serveJson
);

router.delete(
  "/",
  use(authentication),
  use(
    getEntitiesByUuid({
      model: "Book",
      field: "book_id",
      chainKey: "books",
    })
  ),
  use(remove),
  serveJson
);

module.exports = router;

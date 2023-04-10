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
  getEntitiesByUuid,
  getEntityByUuid,
} = require("../src/middleware");

const {
  SettleUp: { create },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newSettleUpSchema = new ValidateF()
  .param("cardNumber", "شماره کارت")
  .requiredString()
  .param("amount", "مبلغ")
  .requiredNumber()
  .param("status", "وضیعیت")
  .number()
  .regex(/^(1|2)$/)
  .done();

const updatedSettleUpSchema = new ValidateF()
  .param("cardNumber", "شماره کارت")
  .string()
  .param("amount", "مبلغ")
  .number()
  .param("status", "وضیعیت")
  .number()
  .regex(/^(1|2)$/)
  .param("attachment", "فایل ضمیمه")
  .done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(authentication),
  use(filteredData({})),
  use(sortedData),
  use(getDataList("SettleUp", "تسویه حساب", undefined, undefined, undefined)),
  serveJson
);

router.post(
  "/",
  use(validator(newSettleUpSchema)),
  use(authentication),
  use(create),
  serveJson
);

module.exports = router;

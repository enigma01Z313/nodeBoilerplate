const express = require("express");
const router = express.Router();

const { use } = require("../src/utils");

const {
  serveJson,
  Validate: {
    index: { ValidateF, validator },
  },
  Auth: { authentication, authorization },
  getDataByUUID,
  getDataList,
  getEntityByUuid,
  filteredData,
} = require("../src/middleware");

const {
  Author: { create },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newAuthorSchema = new ValidateF()
  .param("firstName", "نام")
  .requiredString()
  .param("lastName", "نام خانوادگی")
  .requiredString()
  .param("coutnry", "کشور محل تولد")
  .string()
  .param("birthDate", "تاریخ تولد")
  .string()
  .param("deathDate", "تاریخ فوت")
  .string()
  .param("content", "محتوا")
  .string()
  .done();

/**************************/
/*         routes         */
/**************************/
router.post(
  "/",
  use(validator(newAuthorSchema)),
  use(authentication),
  create,
  serveJson
);

router.get(
  "/",
  use(authentication),
  use(filteredData()),
  use(getDataList("Author", "مولف")),
  serveJson
);

router.get(
  "/:uuid",
  use(authentication),
  use(getDataByUUID("Author", "مولف")),
  serveJson
);

module.exports = router;

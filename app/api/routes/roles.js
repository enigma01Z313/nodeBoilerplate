const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const authentication = require("../src/middleware/auth/authentication");
const authorization = require("../src/middleware/auth/authorization");
const { ValidateF, validator } = require("../src/middleware/validate");
const isUnique = require("../src/middleware/isUnique");
const getDataByUUID = require("../src/middleware/getDataByUUID");
const validatePermissions = require("../src/middleware/validatePermissions");
const filteredData = require("../src/middleware/filteredData");
const getDataList = require("../src/middleware/getDataList");

const { roleSchema } = require("../src/utils/schema");

const {
  Role: { create, update, listPermissions },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newRoleSchema = new ValidateF()
  .param("name", "نام نقش کاربری")
  .required()
  .param("permissions", "لیست نقش کاربری")
  .required()
  .array("string")
  .done();

const updatedRoleSchema = new ValidateF()
  .param("permissions", "لیست نقش کاربری")
  .array("string")
  .param("status", "وضعیت")
  .number()
  .param("name", "نام")
  .done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/permissions",
  use(authentication),
  use(listPermissions),
  serveJson
);

router.get(
  "/",
  use(authentication),
  // use(authorization.def("SEE_ROLES")),
  filteredData({ id: { [Op.ne]: 1 } }),
  use(getDataList("Role", "نقش کاربری", undefined, undefined, "roleList")),
  serveJson
);

router.post(
  "/",
  use(validator(newRoleSchema)),
  use(authentication),
  use(isUnique("Role", "نقش", "name", "نام")),
  use(validatePermissions),
  use(create),
  serveJson
);

router.get(
  "/:uuid",
  use(authentication),
  use(getDataByUUID("Role", "نقش کاربری")),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedRoleSchema)),
  use(authentication),
  use(isUnique("Role", "نقش", "name", "نام")),
  use(getDataByUUID("Role", "نقش کاربری")),
  use(update),
  serveJson
);

module.exports = router;

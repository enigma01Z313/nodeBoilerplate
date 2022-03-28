const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const authorization = require("../src/middleware/authorization/authorization");
const { ValidateF, validator } = require("../src/middleware/validate");
const isUnique = require("../src/middleware/isUnique");
const getDataByUUID = require("../src/middleware/getDataByUUID");
const validatePermissions = require("../src/middleware/validatePermissions");
const filteredData = require("../src/middleware/filteredData");

const {
  listPermissions,
  addRole,
  getRoles,
  updateRole,
} = require("../src/services/role");

/**************************/
/*   validation schemas   */
/**************************/
const newRoleSchema = new ValidateF()
  .param("name", "نام نقش کاربری")
  .required()
  .param("permissions", "لیست نقش کاربری")
  .required()
  .array()
  .done();

const updatedRoleSchema = new ValidateF()
  .param("permissions", "لیست نقش کاربری")
  .array()
  .done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/permissions",
  // use(authorization.or(["ADD_ROLES", "EDIT_ROLES"])),
  use(listPermissions),
  serveJson
);

router.post(
  "/",
  use(validator(newRoleSchema)),
  use(authorization.or(["ADD_ROLES", "EDIT_ROLES"])),
  use(isUnique("Role", "نقش", "name", "نام")),
  use(validatePermissions),
  use(addRole),
  serveJson
);

router.get(
  "/",
  use(authorization.def("SEE_ROLES")),
  filteredData({ id: { [Op.ne]: 1 } }),
  use(getRoles),
  serveJson
);

router.get(
  "/:uuid",
  use(authorization.def("SEE_ROLES")),
  use(getDataByUUID("Role", "نقش کاربری")),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedRoleSchema)),
  use(authorization.or(["SEE_ROLES", "EDIT_ROLES"])),
  use(isUnique("Role", "نقش", "name", "نام")),
  use(getDataByUUID("Role", "نقش کاربری")),
  updateRole,
  serveJson
);

module.exports = router;

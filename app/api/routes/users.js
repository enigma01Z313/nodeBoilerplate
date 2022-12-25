const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const authentication = require("../src/middleware/auth/authentication");
const authorization = require("../src/middleware/auth/authorization");
const { ValidateF, validator } = require("../src/middleware/validate");
const isUnique = require("../src/middleware/isUnique");
const doesExist = require("../src/middleware/doesExist");
const filteredData = require("../src/middleware/filteredData");
const sortedData = require("../src/middleware/sortedData");
const getDataByUUID = require("../src/middleware/getDataByUUID");
const getDataList = require("../src/middleware/getDataList");
const theSameUser = require("../src/middleware/theSameUser");

const {
  User: { create, update },
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/
const newUserSchema = new ValidateF()
  .param("firstName", "نام")
  .requiredString()
  .param("lastName", "نام خانوادگی")
  .requiredString()
  .param("roleId", "نقش کاربری")
  .requiredString()
  .length(36)
  .param("status", "وضیعیت کاربری")
  .requiredNumber()
  .phoneSchema()
  .emailSchema()
  .done();

const updatedUserSchema = new ValidateF()
  .param("phone", "شماره موبایل")
  .string()
  .regex(/^09[0-9]{9}$/)
  .param("nationalCode", "کد ملی")
  .maximum(11)
  .string()
  .param("employeeCode", "کد مستخدم")
  .string()
  .param("firstName", "نام")
  .string()
  .param("lastName", "نام خانوادگی")
  .string()
  .param("imageId", "آیدی تصویر")
  .string()
  .length(36)
  .param("status", "وضعیت")
  .number()
  .param("roleId", "آیدی نقش")
  .string()
  .length(36)
  .done();
/**************************/
/*         routes         */
/**************************/
router.post(
  "/",
  use(validator(newUserSchema)),
  use(authentication),
  use(isUnique("User", "کاربر", "email", "ایمیل")),
  use(isUnique("User", "کاربر", "phone", "شماره تماس")),
  use(doesExist("Role", "نقش کاربری", "roleId", "آیدی")),
  use(create),
  serveJson
);

router.get(
  "/",
  use(authentication),
  filteredData({ id: { [Op.ne]: 1 } }),
  sortedData,
  use(getDataList("User", "کاربر", "Role")),
  serveJson
);

router.get(
  "/:uuid",
  use(authentication),
  use(theSameUser),
  use(getDataByUUID("User", "کاربر", "Role")),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updatedUserSchema)),
  use(authentication),
  use(theSameUser),
  use(getDataByUUID("User", "نقش کاربری", "Role")),
  use(isUnique("User", "کاربر", "phone", "شماره موبایل")),
  use(isUnique("User", "کاربر", "email", "ایمیل")),
  use(doesExist("Role", "نقش کاربری", "roleId", "آیدی", "body")),
  use(update),
  serveJson
);

module.exports = router;

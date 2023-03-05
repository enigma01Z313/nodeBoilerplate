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
  isUnique,
  doesExist,
  filteredData,
  filteredSearch,
  sortedData,
  getDataList,
  theSameUser,
  getEntityByUuid,
  getDataByUUID,
} = require("../src/middleware");

const {
  User: {
    create,
    update,
    get,
    list,
    Card: { list: listCards, create: createCard },
  },
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
  .regex(/^(1|2)$/)
  .phoneSchema()
  .param("email", "ایمیل")
  .string()
  .regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  .done();

const updatedUserSchema = new ValidateF()
  .param("phone", "شماره موبایل")
  .string()
  .regex(/^09[0-9]{9}$/)
  .param("email", "ایمیل")
  .string()
  .regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  .param("firstName", "نام")
  .string()
  .param("lastName", "نام خانوادگی")
  .string()
  .param("imageId", "آیدی تصویر")
  .string()
  .length(36)
  .param("status", "وضعیت")
  .number()
  .regex(/^(1|2)$/)
  .param("roleId", "آیدی نقش")
  .string()
  .length(36)
  .done();

const newCardSchema = new ValidateF()
  .param("name", "نام")
  .requiredString()
  .param("cardNumber", "شماره کارت")
  .requiredString()
  .regex(/^[0-9]{16}$/)
  .param("shebaNumber", "شماره شبا")
  .requiredString()
  .regex(/^IR[0-9]{24}$/)
  .done();

/**************************/
/*         routes         */
/**************************/
router.get(
  "/",
  use(authentication),
  use(filteredData({ id: { [Op.ne]: 1 } })),
  use(
    filteredSearch({
      model: "User",
      fields: ["firstName", "lastName", "phone", "email"],
    })
  ),
  use(sortedData),
  use(getDataList("User", "کاربر", "Wallet", undefined, "userList")),
  serveJson
);

router.get(
  "/:uuid",
  use(authentication),
  use(theSameUser),
  use(get),
  serveJson
);

router.get(
  "/:uuid/cards",
  use(authentication),
  use(filteredData({})),
  use(getEntityByUuid({ model: "User", fields: ["uuid"] })),
  use(sortedData),
  use(listCards),
  serveJson
);

router.post(
  "/:uuid/cards",
  use(validator(newCardSchema)),
  use(authentication),
  use(isUnique("Card", "کارد", "cardNumber", "شماره کارت")),
  use(isUnique("Card", "کارد", "shebaNumber", "شماره شبا")),
  use(getEntityByUuid({ model: "User", fields: ["uuid"] })),
  use(createCard),
  serveJson
);

router.post(
  "/",
  use(validator(newUserSchema)),
  use(authentication),
  use(isUnique("User", "کاربر", "phone", "شماره تماس")),
  use(isUnique("User", "کاربر", "email", "ایمیل")),
  use(getEntityByUuid({ model: "Role", fields: ["roleId"] })),
  use(create),
  serveJson
);

// router.get(
//   "/",
//   use(authentication),
//   filteredData({ id: { [Op.ne]: 1 } }),
//   sortedData,
//   use(getDataList("User", "کاربر", "Role")),
//   serveJson
// );

router.put(
  "/:uuid",
  use(validator(updatedUserSchema)),
  use(authentication),
  use(theSameUser),
  use(getEntityByUuid({ model: "Role", fields: ["roleId"] })),
  use(isUnique("User", "کاربر", "phone", "شماره موبایل")),
  use(isUnique("User", "کاربر", "email", "ایمیل")),
  use(getDataByUUID("User", "کاربر")),
  use(update),
  use(get),
  serveJson
);

module.exports = router;

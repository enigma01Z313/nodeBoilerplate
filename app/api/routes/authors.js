const express = require("express");
const { Op } = require("sequelize");

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
  filteredSearch,
  sortedData,
  Book: { bookList, query: bookQuery },
} = require("../src/middleware");

const {
  Author: { create, get, update, list },
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

const updateAuthorSchema = new ValidateF()
  .param("firstName", "نام")
  .string()
  .param("lastName", "نام خانوادگی")
  .string()
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
  use(sortedData),
  use(getDataList("Author", "مولف", undefined, undefined, "authorList")),
  serveJson
);

router.get("/:uuid", use(bookQuery), use(get), serveJson);

const bookListOption = {
  baseModel: "author",
  includes: [{ model: "Off_price" }],
};

router.get(
  "/:uuid/books",
  use(bookQuery),
  use(get),
  use(filteredData({})),
  use(
    filteredSearch({
      model: "Book",
      fields: ["name"],
    })
  ),
  use(bookList(bookListOption)),
  serveJson
);

router.put(
  "/:uuid",
  use(validator(updateAuthorSchema)),
  use(authentication),
  use(getEntityByUuid({ model: "Author", fields: ["uuid"] })),
  use(update),
  serveJson
);

module.exports = router;

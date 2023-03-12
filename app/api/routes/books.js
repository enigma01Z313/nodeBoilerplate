const express = require("express");
const router = express.Router();

const { use, inspect } = require("../src/utils");

const {
  serveJson,
  Validate: {
    index: { ValidateF, validator },
  },
  Auth: { authentication, authorization, conditionAuthentication },
  Book: { query: bookQuery },
  Publisher: { checkPublisher },
  getDataByUUID,
  getDataList,
  getEntityByUuid,
  getEntitiesByUuid,
  filteredData,
  sortedData,
  Buy: { validate: buyValidation, authenticate: buyAuth },
} = require("../src/middleware");

const {
  Book: {
    buy: buyBook,
    list,
    get,
    create,
    OffPrice: {
      get: getOffPrice,
      create: createOffPrice,
      update: updateOffPrice,
      remove,
    },
    Comment: { list: listComments, create: createComment },
  },
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

const bookAuthorsSchema = (function () {
  const authorTypes = require("../db/staticDb")("authorTypes")();

  const authorsSchema = new ValidateF();
  authorTypes.forEach(({ key, label }) => {
    authorsSchema.param(key, label).array("string");
  });

  return authorsSchema.done();
})();

const filePachageSchema = new ValidateF()
  .param("file", "آیدی فایل")
  .requiredString(36)
  .param("pageCount", "تعداد صفحات")
  .number()
  .param("fileLength", "مدت زمان")
  .number()
  .done();

const filesSchema = new ValidateF()
  .param("main", "فایل اصلی")
  .requiredObject(filePachageSchema)
  .param("sample", "فایل نمونه")
  .object(filePachageSchema)
  .done();

const fileTypesSchema = new ValidateF()
  .param("epub", "فایل epub")
  .object(filesSchema)
  .param("pdf", "فایل pdf")
  .object(filesSchema)
  .param("sound", "فایل صوتی")
  .object(filesSchema)
  .done();

const newBookSchema = new ValidateF()
  .param("name", "نام کتاب")
  .requiredString()
  .param("image", "تصویر کتاب")
  .requiredString(36)
  .param("content", "محتوا")
  .string()
  .param("publishedYear", "تاریخ انتشار")
  .number()
  .param("price", "قیمت")
  .number()
  .param("offPrice", "تخفیف")
  .object(newOffPriceSchema)
  .param("publisher", "ناشر")
  .requiredString(36)
  .param("categories", "دسته بندی")
  .array("string")
  .param("tags", "دسته بندی")
  .array("string")
  .param("authors", "مولف")
  .object(bookAuthorsSchema)
  .param("files", "فایل")
  .object(fileTypesSchema)
  .done();

const newCommentSchema = new ValidateF()
  .param("content", "محتوا")
  .requiredString()
  .param("repliseTo", "پاسخ به")
  .string()
  .length(36)
  .done();

// inspect(newBookSchema);

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
router.get(
  "/",
  use(conditionAuthentication),
  use(bookQuery),
  use(list),
  serveJson
);

router.post(
  "/",
  use(validator(newBookSchema)),
  use(
    getEntitiesByUuid({
      model: "Category",
      field: "categories",
      chainKey: "categories",
    })
  ),
  use(
    getEntitiesByUuid({
      model: "Tag",
      field: "tags",
      chainKey: "tags",
    })
  ),
  use(
    getEntitiesByUuid({
      model: "Author",
      field: "authors",
      chainKey: "authors",
    })
  ),
  use(
    getEntitiesByUuid({
      model: "File",
      field: "files",
      chainKey: "files",
    })
  ),
  use(checkPublisher()),
  use(create),
  use(get),
  serveJson
);

router.get("/:uuid", use(get), serveJson);

router.post(
  "/:uuid/buy",
  use(buyValidation),
  use(buyAuth),
  use(
    getEntityByUuid({
      model: "Book",
      fields: ["uuid"],
      includes: ["off_price"],
    })
  ),
  use(buyBook)
);

router.get(
  "/:uuid/tags",
  (req, res) => res.end("getting book tags"),
  serveJson
);

//comments for this book

router.get(
  "/:uuid/comments",
  use(authentication),
  use(filteredData({})),
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(sortedData),
  use(listComments),
  serveJson
);

router.post(
  "/:uuid/comments",
  use(validator(newCommentSchema)),
  use(authentication),
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(getEntityByUuid({ model: "Comment", fields: ["repliesTo"] })),
  use(createComment),
  serveJson
);

//off price for this book
router.get(
  "/:uuid/offprice",
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(getOffPrice),
  serveJson
);

router.post(
  "/:uuid/offprice",
  use(validator(newOffPriceSchema)),
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(createOffPrice),
  serveJson
);

router.put(
  "/:uuid/offprice",
  use(validator(updatedOffPriceSchema)),
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(updateOffPrice),
  serveJson
);

router.delete(
  "/:uuid/offprice",
  use(getEntityByUuid({ model: "Book", fields: ["uuid"] })),
  use(remove),
  serveJson
);

module.exports = router;

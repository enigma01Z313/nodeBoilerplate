"use strict";

const crypto = require("crypto");
const {
  Option,
  Role,
  User,
  UserMeta,
  Tag,
  Book,
  Category,
  Author,
  BookAuthor,
<<<<<<< HEAD
  BookTag,
  BookCategory,
=======
  Book_tag,
  Book_category,
>>>>>>> book
} = require("../models");
const models = require("../models");

const defaultPermissions = require("./defaultOption");
const hash = require("../../../src/utils/hash");

const listPermissions = (obj) => {
  const listPermissions = [];
  for (const { permissions } of obj) {
    for (const { permission } of permissions) {
      listPermissions.push(permission);
    }
  }

  return JSON.stringify(listPermissions);
};
const password = hash("1230");

(async function () {
  // Positions
<<<<<<< HEAD
  const options = await Option.bulkCreate([
=======
  await Option.bulkCreate([
>>>>>>> book
    {
      key: "permissions",
      value: JSON.stringify(defaultPermissions),
    },
  ]);
  console.log("Options seed has been finished");

  // Roles
  await Role.bulkCreate([
    {
      uuid: crypto.randomUUID(),
      name: "USER1",
      permissions: listPermissions(defaultPermissions),
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      name: "ادمین",
      permissions: listPermissions(defaultPermissions),
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      name: "کاربر",
      permissions: ["SEE_ROLES"],
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      name: "انتشارات",
      permissions: ["ADD_ROLES"],
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log("Roles seed has been finished");

  //Users
  await User.create({
    uuid: crypto.randomUUID(),
    phone: "09333950889",
    email: "f.ahmadyf94@gmail.com",
    password,
    firstName: "فرزین",
    lastName: "احمدی",
    roleId: 1,
    imageId: 1,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

<<<<<<< HEAD
  const users = await User.bulkCreate([
=======
  await User.bulkCreate([
>>>>>>> book
    {
      uuid: crypto.randomUUID(),
      phone: "09903696246",
      email: "faezeh92eh@gmail.com",
      password,
      firstName: "فائزه",
      lastName: "احسانی",
<<<<<<< HEAD
      roleId: 1,
=======
      roleId: 2,
>>>>>>> book
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09127676895",
      email: "minaAhmadzade@gmail.com",
      password,
      firstName: "مینا",
      lastName: "احمدزاده",
<<<<<<< HEAD
      roleId: 1,
=======
      roleId: 3,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09127676895",
      email: "minaAhmadzade@gmail.com",
      password,
      firstName: "انتشارات نشر قلم",
      lastName: "",
      roleId: 4,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09127676895",
      email: "minaAhmadzade@gmail.com",
      password,
      firstName: "قلمچی",
      lastName: "",
      roleId: 4,
>>>>>>> book
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log("User seed has been finished");

  //UserMeta
<<<<<<< HEAD
  const usermeta = await UserMeta.bulkCreate([
=======
  await UserMeta.bulkCreate([
>>>>>>> book
    {
      key: "رنگ مورد علاقه",
      value: "آبی",
      userId: 1,
    },
    {
      key: "ورزش مورد علاقه",
      value: "بوکس",
      userId: 2,
    },
  ]);
  console.log("UserMeta seed has been finished");

  //Books
<<<<<<< HEAD
  const books = await Book.bulkCreate([
    { name: "باشگاه پنج صبحی ها" },
    { name: "جرئت داشته باش" },
    { name: "قلعه حیوانات" },
=======
  await Book.bulkCreate([
    {
      name: "باشگاه پنج صبحی ها",
      publishedYear: 1395,
      content: "test",
      price: 1300,
    },
    {
      name: "جرئت داشته باش",
      publishedYear: 1390,
      content: "test",
      price: 1300,
    },
    {
      name: "قلعه حیوانات",
      publishedYear: 1340,
      content: "test",
      price: 1300,
    },
>>>>>>> book
  ]);
  console.log("Books seed has been finished");

  //Tags
<<<<<<< HEAD
  const tags = await Tag.bulkCreate([
=======
  await Tag.bulkCreate([
>>>>>>> book
    { name: "فروش ویژه" },
    { name: "تاریخی " },
    { name: "ترجمه " },
    { name: "داستان کوتاه " },
  ]);

  console.log("tag seed has been finished");

  //bookTag
<<<<<<< HEAD
  // const bookTags = await BookTag.bulkCreate([{ book_id: 1, tag_id: 3 }]);

  //category

  const categories = await Category.bulkCreate([
=======
  await Book_tag.bulkCreate([
    { book_id: 1, tag_id: 3 },
    { book_id: 1, tag_id: 2 },
    { book_id: 2, tag_id: 1 },
  ]);
  console.log("book tag seed has been finished");

  //category

  await Category.bulkCreate([
>>>>>>> book
    { name: "کلاسیک" },
    { name: "ترسناک" },
    { name: "تاریخی" },
    { name: "کمدی" },
    { name: "ادبیات", parentId: 3 },
    { name: "اسلام", parentId: 3 },
    { name: "ایران", parentId: 3 },
    { name: "علمی", parentId: 3 },
    { name: "دیالوگ", parentId: 4 },
    { name: "مونولوگ", parentId: 4 },
    { name: "هزل", parentId: 4 },
  ]);
  console.log("category seed has been finished");

  //bookCategory
<<<<<<< HEAD
  // const bookCategories = await BookCategory.bulkCreate([
  //   { book_id: 1, category_id: 8 },
  //   { book_id: 3, category_id: 4 },
  // ]);

  //Authors

  const authors = await Author.bulkCreate([
=======
  const bookCategories = await Book_category.bulkCreate([
    { book_id: 1, category_id: 8 },
    { book_id: 3, category_id: 4 },
  ]);

  //Authors

  await Author.bulkCreate([
>>>>>>> book
    {
      firstName: "فرزین",
      lastName: "احمدی",
      coutnry: "ایران",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 28)
      ).toISOString(),
      content: "فرزین احمدی جوان 28 ساله و با استعداد ایرانی",
    },
    {
      firstName: "رابین",
      lastName: "شارما",
      coutnry: "کانادا",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 120)
      ).toISOString(),
      deathDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 67)
      ).toISOString(),
      content: "رابین شارما در سال ۱۹۶۵ در کانادا متولد شد.",
    },
  ]);
<<<<<<< HEAD

=======
>>>>>>> book
  console.log("Authors seed has been finished");

  //Book Authors
  await BookAuthor.bulkCreate([
    {
      authorType: 1,
      author_id: 2,
      book_id: 2,
    },
    {
      authorType: 1,
      author_id: 1,
      book_id: 1,
    },
    {
      authorType: 2,
      author_id: 1,
      book_id: 2,
    },
  ]);
  console.log("Book Authors seed has been finished");

  process.exit();
})();

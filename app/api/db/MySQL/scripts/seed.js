"use strict";

const crypto = require("crypto");
const {
  Option,
  Role,
  User,
  UserMeta,
  Tag,
  Book,
<<<<<<< HEAD
  Category,
=======
  Author,
  BookAuthor,
>>>>>>> 0f6fb345988323a44b7205e24dc4ff0c140f57e1
} = require("../models");

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
  await Option.create({
    key: "permissions",
    value: JSON.stringify(defaultPermissions),
  });
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
      name: "admin",
      permissions: listPermissions(defaultPermissions),
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
    firstName: "Farzin",
    lastName: "Ahmady",
    roleId: 1,
    imageId: 1,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const user2 = await User.create({
    uuid: crypto.randomUUID(),
    phone: "09903696246",
    email: "faezeh92eh@gmail.com",
    password,
    firstName: "Faeze",
    lastName: "Ehsani",
    roleId: 1,
    imageId: 1,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("User seed has been finished");

  //UserMeta
  const userMeta1 = await UserMeta.create({
    key: "fave-color",
    value: "Pink",
  });
  console.log("UserMeta seed has been finished");

  await user2.addUserMeta(userMeta1);

  //Books
  const book1 = await Book.create({
    name: "5 Am Club",
  });
  const book2 = await Book.create({
    name: "Book 1",
  });
  const book3 = await Book.create({
    name: "Animal Farm",
  });
  console.log("Books seed has been finished");

  //Tags
  const tag1 = await Tag.create({
    name: "concept over twenty years ago",
  });

  console.log("tag seed has been finished");

  await book1.addTag(tag1);

<<<<<<< HEAD
  //category

  const category1 = await Category.create({
    name: "Classics",
  });
  console.log("category seed has been finished");

  await book1.addCategories(category1);
=======
  //Authors
  const author1 = await Author.create({
    firstName: "farzin",
    lastName: "ahmadi",
    coutnry: "Iran",
    birthDate: new Date(
      new Date().setFullYear(new Date().getFullYear() - 28)
    ).toISOString(),
    content: "test mohtava",
  });

  const author2 = await Author.create({
    firstName: "George",
    lastName: "Orwell",
    coutnry: "UK",
    birthDate: new Date(
      new Date().setFullYear(new Date().getFullYear() - 120)
    ).toISOString(),
    deathDate: new Date(
      new Date().setFullYear(new Date().getFullYear() - 67)
    ).toISOString(),
    content: "test mohtava",
  });
  console.log("Authors seed has been finished");

  //Book Authors
  await BookAuthor.bulkCreate([
    {
      authorType: 1,
      author_id: author2.id,
      book_id: book2.id,
    },
    {
      authorType: 1,
      author_id: author1.id,
      book_id: book1.id,
    },
    {
      authorType: 2,
      author_id: author1.id,
      book_id: book2.id,
    },
  ]);
  console.log("Book Authors seed has been finished");

>>>>>>> 0f6fb345988323a44b7205e24dc4ff0c140f57e1
  process.exit();
})();

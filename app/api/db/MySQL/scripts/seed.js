"use strict";

const crypto = require("crypto");
const { Option, Role, User } = require("../models");

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
  console.log("User seed has been finished");

  process.exit();
})();

"use strict";

require("dotenv").config();
const validator = require("../../../app/api/src/middleware/validate/validatorFunction");
const authonticatedUserSchema = require("../../../app/api/src/utils/schema/authonticatedUser");
const authorizationMiddleware = require("../../../app/api/src/middleware/auth/authorization");

describe("UNIT: AUTHERIZATION MIDDLEWARE: ONE PERMISSION", () => {
  const mockedData = {
    authenticatedUser: {
      id: "48302855-2467-4eb4-a78a-157f847b8cc1",
      phone: "09333950889",
      email: "f.ahmadyf94@gmail.com",
      nationalCode: "0017306140",
      employeeCode: "0000000",
      firstName: "Farzin",
      lastName: "Ahmady",
      imageId: "1",
      status: {
        code: 1,
        label: "فعال",
        color: "greed",
      },
      createdAt: "2022-04-05T05:23:59.000Z",
      updatedAt: "2022-04-05T05:24:22.000Z",
      role: {
        id: "5327642d-4685-4458-80f1-f8ff07754056",
        name: "USER1",
      },
      permissions: ["SEE_ROLES", "ADD_ROLES", "EDIT_ROLES"],
    },
  };

  const mockedReq = {};
  const mockedRes = {
    ...mockedData,
  };
  const mockedNext = jest.fn();

  test(`INVALID PERMISSION`, async () => {
    const result = await authorizationMiddleware.def("SEE_USERS")(
      mockedReq,
      mockedRes,
      mockedNext
    );

    const calls = mockedNext.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0].status).toBe(401);
    expect(calls[0][0].message).toMatch(
      /^Permission denied, you need permission/
    );
  });

  test(`VALID PERMISSION`, async () => {
    //   console.log(mockedReq);
    // const result = await authorizationMiddleware.def("SEE_ROLES")(
    //   mockedReq,
    //   mockedRes,
    //   mockedNext
    // );

    // const calls = mockedNext.mock.calls;
    // console.log(calls);
  });
});

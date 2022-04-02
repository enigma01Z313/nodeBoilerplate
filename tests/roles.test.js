const request = require("supertest");
const app = require("../app/app");
const generateRandom = require("../app/api/src/utils/generateRandom");
const { roleSchema } = require("../app/api/src/utils/schema");
const validator = require("../app/api/src/middleware/validate/validatorFunction");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1ZjkyN2VlLWRkNzgtNGFkNC1iM2ZmLTgyZjljNGI0MTJiMSIsInBob25lIjoiMDkzMzM5NTA4ODkiLCJpYXQiOjE2NDg0ODA5ODQsImV4cCI6MTY0ODU3MDk4NH0.us6CjpjgVcGpn3jsuzJ7j-NPAZ9KPzXI8pBItQI-CT8";
const newRoleName = generateRandom();

describe("Roles api tests", () => {
  test("GET /api/roles/permissions", async () => {
    await request(app)
      .get("/api/roles/permissions")
      .set("Authorization", token)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .expect((res) => {
        const data = res.body;
        if (data.length !== 4)
          return new Error(
            `data length error: expected '4', recieved '${data.length}'`
          );

        let index = 0;
        for (item of data) {
          const { name, permissions } = item;
          if (!name)
            return new Error(
              `Parameter 'name' does not exist on permissions index'${index}'`
            );

          if (!permissions)
            return new Error(
              `Parameter 'permissions' does not exist on permissions index'${index}'`
            );

          index++;
        }
      });
  });

  /////////////////////////
  //    adding roles     //
  /////////////////////////
  //check for name duplication
  test("POST /api/roles", async () => {
    await request(app)
      .post("/api/roles")
      .send({
        name: "USER1",
        permissions: ["SEE_ROLES", "ADD_ROLES"],
      })
      .set("Authorization", token)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400)
      .expect((res) => {
        const {
          body: {
            error: { message },
          },
        } = res;
        if (!message.includes("Duplicate entry: another 'Role' with name "))
          return new Error(`Error should be dublicate role name entry`);
      });
  });

  //check for wrong permission sent
  test("POST /api/roles", async () => {
    await request(app)
      .post("/api/roles")
      .send({
        name: newRoleName,
        permissions: ["SEE_ROLES", "ADD_ROLESW"],
      })
      .set("Authorization", token)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400)
      .expect((res) => {
        const {
          body: {
            error: { message },
          },
        } = res;
        if (!message.includes("Permission sent is not valid: "))
          return new Error(`Error should be permissions sent not allowed`);
      });
  });

  //check for adding new role
  test("POST /api/roles", async () => {
    await request(app)
      .post("/api/roles")
      .send({
        name: newRoleName,
        permissions: ["SEE_ROLES", "ADD_ROLES"],
      })
      .set("Authorization", token)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .expect((res) => {
        const data = res.body;
        if (!!validator(data, roleSchema)) return new Error(`aaaaaaaaaaaaaaa`);
      });
  });

  /////////////////////////
  //    getting roles    //
  /////////////////////////
  //get all roles
  test("GET /api/roles", async () => {
    await request(app)
      .get("/api/roles")
      .set("Authorization", token)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .expect((res) => {
        const data = res.body;
        console.log(res.body);
      });
  });

  //get all roles with status filter
  // test("GET /api/roles", async () => {});

  /////////////////////////
  //   get single role   //
  /////////////////////////
  // let roleId;
  //not found roleId
  // roleId = "123";
  // test(`GET /api/roles/${roleId}`, async () => {});

  //valid roleId
  // roleId = "123";
  // test(`GET /api/roles/${roleId}`, async () => {});
});

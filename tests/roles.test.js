const request = require("supertest");

const app = require("../app/app");
jest.useFakeTimers();

describe("Roles api tests", () => {
  test("sss", () => {});
  test("ttt", () => {});
  test("GET /api/roles/permissions", () => {
    request(app)
      .get("/api/roles/permissions")
      .expect(404)
      // .end((err, res) => {
      //   if (err) done(err);
      //   done();
      // });
    //   request(app)
    //     .get("/api/roles/permissions")
    //     .expect("Content-Type", "/json/")
    //     .expect(200)
    //     .expect((res) => {
    //       const data = res.body.data;
    //       data.length = 3;
    //       data[0].length = 2;
    //       data[1].length = 2;
    //       data[2].length = 2;
    //       data[3].length = 2;
    //     })
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       return done;
    //     });
  });
});

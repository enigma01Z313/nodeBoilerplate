const http = require("http");
const app = require("./app/app");

const port =
  (process.env.RUN_ENV === "server" && process.env.PORT_ONLINE) ||
  (process.env.RUN_ENV === "development" && process.env.PORT) ||
  30003;

const server = http.createServer(app);

const host =
  (process.env.RUN_ENV === "server" && process.env.HOST_ONLINE) ||
  (process.env.RUN_ENV === "development" && process.env.HOST);

server.listen(port, () => {
  console.log(`Api server is running on: ${host}:${port}`);
  console.log(`You can see documents on: ${host}:${port}/docs`);
});

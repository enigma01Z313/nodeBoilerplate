const http = require("http");
const app = require("./app/app");

const port = process.env.STAGING ? 30004 : process.env.PORT ?? 30003;

const server = http.createServer(app);

/////////////////
const host = "http://loclhost";
server.listen(port, () => {
  console.log(`Api server is running on: ${host}:${port}`);
});

const http = require("http");
const app = require("./app/app");

const port = process.env.PORT ?? 30000;

const server = http.createServer(app);

// const host = "http://67.43.234.92/"
const host = "http://loclhost";
server.listen(port, () => {
  console.log(`Api server is running on: ${host}:${port}`);
});

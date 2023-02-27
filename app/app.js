const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cookieParser = require("cookie-parser");
const { dbUrl, dbHost, dbUser, dbPass } = require("../config/dbMysql");
// const connectToMongo = require("./api/db/mongoDb/connect");

// connectToMongo();

//mysql database conncetion
const mysqlDB = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
});
mysqlDB.connect(function (err) {
  if (err) throw err;
  console.log("mysql Connected!");
});

const apiRouter = require("./api/routes");
const handleError = require("./handleError");
const handleCors = require("./handleCors");

app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(handleCors);

app.use(express.static(path.resolve(__dirname, "./public")));
app.use("/api", apiRouter);
app.get("/robots.txt", (req, res) => {
  res.end("robots file");
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.php"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

//handling 404 ndpoints
app.use("/", (req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
});

//ultimate error handler
app.use(handleError);

module.exports = app;

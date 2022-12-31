const winston = require("winston");

const curTime = new Date();
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `./app/logs/${curTime.getFullYear()}-${String(
        curTime.getMonth() + 1
      ).padStart(2, "0")}-${String(curTime.getDate()).padStart(2, "0")}.log`,
    }),
  ],
});

const handleError = (err, req, res, next) => {
  logger.log({
    level: "error",
    message: err.message,
    method: req.method,
    path: req.url,
    status: err.status,
    time: new Date(),
    meta: {
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    },
    detail: err.stack,
  });

  const errorTxtFa = err?.text ?? "خطای سرور";
  res.status(err.status ?? 500).json({
    error: {
      message: err.message,
      text: errorTxtFa,
    },
  });
};

module.exports = handleError;

const moment = require("moment");

const logger = function (req, res, next) {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } - ${moment().format()}`
  );
  next();
};

module.exports = logger;

const fs = require('fs');

const path = require('path');

function actionLogger(req, res, next) {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${req.ip}\n`;
  const logFilePath = path.join(__dirname, '..', 'logs/actions/', `${new Date().toISOString().slice(0,10)}.log`);

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error(err);
  });

  next();
}
  module.exports=actionLogger
const fs = require('fs');
const path = require('path');
function errorHandler(err, req, res, next) {
    const errorMessage = `[${new Date().toISOString()}] ${err.stack}\n`;
    const logFilePath = path.join(__dirname, '..', 'logs/errors/', `${new Date().toISOString().slice(0,10)}-error.log`);
  
    fs.appendFile(logFilePath, errorMessage, (err) => {
      if (err) console.error(err);
    });
  
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err.stack,
    });
  }
  module.exports=errorHandler
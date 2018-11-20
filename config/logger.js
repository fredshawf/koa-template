const winston = require('winston');
require('winston-daily-rotate-file');

const filename_prifix = `${Koa.env}`;

// 1.日志格式
const myFormat = winston.format.printf(info => {
  return `${info.message}`;
});


// 2.日志输出
const console_transport = new winston.transports.Console({colorize: true})
const file_transport = new winston.transports.File({
  filename: `log/${filename_prifix}.log`
  // format: myFormat,
  // level: 'debug'
})


// const file_transport = new winston.transports.DailyRotateFile({
//   filename: `log/${filename_prifix}-%DATE%.log`,
//   datePattern: 'YYYY-MM-DD',
//   format: winston.format.simple()
//   // zippedArchive: true,
// });


// 3.创建日志对象(logger中的format为前置过滤处理，最终会被transports中的format再次过滤处理)
const transports = Koa.env == 'development' ? [console_transport, file_transport] : [file_transport]

const logger = winston.createLogger({
  level: Koa.app.config.debug_level,
  format: myFormat,
  transports: transports
});


module.exports = logger;
const koa_static = require('koa-static');
const methodOverride = require('koa-methodoverride');
const koa_error = require('koa-error')





module.exports = [
  koa_static('public'),
  methodOverride(),
  // logger
  async (ctx, next) => {
    let begin_time = new Date();
    let time_zone = `${begin_time.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(begin_time.getTimezoneOffset())/60}`;
    let timeStr = `${begin_time.toLocaleDateString()} ${begin_time.toLocaleTimeString()} ${time_zone}`;
    let begin_log = `Started ${ctx.method} "${ctx.path}" at ${timeStr}`;
    Koa.logger.info(begin_log);
    // call next
    await next();
    let end_time = new Date();
    let end_log = `Completed ${ctx.status} ${ctx.message} in ${end_time - begin_time}ms\n`;
    Koa.logger.info(end_log);
  },  
  
  koa_error({engine: 'ejs', template: `${Koa.root}/public/error.ejs`})
  
  
  
  
]




// Koa.app.on('error', (err, ctx) => {
//   log.error('server error', err, ctx)
//   ctx.throw(500, [err], []);
//
// });
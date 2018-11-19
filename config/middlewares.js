const koa_static = require('koa-static');
const koa_methodOverride = require('koa-methodoverride');
const koa_error = require('koa-error');
const koa_session = require('koa-session');
const koa_body = require('koa-body');
const koa_querybody = require('koa-querybody');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const views = require('koa-views');
const RouterGenerator = require('koa-actionpack').RouterGenerator;
const router = Koa.router = RouterGenerator.draw(Koa.root + '/config/routes', {logger: Koa.logger});

module.exports = [
  koa_static('public'),
  koa_methodOverride(),
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
  
  // 异常处理
  koa_error({engine: 'ejs', template: `${Koa.root}/public/error.ejs`}),
  // 回话
  koa_session({},Koa.app),
  // 参数
  koa_body({
    multipart:true, // 支持文件上传
    encoding:'gzip',
    formidable:{
      // uploadDir: Koa.root + '/public/upload/', // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      onFileBegin:(name,file) => {} // 文件上传前的设置
    }
  }),
  koa_querybody(),
  // 客户端缓存
  conditional(),
  etag(),
  
  // 视图引擎
  views(Koa.root + '/app/views', {
    extension: 'ejs'
  }),
  
  router.routes()
  

  

]




// Koa.app.on('error', (err, ctx) => {
//   log.error('server error', err, ctx)
//   ctx.throw(500, [err], []);
//
// });
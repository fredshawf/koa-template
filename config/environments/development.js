// 开发环境应用配置

Object.assign(Koa.app.config, {
  
  
  // 日志级别
  debug_level: 'debug',
  
  // 类的自动加载路径
  autoload_paths: ['app', 'lib'],
  
  // 是否缓存类，生产环境应为true
  cache_classes: false,
  
  // 是否在boot.js中加载所有类, 生产环境应为true
  eager_load: false
  
  
  // TODO: 视图页配置app/views
  
  
  // TODO: 邮件相关配置
  
  
  
});


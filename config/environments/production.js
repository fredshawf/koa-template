// 生产环境应用配置

module.exports = {
  
  // 日志级别
  debug_level: 'info',
  
  
  app_keys: [process.env['SECRET_KEY_BASE']]
  
  
};



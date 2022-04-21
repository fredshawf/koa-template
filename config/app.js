const Koa = require('koa');
const Boot = require('./boot');
const path = require('path');

global.Koa = Koa;
Koa.app = new Koa();
Koa.env = process.env['NODE_ENV'] || 'development';
Koa.root = path.join(__dirname, '..');

// cookie salt config 
const app_keys = require(`./keys`);
// database config
const database_configs = require(`./database`);


// 全局配置
Koa.app.config = {
  // 设置时区
  time_zone: 'Beijing',
  
  // 设置本地化
  default_locale: "zh-CN",

  // 应用salt配置
  app_keys: app_keys,

  // 数据库配置
  database_configs: database_configs
}


// 开始引导
Boot.start();



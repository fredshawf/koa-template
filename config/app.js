const Boot = require('./boot');
const path = require('path')

global.Koa = require('koa');
Koa.app = new Koa();
Koa.env = process.env['NODE_ENV'] || 'development';
Koa.root = path.join(__dirname, '..');

// cookie salt config 
const secret_config = require(`./secrets.js`)[Koa.env];
// environment config
const environment_config = require(`./environments/${Koa.env}`);
// database config
const database_config = require(`./database`)[Koa.env];


// 全局配置
Koa.app.config = {
  // 设置时区
  time_zone: 'Beijing',
  
  // 类的自动加载路径
  autoload_paths: ['app/controllers', 'app/jobs', 'app/models', 'lib'],
  
  // 设置本地化
  default_locale: "zh-CN"
}

Koa.app.keys = Koa.app.config['app_keys'] = secret_config
Object.assign(Koa.app.config, environment_config)
Koa.app.config['database_config'] = database_config

// 开始引导
Boot.start();



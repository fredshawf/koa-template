const requireDirectory = require('require-directory');

// 加载配置信息
const env = process.env['NODE_ENV']
const config = require(`./environments/${env}`)

// 设置debug级别
process.env['DEBUG'] = config.debug_level.join(',');

// 应用基本配置
global.Koa = require('koa');
Koa.app = new Koa();
Koa.env = env;
Koa.app.config = config;
Koa.app.keys = require(`./secrets.js`)[Koa.env];

// 加载初始化脚本
const initializers = requireDirectory(module, './initializers');





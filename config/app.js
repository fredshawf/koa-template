const requireDirectory = require('require-directory');

global.Koa = require('koa');
Koa.app = new Koa();
Koa.env = process.env['NODE_ENV'];

// cookie salt
Koa.app.keys = require(`./secrets.js`)[Koa.env];

// 加载配置信息
Koa.app.config = require(`./environments/${Koa.env}`);


// 加载初始化脚本
const initializers = requireDirectory(module, './initializers');

console.log(Abc.ccc);
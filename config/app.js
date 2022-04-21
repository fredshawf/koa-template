const Koa = require('koa');
const Boot = require('./boot');
const path = require('path');

global.Koa = Koa;
Koa.app = new Koa();
Koa.app.env = process.env['NODE_ENV'] || 'development';
Koa.app.root = path.join(__dirname, '..');

// 开始引导
Boot.start();
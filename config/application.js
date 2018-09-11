var requireDirectory = require('require-directory');
var controllers = requireDirectory(module, '../app/controllers');
require('./environments/development.js');

const Koa = require('koa');
global.koa = new Koa();





// module.exports = App
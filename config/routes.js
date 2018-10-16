const Router = require('koa-router');

module.exports = Koa.app.router = new Router();


Koa.app.router.get('/abc/:id/:name', BaseController.action);


const Router = require('koa-router');
const RouterGenerator = require('./koa-router-generator');

const router = new Router();
module.exports = Koa.app.router = router;


// Koa.app.router.get('/abc/:id/:name', BaseController.action);

RouterGenerator.draw(router, function() {
  
  
  this.namespace("xiao", function() {
    this.get("/abc", 'ApplicationController#index');
    
  })
  
  
  
  this.post('/abc', 'ApplicationController#create');
  
  
  
  
  // 1 TODO: namespace
  // this.namespace('abc', function(space){
  //
  //   //2 TODO: resource with opts <controller action namespace (only except)>
  //   this.resources('application', {controller: 'ApplicationController'}, function(){
  //     //3 TODO: member/collection
  //     this.member(function(){
  //       this.get('adssdf')
  //     })
  //   })
    
  // 4 TODO: 普通的基于koa-router的重写
  //   this.get('/path', 'Application#index');
  //   this.post('/path/:id', 'Application#create');
  //
  // })
  
  // 5 TODO: 普通的基于koa-router的重写
  // this.get('/path', 'Application#index');
  //   this.post('/path/:id', 'Application#create');
  
  // 6 TODO: 基于controller action写法
  // this.all('/:controller/:action')
  
  
  // 纯koa-router写法
  // router.get('/abc', async () => {})
  
  
  
})

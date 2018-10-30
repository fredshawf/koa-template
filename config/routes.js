// 1.基于class-autoloader插件的路由构建
// this.get('/path/:id', 'Application#index');
// this.post('/path/:id', 'Application#create');

// 2.无class-autoloader插件的路由构建
// let XXController = require('xxx_controller');
// this.get('path/:id', XXController.prototype.action)

// 3.命名空间路由
// GET:  /space/path/:id
// POST: /space/path/:id
// this.namespace('space', function(){
//   this.get('/path/:id', 'Application#create');
//   this.post('/path/:id', 'Application#create');
// })

// 4.restful路由创建(基于class-autoloader插件)
  // GET      /test           TestController#index
  // GET      /test/new       TestController#new
  // POST     /test           TestController#create
  // GET      /test/:id       TestController#show
  // GET      /test/:id/edit  TestController#edit
  // PUT      /test/:id       TestController#update
  // DELETE   /photos/:id     TestController#destroy 
// this.resources('test')

// 5.restful路由创建(无class-autoloader插件)
// let XXController = require('xxx_controller');
// this.resources('test', {controller: XXController, only: ['index', 'show']})
// 第二个参数还接受only, except用于限定默认七个路由

// 6.restful嵌套路由
// GET      /test/:id/abc       AbcController#index
// GET      /test/:id/abc/new   TestController#new
//    ...
//    ...
// this.resources('test', {}, function(){
//   this.resources('abc')
// })
  
// 7.restful风格的非默认7个路由的构建
// GET  /test/:id/aaa       TestController#aaa
// GET  /test/bbb           TestController#bbb
// this.resources('test', {}, function(){
//   this.member(function(){
//     this.get('aaa')
//   })

//   this.collection(function(){
//     this.get('bbb')
//   })
// })

module.exports = function() {  
  
  this.resources('test');
  
  
  

}

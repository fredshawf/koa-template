// 1.一般路由构建
  // this.get('/path/:id', 'Application#index');
  // this.post('/path/:id', 'Application#create');

// 2.命名空间路由
  // GET:  /space/path/:id
  // POST: /space/path/:id
  // this.namespace('space', function(){
  //   this.get('/path/:id', 'Application#create');
  //   this.post('/path/:id', 'Application#create');
  // })

// 3.restful路由创建
  // 默认7个路由
  // GET      /test           TestController#index
  // GET      /test/new       TestController#new
  // POST     /test           TestController#create
  // GET      /test/:id       TestController#show
  // GET      /test/:id/edit  TestController#edit
  // PUT      /test/:id       TestController#update
  // DELETE   /photos/:id     TestController#destroy 
  // this.resources('test')

  // 自定义路由
  // this.resources('test', {}, function(){
  //   GET  /test/:id/aaa       TestController#aaa
  //   this.member(function(){
  //     this.get('aaa')
  //   })

  //   GET  /test/bbb           TestController#bbb
  //   this.collection(function(){
  //     this.get('bbb')
  //   })
  // })

  // 嵌套资源路由
  // GET      /test/:id/abc       AbcController#index
  // GET      /test/:id/abc/new   TestController#new
  //    ...
  //    ...
  // this.resources('test', {}, function(){
  //   this.resources('abc')
  // })

  // 自定义中间件
  // let XXController = require('xxx_controller');
  // this.resources('test', {controller: XXController, only: ['index', 'show']})
  // 第二个参数还接受only, except用于限定默认七个路由
  

module.exports = function() {  
  
  this.resources('test');
  
  
  

}

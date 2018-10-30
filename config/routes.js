// const Router = require('koa-router');
// const RouterGenerator = require('./koa-router-generator');
//
// const router = new Router();
// module.exports = Koa.app.router = router;


module.exports = function() {  
  
  
  // this.resources('application', {namespace: 'feng'}, function(){
//     this.collection(function() {
//       this.get('abc');
//     })
//
//     this.member(function(){
//       this.get('abcd')
//
//     })
//
//     this.resources('abc')
//
//   });
//
//
//   this.get('/abc', {controller: 'abc', namespace: 'feng', action: 'index'});
  
  this.resources('test');
  
  
  
  // 1 TODO: namespace
  // this.namespace('abc', function(space){
  //
  //   //2 TODO: resource with opts <controller namespace (only except)>
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
  
  
  
}

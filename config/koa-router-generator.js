const RouterDispatcher = require('./koa-router-dispatcher');


class RouterGenerator {
  
  static draw(router, func) {
    this.draw_common_route(router);
    
    let generator = new RouterGenerator(router);
    generator.draw_func(func);
    
    return generator;
  }
  
  
  static draw_common_route(router) {
    for(let method of ['get', 'put', 'post', 'patch', 'delete']) {
      RouterGenerator.prototype[method] = (path, target) => {
        // let dispatcher = new RouterDispatcher(target);
        router[method](path, RouterDispatcher.dispatch(target));
      }
    }
    RouterGenerator.prototype['del'] = RouterGenerator.prototype['delete'];
  }
  
  
  constructor(router) {
    this.router = router;
  }
  
  
  draw_func(func) {
    func.apply(this);
  }
  
  
  
  namespace(space, func) {
    new Namespace(this.router, space).draw_func(func);
  }
  
  
  resources(name, opts={}, func) {
    
  }
  
}







class Namespace extends RouterGenerator {
  constructor(router, space) {
    super(router);
    this.space = space;
  }
  
}




module.exports = RouterGenerator






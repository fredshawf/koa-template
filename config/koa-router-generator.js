const RouterDispatcher = require('./koa-router-dispatcher');


class RouterGenerator {
  
  static draw(router, func) {
    let generator = new RouterGenerator(router);
    generator.draw_func(func);
    
    return generator;
  }
  
  
  constructor(router) {
    this.router = router;
    this.namespace_names = []
    this.define_common_generator()
  }
  
  define_common_generator() {
    for(let method of ['get', 'put', 'post', 'patch', 'delete']) {
      this.constructor.prototype[method] = (path, target) => {
        
        let path_prefix = this.path_prefix();
        if (target.prefix) path_prefix += target.prefix[0] === '/' ? target.prefix : `/${target.prefix}`;
        if (!target.prefix && target.namespace) path_prefix += `/${namespace}`;
        
        let namespace_names = this.namespace_names
        if (target.namespace) namespace_names.push(target.namespace);
        Object.assign(target, {namespace: namespace_names})
        
        this.router[method](path_prefix, RouterDispatcher.dispatch(target));
      }
    }
    this.constructor.prototype['del'] = this.constructor.prototype['delete'];
  }
  
  path_prefix() {
    return `/${this.namespace_names().join('/')}`;
  }
  
  namespace_names() {
    return [];
  }
  
  
  draw_func(func) {
    func.apply(this);
  }
  
  
  namespace(space, func) {
    new Namespace(this.router, [space]).draw_func(func);
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












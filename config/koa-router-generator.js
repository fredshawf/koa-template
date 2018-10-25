const RouterDispatcher = require('./koa-router-dispatcher');


class RouterGenerator {
  
  static draw(router, func) {
    let generator = new RouterGenerator(router);
    
    generator.draw_func(func);
    return generator;
  }
  
  static define_generator_methods() {
    for(let method of ['get', 'put', 'post', 'patch', 'delete']) {
      this.prototype[method] = function (path, target) {

        let path_prefix = this.path_prefix();
        if (target.prefix) path_prefix += target.prefix[0] === '/' ? target.prefix : `/${target.prefix}`;
        if (!target.prefix && target.namespace) path_prefix += `/${namespace}`;
      
        let namespace_names = Object.assign([], this.namespace_names)
        if (target.namespace) namespace_names.push(target.namespace);
        if (typeof(target) === 'object') Object.assign(target, {namespace: namespace_names});
        
        this.router[method](path_prefix + path, new RouterDispatcher(target).dispatch());
      }
    }
    this.prototype['del'] = this.constructor.prototype['delete'];
    
  }
  
  constructor(router) {
    this.router = router;
    this.namespace_names = [];
  }
  
  path_prefix() {
    return this.namespace_names.length > 0 ? `/${this.namespace_names.join('/')}` : '';
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

RouterGenerator.define_generator_methods()



class Namespace extends RouterGenerator {
  constructor(router, ...space) {
    super(router);
    this.namespace_names = this.namespace_names.concat(space);
  }
  
  namespace(space, func) {
    new Namespace(this.router, ...this.namespace_names.concat(space)).draw_func(func);
  }
  
}


module.exports = RouterGenerator












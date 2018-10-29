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
        if (!target.prefix && target.namespace) path_prefix += `/${target.namespace}`;
        
        if (!(path[0] === '/')) path = `/${path}`;
      
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
  
  
  resources(resource_name, opts={}, func) {
    let namespace_names = Object.assign([], this.namespace_names);
    if (opts.namespace) namespace_names.push(opts.namespace);
    delete opts.namespace
    opts.namespace_names = namespace_names;
    
    new ResourcesGenerator(this.router, resource_name, opts);
  }
  
}

RouterGenerator.define_generator_methods()



class NamespaceGenerator extends RouterGenerator {
  constructor(router, ...space) {
    super(router);
    this.namespace_names = this.namespace_names.concat(space);
  }
  
  namespace(space, func) {
    new this.constructor(this.router, ...this.namespace_names.concat(space)).draw_func(func);
  } 
}



class ResourcesGenerator extends RouterGenerator {
  
  constructor(router, resource_name, opts) {
    super(router);
    this.resource_name = resource_name;
    this.namespace_names = opts.namespace_names;
    this.opts = opts;
    if (!opts.controller) opts.controller = resource_name;
    delete this.opts.namespace_names
    
    this.generate_restful();
  }
  
  generate_restful() {
    let restful_router = {
      index:    ['get', this.resource_name],
      show:     ['get', this.resource_name + '/:id', 'show'],
      new:      ['get', this.resource_name + '/new', 'new'],
      create:   ['post', this.resource_name, 'create'],
      edit:     ['get', this.resource_name + '/:id/edit', 'edit'],
      update:   ['put', this.resource_name + '/:id', 'update'],
      destroy:  ['delete', this.resource_name + '/:id', 'destroy']    
    }
    
    let actions = ['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'];
    
    let allowed_actions = this.opts.only || actions.filter((i) => {
      return this.opts.except ? !this.opts.except.includes(i) : true;
    })
    
    for (let item in restful_router) {
      if (!allowed_actions.includes(item)) continue;
      let opts = Object.assign({}, this.opts);
      this[restful_router[item][0]](restful_router[item][1], Object.assign( opts, {action: item }) );
    }
  }
  
  
  controller_name() {
    return this.opts.controller ? this.opts.controller : this.resource_name
  }
  
  
  member() {
    
  }
  
  
  collection() {
    
  }
  
  
}



module.exports = RouterGenerator












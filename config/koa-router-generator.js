
class RouterGenerator {
  
  static draw(router, func) {
    let generator = new RouterGenerator(router);
    generator.draw_func(func);
    
    return generator;
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


for(let method in ['get', 'put', 'post', 'patch', 'delete']) {
  RouterGenerator.prototype[method] = (path, target) => {
    
    if (typeof(target) === 'string') {
      let [controller, action] = target.split('#');
      if (controller && action) {
        
        
      }
    }
    
    
    
    
  }
  
}

RouterGenerator.prototype['del'] = RouterGenerator.prototype['delete'];





class Namespace extends RouterGenerator {
  constructor(router, space) {
    super(router);
    this.space = space;
  }
  
}




module.exports = RouterGenerator






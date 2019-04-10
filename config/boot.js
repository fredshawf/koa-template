const requireDirectory = require('require-directory');

module.exports = class Boot {
  
  static get_singleton() {
    Boot.singleton = Boot.singleton || new Boot();
    return Boot.singleton;
  }
  
  static start() {
    let booter = this.get_singleton();
    
    // initializers
    booter._initialize_script();
    
    // init logger
    booter._initialize_logger();
    
    // wrap middleware
    booter._initialize_middleware_stack()
  }
  
  
  // Excutes initializers in the directory (./initializers)
  _initialize_script() {
    this.initializers = requireDirectory(module, './initializers');
  }
  
  
  _initialize_logger() {
    Koa.logger = require('./logger')
  }
  
  
  _initialize_middleware_stack() {
    const Middlewares = require('./middlewares')
    for (let middleware of Middlewares) {
      Koa.app.use(middleware)
    }
  }
  
  
}
















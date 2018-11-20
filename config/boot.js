const requireDirectory = require('require-directory');
const ClassAutoloader = require('class-autoloader');

module.exports = class Boot {
  
  static get_singleton() {
    Boot.singleton = Boot.singleton || new Boot();
    return Boot.singleton;
  }
  
  static start() {
    let booter = this.get_singleton();
    
    // initializers
    booter._initialize_script();
    
    // autoload
    booter._set_class_loader();
    
    // init logger
    booter._initialize_logger();
    
    // wrap middleware
    booter._initialize_middleware_stack()
  }
  
  
  // Excutes initializers in the directory (./initializers)
  _initialize_script() {
    this.initializers = requireDirectory(module, './initializers');
  }
  
  
  // use autoload
  _set_class_loader() {
    this.class_loader = new ClassAutoloader(Koa.app.config);
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
















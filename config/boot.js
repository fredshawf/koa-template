const requireDirectory = require('require-directory');
const ClassLoader = require('./class_loader');


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
    booter._set_class_loader()
  }
  
  
  // Excutes initializers in the directory (./initializers)
  _initialize_script() {
    this.initializers = requireDirectory(module, './initializers');
  }
  
  
  // use autoload
  _set_class_loader() {
    this.class_loader = new ClassLoader(Koa.app.config);
  }
  
  
  
  
}
















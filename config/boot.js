const requireDirectory = require('require-directory');
const ClassLoader = require('./class_loader');


module.exports = class Boot {
  
  static get_singleton() {
    Boot.singleton = Boot.singleton || new Boot();
    return Boot.singleton;
  }
  
  static start() {
    let booter = this.get_singleton();
    
    booter._initialize_script();
    
    booter._set_global_class_namescope();
    
    booter._set_class_loader()

    booter._proxy_global_variables();
  }
  
  
  
  // Excutes initializers in the directory (./initializers)
  _initialize_script() {
    this.initializers = requireDirectory(module, './initializers');
  }
  
  // A class namescope included all classes required with autoload
  _set_global_class_namescope() {
    if (!global.classes) {
      global.classes = {};
    }
  }
  
  _set_class_loader() {
    this.class_loader = new ClassLoader(Koa.app.config.autoload_paths);
  }
  
  _proxy_global_variables() {
    global.__proto__ = new Proxy(global.__proto__, {
      get: (tar, attr) => {  
        return global.classes[attr] || this._try_load(attr) || tar[attr];
      }
    });
  }
  
  _try_load(class_name) {
    let klass = this.class_loader.load(class_name);
    return klass;
  }
  
}
















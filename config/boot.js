const requireDirectory = require('require-directory');

module.exports = class Boot {
  
  static get_singleton() {
    Boot.singleton = Boot.singleton || new Boot();
    return Boot.singleton;
  }
  
  static start() {
    let booter = this.get_singleton();

    if (booter._is_initialized()) return;

    // merge environment config
    booter._merge_environment_config
    
    // initializers
    booter._initialize_script();

    // init cookie salt
    booter._initialize_app_key();
    
    // init logger
    booter._initialize_logger();
    
    // wrap middleware
    booter._initialize_middleware_stack()

    booter._finish_initialize()
  }

  static is_initialized() {
    return this.get_singleton._is_initialized();
  }

  _merge_environment_config() {
    let environment_config = require(`./environments/${Koa.env}`);
    Object.assign(Koa.app.config, environment_config);
  }
  
  
  // Excutes initializers in the directory (./initializers)
  _initialize_script() {
    this.initializers = requireDirectory(module, './initializers');
  }


  _initialize_app_key() {
    Koa.app.keys = Koa.app.config['app_keys'][Koa.env];
  }
  
  
  _initialize_logger() {
    Koa.logger = Koa.logger || require('./logger')
  }
  
  
  _initialize_middleware_stack() {
    const Middlewares = require('./middlewares')
    for (let middleware of Middlewares) {
      Koa.app.use(middleware)
    }
  }
  

  _finish_initialize() {
    this.is_initialized = true;
  }

  _is_initialized() {
    return !!this.is_initialized;
  }
  
}
















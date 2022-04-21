const requireDirectory = require('require-directory');

module.exports = class Boot {
  
  static get_singleton() {
    Boot.singleton = Boot.singleton || new Boot();
    return Boot.singleton;
  }
  
  static start() {
    let booter = this.get_singleton();

    // load configuration
    booter._load_configuration();
    
    // initializers
    booter._initialize_script();

    // init cookie salt
    booter._initialize_app_key();
    
    // init logger
    booter._initialize_logger();
    
    // wrap middleware
    booter._initialize_middleware_stack();
  }


  _load_configuration() {
    let global_config = require(`./environments/global`);
    let env_config = require(`./environments/${Koa.app.env}`);
    Koa.app.config = Object.assign(global_config, env_config);

    // database config
    let database_configs = require(`./database`);
    Koa.app.config.database_configs = database_configs[Koa.app.env];
  }

  
  // Excutes initializers in the directory (./initializers)
  _initialize_script() {
    this.initializers = requireDirectory(module, './initializers');
  }


  _initialize_app_key() {
    Koa.app.keys = Koa.app.config.app_keys;
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
















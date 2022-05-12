const knex = require('knex');
const { Model } = require('objection');

// database config
let database_configs = require(`../database`);
const db_configs = database_configs[Koa.app.env];

class BaseModel extends Model {

  static set_knex(config_name = null) {
    this.knex_cache = this.knex_cache ? this.knex_cache : {};

    config_name = config_name ? config_name : Koa.app.env;

    let cached_knex = this.knex_cache[config_name];
    if (!cached_knex) {
      cached_knex = this.knex_cache[config_name] = this.generate_knex(db_configs);
    }

    this.knex(cached_knex);
  }

  

  static generate_knex(config) {
    config = Object.assign(config, {
      log: {
        warn(message) {
          // Koa.app.logger.warn(message);
        },
        error(message) {
          // Koa.app.logger.error(message);
        },
        deprecate(message) {
          // Koa.app.logger.deprecate(message);
        },
        debug(message) {
          Koa.app.logger.debug(`  [1m[35mSQL[0m ${message.sql} [${message.bindings.toString()}]`);
        },
      }
    });

    return knex(config);
  }

}

BaseModel.prototype['$beforeInsert'] = function() {
  this.created_at = new Date().toLocaleString();
  this.updated_at = new Date().toLocaleString();
}


BaseModel.prototype['$beforeUpdate'] = function() {
  this.updated_at = new Date().toLocaleString();
}

BaseModel.set_knex();
Koa.app.BaseModel = BaseModel;
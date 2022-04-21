const knex = require('knex');
const { Model } = require('objection');
const db_configs = Koa.app.config.database_configs;


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
          // Koa.logger.warn(message);
        },
        error(message) {
          // Koa.logger.error(message);
        },
        deprecate(message) {
          // Koa.logger.deprecate(message);
        },
        debug(message) {
          Koa.logger.debug(`  [1m[35mSQL[0m ${message.sql} [${message.bindings.toString()}]`);
        },
      }
    });

    return knex(config);
  }

}

BaseModel.set_knex();
module.exports = BaseModel;

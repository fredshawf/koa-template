const { Model } = require('objection');

const config = Koa.app.config.database_config

var knex = require('knex')({
  client: config.adapter,
  connection: {
    database : config.database,
    host : config.host,
    port : config.port,
    user : config.username,
    password : config.password,
    charset : config.encoding
  },
  pool: { min: 0, max: config.pool },
  debug: true,
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

Model.knex(knex);
module.exports = Model;
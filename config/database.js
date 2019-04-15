// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database : 'example_development',
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : '',
      charset : 'utf8'
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: 'db/seeds'
    },
    pool: { min: 0, max: 5 },
    debug: true
  },

  staging: {
    client: 'mysql2',
    connection: {
      database : 'example_staging',
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : '',
      charset : 'utf8'
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: 'db/seeds'
    },
    pool: { min: 0, max: 5 },
    debug: true
  },

  production: {
    client: 'mysql2',
    connection: {
      database : 'example_production',
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : '',
      charset : 'utf8'
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations'
    },
    pool: { min: 0, max: 5 },
    debug: true
  }

};

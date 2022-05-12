const Koa = require('koa');

module.exports = class User extends Koa.app.BaseModel {
  static get tableName() {
      return 'users';
  }
  
  
  
  
}
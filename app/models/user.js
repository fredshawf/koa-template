const Model = require('./base_model')

module.exports = class User extends Model {
  static get tableName() {
      return 'users';
  }
  
  
  
  
}
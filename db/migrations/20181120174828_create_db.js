
exports.up = function(knex, Promise) {
  return Promise.resolve().then(function(){
    // TODO: knex-db-manager 创建数据库
    
    // knex.client.config merge dbManager:{}
    
    console.log(knex)
  })
  
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};

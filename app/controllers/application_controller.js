module.exports = class ApplicationController {
  
  async index() {
    
    await this.render('hello', {a: JSON.stringify(this.params)});
    
  }
  
  
  async create() { 
    this.ctx.body = '123123';
    
  }
  
  
  
}
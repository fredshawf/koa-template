module.exports = class ApplicationController {
  
  async index() {
    
    await this.render('hello', {a: JSON.stringify(this.params)});
    
  }
  
  
  async create() {
    await this.render('hello', {a: JSON.stringify(this.params)});
    // this.ctx.body = '123123';
    
  }
  
  
  
}
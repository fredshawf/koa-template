
module.exports = class ApplicationController {
  
  async index() {
    
    await this.render('hello', {a: JSON.stringify(this.params)});
    
  }
  
  
  async create() {
    console.log(JSON.stringify(this.params))
    console.log(JSON.stringify(this.ctx.request.files))
    this.ctx.body = '123123';
    
  }
  
  
  
}
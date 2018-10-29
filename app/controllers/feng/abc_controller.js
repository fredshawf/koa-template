module.exports = class AbcController {
  
  async index() {
    await this.render('hello', {a: JSON.stringify(this.params)});
    
  }
  
}
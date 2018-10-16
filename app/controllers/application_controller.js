
module.exports = class ApplicationController {
  
  async index(ctx) {
    await ctx.render('hello', {a: ctx.captures});
    
  }
  
  
  
}
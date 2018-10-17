
module.exports = class ApplicationController {
  
  async index(ctx) {
    let user = await User.query().limit(1).first();
    
    await ctx.render('hello', {a: user.username});
    
  }
  
  
  
}
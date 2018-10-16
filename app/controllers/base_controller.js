module.exports = class BaseController {
  
  static action (ctx){
    return new ApplicationController().index(ctx)
    
  }
  
}
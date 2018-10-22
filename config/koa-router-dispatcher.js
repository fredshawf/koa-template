module.exports = class RouterDispatcher {
  
  
  
  static async call(ctx) {
    let dispatcher = new this(ctx);
    let controller = ctx.params.controller
    let action = ctx.params.action
    await this.dispatch(controller, action, ctx);
  }
  
  
  
  static async dispatch(controller, action, ctx) {
    let controller_class = eval(controller);
    let controller = new controller_class(ctx);
    await controller[action].apply(controller);
  }
  
  
  
  
}
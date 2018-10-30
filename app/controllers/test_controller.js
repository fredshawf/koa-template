module.exports = class TestController {
  
  async index() {
    await this.render('test/index', {a: 'index action'});
  }
  
  
  async show() {
    await this.render('test/show', {a: 'show action'});
  }
  
  async new() {
    await this.render('test/new', {a: 'new action'});
  }
  
  async create() {
    await this.render('test/show', {a: 'create action'});
  }
  
  async edit() {
    await this.render('test/edit', {a: 'edit action'});
  }
  
  
  async update() {
    await this.render('test/edit', {a: 'update action'});
  }
  
  async destroy() {
    await this.render('test/index', {a: 'destroy action'});
  }
  
  
  
}
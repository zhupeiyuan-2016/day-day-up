const Base = require('../base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const name = this.ctx.post('name');
    const password = think.md5(this.ctx.post('password'));
    const registermodel = this.model('admin/register');
    const data = await registermodel.register(name, password);
    if (data) {
      await this.session('name', think.md5(password + new Date()));
      return this.success({session: await this.session('name')});
    } else {
      return this.fail(1, '用户名已存在');
    }
  }
};

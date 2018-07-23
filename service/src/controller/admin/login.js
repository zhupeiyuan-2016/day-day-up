const Base = require('../base.js');

module.exports = class extends Base {
  __before() {
    // super.__before();
  }

  async indexAction() {
    const name = this.ctx.post('name');
    const password = think.md5(this.ctx.post('password'));
    const usermodel = this.model('admin/login');
    const data = await usermodel.user(name, password);
    if (data == 0) {
      const token = this.model('admin/base');
      await token.token(name, think.md5(password + new Date()));
      return this.success({session: think.md5(password + new Date())});
    } else if (data == 1) {
      return this.fail(1, '密码错误');
    } else {
      return this.fail(1, '用户名不存在');
    }
  }
};

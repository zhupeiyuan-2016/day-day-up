const Base = require('./base.js');

module.exports = class extends think.Controller {
  // async __before() {
  //   const userInfo = 'ok';
  //   if (think.isEmpty(userInfo)) {
  //     return false;
  //   }
  // }
  async indexAction() {
    const name = this.ctx.post('name');
    const password = this.ctx.post('password');
    const usermodel = this.model('login');
    const data = await usermodel.user(name, password);
    if (data == 666) {
      const session = await this.session('name', think.md5(password + new Date()));
      return this.success(await this.session('name'));
    } else {
      return this.success(data);
    }
  }
};

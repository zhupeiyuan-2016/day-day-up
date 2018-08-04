const Base = require('../base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const name = this.ctx.post('name');
    console.log(name);
    const model = this.model('admin/loginout');
    model.out(name);
    return this.success({msg: '退出成功'});
  }
};

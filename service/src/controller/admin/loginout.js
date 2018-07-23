const Base = require('../base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const session = this.ctx.post('session');
    const model = this.model('admin/base');
    model.cleartoken(session);
    return this.success({msg: '退出成功'});
  }
};

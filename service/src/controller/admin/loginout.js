const Base = require('../base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const name = this.ctx.post('name');
    const data = await this.session(null);
    return this.success({msg: '退出成功'});
  }
};

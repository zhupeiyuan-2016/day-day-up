const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const openid = this.ctx.post('openid');
    const model = this.model('data');
    const data = await model.person(openid);
    return this.success({
      'data': data
    });
  }
};

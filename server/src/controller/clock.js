const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const postdata = this.ctx.post('');
    const model = this.model('data');
    const date = Date.parse(new Date());
    const status = await model.person(postdata.openid).status;
    if (status) {
      return this.fail(1, '已打卡过');
    } else {
      await model.clock(postdata.openid, postdata.money, date);
      return this.success({msg: date});
    }
  }
};

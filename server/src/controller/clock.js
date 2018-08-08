const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const postdata = this.ctx.post('');
    const model = this.model('data');
    const date = Date.parse(new Date());
    const msg = await model.clock(postdata.openid, postdata.money, date);
    if (msg == 0) {
      return this.success({
        'data': '已经打卡过'
      });
    } else {
      return this.success({
        'data': 'ok'
      });
    }
  };
  async nowAction() {
    const postdata = this.ctx.post('');
    const model = this.model('data');
    const data = await model.nowclock(postdata.openid);
    if (data == 1) {
      return this.success({
        'msg': '打卡成功'
      });
    } else {
      return this.fail(1, '打卡过期');
    }
  }
  async statusAction() {
    const postdata = this.ctx.post('');
    const model = this.model('users');
    const users = await model.where({openid: postdata.openid}).find();
    const status = users.status;
    return this.success({
      'status': status
    });
  };

  timeAction() {
    const date = Date.parse('2018/8/8 20:10:20')
    const now = new Date();
    const old = new Date(date)
    return this.success({
      'old':date ,
      'new':now.getMonth() 
    })
  }
};

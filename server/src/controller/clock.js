const Base = require('./base.js');
// 20180824201808242018082420180824
module.exports = class extends Base {
  async indexAction() {
    const postdata = this.ctx.post('');
    // const formData =
    // `<xml>
    // <appid>wx052e3a40ef81e8cc</appid>
    // <mch_id>1432616402</mch_id>
    // <nonce_str>` + this.randomString(32) + `</nonce_str>
    // <sign></sign>
    // <body>打开金额支付</body>
    // <out_trade_no></out_trade_no>
    // <total_fee>` + postdata.money * 100 + `</total_fee>
    // <spbill_create_ip>` + this.ctx.ip + `</spbill_create_ip>
    // <notify_url></notify_url>
    // <trade_type>JSAPI</trade_type>

    // </xml>`;
    // const data = await this.fetch('https://api.mch.weixin.qq.com/pay/unifiedorder', { method: 'POST', body: formData }
    // ).then(res => res.json());

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
    } else if (data == 2) {
      return this.fail(1, '未到打卡时间');
    }else {
      return this.fail(1, '打卡已过时间');
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
  // randomString(len) {
  //   len = len || 32;
  //   var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  //   var maxPos = $chars.length;
  //   var pwd = '';
  //   for (i = 0; i < len; i++) {
  //     pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  //   }
  //   return pwd;
  // }
  // sign() {

  // }
};

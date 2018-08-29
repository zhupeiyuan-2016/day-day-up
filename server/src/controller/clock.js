const Base = require('./base.js');
const xmlreader = require('xmlreader');
// 20180824201808242018082420180824
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
      await this.pay(postdata.openid, postdata.money);
    }
  };
  async payAction() {
    const postdata = this.ctx.post('');
    const model = this.model('data');
    const date = Date.parse(new Date());
    await model.clockPay(postdata.openid, postdata.money, date);
    return this.success({
      'data': 'ok'
    });
  }
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
    } else {
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
  async pay(openid, money) {
    const _this = this;
    const postData = {
      appid: 'wx052e3a40ef81e8cc',
      body: 'day-up',
      mch_id: '1432616402',
      nonce_str: _this.createNonceStr(),
      notify_url: 'http://127.0.0.1:8360/pay',
      openid: openid,
      out_trade_no: Date.parse(new Date()),
      spbill_create_ip: '112.224.74.119',
      total_fee: money,
      trade_type: 'JSAPI'
    };
    postData.sign = this.createSign(postData);
    // const url = 'http://127.0.0.1:8360/pay';
    var formData = '<xml>';
    formData += '<appid>' + postData.appid + '</appid>';
    formData += '<body>' + postData.body + '</body>';
    formData += '<mch_id>' + postData.mch_id + '</mch_id>';
    formData += '<nonce_str>' + postData.nonce_str + '</nonce_str>';
    formData += '<notify_url>' + postData.notify_url + '</notify_url>';
    formData += '<out_trade_no>' + postData.out_trade_no + '</out_trade_no>';
    formData += '<spbill_create_ip>' + postData.spbill_create_ip + '</spbill_create_ip>';
    formData += '<total_fee>' + postData.total_fee + '</total_fee>';
    formData += '<trade_type>' + postData.trade_type + '</trade_type>';
    formData += '<openid>' + postData.openid + '</openid>';
    formData += '<sign>' + postData.sign + '</sign>';
    formData += '</xml>';
    const data = await this.fetch('https://api.mch.weixin.qq.com/pay/unifiedorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': formData.length
      },
      body: formData
    }
    ).then(res => res.text());
    console.log(data);
    await xmlreader.read(data, function(errors, response) {
      if (errors !== null) {
        return this.fail(1, '支付错误');
      }
      // total_fee;
      //       <appid><![CDATA[wx052e3a40ef81e8cc]]></appid>
      // <mch_id><![CDATA[1432616402]]></mch_id>
      // <nonce_str><![CDATA[hLQ0RSrR8pwNjTrB]]></nonce_str>
      // <sign><![CDATA[DE31EED55B3CAC47563927AC2D3DE25F]]></sign>
      // <result_code><![CDATA[SUCCESS]]></result_code>
      // <prepay_id><![CDATA[wx29193928175684eb9571acd42073580120]]></prepay_id>
      // <trade_type><![CDATA[JSAPI]]></trade_type>
      const payData = {
        appId: postData.appid,
        nonceStr: response.xml.nonce_str.text(),
        package: `prepay_id=` + response.xml.prepay_id.text(),
        signType: 'MD5',
        timeStamp: postData.out_trade_no
        // paySign: response.xml.sign.text()
      };
      payData.paySign = _this.createSign(payData);
      // console.log(payData);
      // _this.createSign(payData);
      return _this.success({
        'data': payData
      });
    });
  }

  createNonceStr() {
    // 随机字符串，不长于32位。推荐随机数生成算法
    return Math.random().toString(36).substr(2, 15);
  };
  createSign(data) {
    const key = '2018201820182018201820182018Pass';
    let strA = '';
    for (var index in data) {
      strA += index + `=` + data[index] + `&`;
    }
    strA += `key=` + key;
    console.log('------------------sign');
    console.log(strA);
    const strB = think.md5(strA).toUpperCase();
    console.log(strB);
    return strB;
  }
};

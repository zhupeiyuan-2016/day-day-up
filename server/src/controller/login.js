const Base = require('./base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const getdata = this.ctx.post();
    const weixingapi = `?appid=wxcab5eeff70f28263&secret=76d89ca92d4807a4f2526ca795a69882&js_code=` + getdata.code + `&grant_type=authorization_code`;
    const data = await this.fetch(`https://api.weixin.qq.com/sns/jscode2session` + weixingapi
    ).then(res => res.json());
    return this.success({
      'data': data.openid
    });
  }
  async postAction() {
    const getdata = this.ctx.post();
    const model = this.model('data');
    model.updata(getdata.openid, getdata.name, getdata.img);
    return this.success({
      'data': 'ok'
    });
  }
};
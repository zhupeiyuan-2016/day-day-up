const Base = require('./base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const getdata = this.ctx.post();
    const weixingapi = `?appid=wx3b1db4919b3fa7ac&secret=86f5360ab1c36eb0a78747aabdc76012&js_code=` + getdata.code + `&grant_type=authorization_code`;
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

const Base = require('../base.js');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);
module.exports = class extends Base {
  async __before() {
    const data = this.ctx.post('');
    const model = this.model('admin/login');
    if (think.isEmpty(await model.gettoken(data.token))) {
      return this.fail(1, '账号未登录');
    }
  }
  async indexAction() {
    const data = this.post();
    const banner = this.file('banner');
    const rulesimg = this.file('rulesimg');
    const setupmodel = this.model('admin/setup');
    setupmodel.setup(data);
    console.log(data.address);
    const bannerpath = path.join(think.ROOT_PATH, 'runtime/upload/banner.png');
    think.mkdir(path.dirname(bannerpath));
    await rename(banner.path, bannerpath);
    const rulesimgpath = path.join(think.ROOT_PATH, 'runtime/upload/rulesimg.png');
    think.mkdir(path.dirname(rulesimgpath));
    await rename(rulesimg.path, rulesimgpath);
    return this.success("{msg:'成功'}");
  }
};

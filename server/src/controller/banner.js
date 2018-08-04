const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const banner = this.model('data');
    const data = await banner.banner();
    return this.success({
      data
    });
  }
};

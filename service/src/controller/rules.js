const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const model = this.model('data');
    const data = await model.rules();
    return this.success({
      'img': data.img,
      'text': data.text
    });
  }
};

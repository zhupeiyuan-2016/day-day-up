const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const model = this.model('data');
    const data = await model.daylist(100);
    for (let i = 0; i < data.length - 1; i++) {
      data[i].img = await model.userimg(data[i].name);
      data[i].add = await model.userday(data[i].name);
    }

    return this.success(data);
  }
};

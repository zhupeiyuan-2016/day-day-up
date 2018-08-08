const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const model = this.model('data');
    const data = await model.daylist(10);
    for (let i = 0; i < data.length; i++) {
      data[i].img = await model.userimg(data[i].name);
      data[i].add = await model.userday(data[i].name);
    }
    console.log(data);
    return this.success(data);
  }
};

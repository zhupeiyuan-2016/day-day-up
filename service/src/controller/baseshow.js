const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const model = this.model('data');
    const data = await model.daylist(100);
    const daynumber = data.length;
    let prizenumber = 0;
    for (let i = 0; i < data.length; i++) {
      prizenumber += data[i].money;
    }
    const first = data[data.length - 1];
    return this.success({
      'daynumber': daynumber,
      'prizenumber': prizenumber,
      'name': first.name,
      'img': await model.userimg(first.name),
      'date': first.date

    });
  }
};

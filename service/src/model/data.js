module.exports = class extends think.Model {
  async daylist(count) {
    const model = this.model('data');
    const date = new Date().getFullYear() + `-` + new Date().getMonth() + `-` + new Date().getDay();
    const box = await model.limit(count).select();
    const data = [];
    for (let i = 0; i < box.length; i++) {
      if (box[i].date == date) {
        data.push(box[i]);
      }
    }
    return data;
  }
  async userimg(name) {
    const model = this.model('users');
    const user = await model.where({name: name}).find();
    return user.img;
  }
  async userday(name) {
    const model = this.model('users');
    const user = await model.where({name: name}).find();
    return user.day;
  }
};

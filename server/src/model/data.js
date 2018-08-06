module.exports = class extends think.Model {
  async daylist(count) {
    const model = this.model('data');
    const date = new Date().getFullYear() + `-` + new Date().getMonth() + `-` + new Date().getDay();
    const box = await model.limit(count).select();
    console.log(box);
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
    console.log('name-------------------');
    console.log(name);
    const user = await model.where({name: name}).find();
    return user.img;
  }
  async userday(name) {
    const model = this.model('users');
    const user = await model.where({name: name}).find();
    return user.day;
  }
  async banner() {
    const model = this.model('setup');
    const banner = await model.limit(1).select();
    const data = banner[0].banner;
    return data;
  }
  async rules() {
    const model = this.model('setup');
    const rules = await model.limit(1).select();
    const data = {
      img: rules[0].rulesimg,
      text: rules[0].rulestext
    };
    return data;
  }
  async map() {
    const model = this.model('setup');
    const setup = await model.limit(1).select();
    const data = {
      radius: setup[0].radius,
      latitude: setup[0].latitude,
      longitude: setup[0].longitude
    };
    return data;
  }
  async updata(openid, name, img) {
    const model = this.model('users');
    if (think.isEmpty(await model.where({openid: openid}).find())) {
      await model.add({
        openid: openid,
        name: name,
        img: img
      });
    } else {
      await model.where({openid: openid}).update({
        name: name,
        img: img
      });
    }
  }
  async person(openid) {
    const model = this.model('users');
    const data = await model.where({openid: openid}).find();
    console.log(data);
    return data;
  }
};
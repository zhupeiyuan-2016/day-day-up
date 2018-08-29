module.exports = class extends think.Model {
  /*
    获取当日签到列表
    @count{int}获取数量
  */
  async daylist(count) {
    const model = this.model('data');
    const date = new Date();
    const box = await model.limit(count).select();
    console.log('------------');
    console.log(box);
    console.log(new Date(parseInt(box[0].date)).getDate());
    const data = [];
    for (let i = 0; i < box.length; i++) {
      if (new Date(parseInt(box[i].date)).getDate() + 1 == date.getDate()) {
        box[i].date = new Date(parseInt(box[i].date)).getHours() + `时` + new Date(parseInt(box[i].date)).getMinutes();
        data.push(box[i]);
      }
    }
    return data;
  }
  /*
    获取用户头像地址
    @name{char}用户名
  */
  async userimg(name) {
    const model = this.model('users');
    console.log('name-------------------');
    console.log(name);
    const user = await model.where({name: name}).find();
    return user.img;
  }
  /*
    获取用户累计天数
    @name{char}用户名
  */
  async userday(name) {
    const model = this.model('users');
    const user = await model.where({name: name}).find();
    return user.day;
  }
  /*
    获取海报页信息
  */
  async banner() {
    const model = this.model('setup');
    const banner = await model.limit(1).select();
    const data = banner[0].banner;
    return data;
  }
  /*
    获取规则页信息
  */
  async rules() {
    const model = this.model('setup');
    const rules = await model.limit(1).select();
    const data = {
      img: rules[0].rulesimg,
      text: rules[0].rulestext
    };
    return data;
  }
  /*
    获取地图信息
  */
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
  /*
   更新当日打卡承诺
   @openid(char)用户唯一id
   @name(char)用户名
   @img(img)用户头像地址
  */
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
  /*
   获取用户信息
  @openid(char)用户唯一id
  */
  async person(openid) {
    const model = this.model('users');
    const data = await model.where({openid: openid}).find();
    return data;
  }
  /*
   添加承诺
    @openid(char)用户唯一id
    @money(int)金额
    @date(int)时间戳
  */
  async clock(openid, money, date) {
    const users = this.model('users');
    const user = await users.where({openid: openid}).find();
    if (think.isEmpty(user.status)) {
      return 1;
    } else {
      return 0;
    }
  }
  async clockPay(openid, money, date) {
    const users = this.model('users');
    await users.where({openid: openid}).update({
      nowmoney: money,
      status: date
    });
  }
  /*
   打卡验证
  @openid(char)用户唯一id
  */
  async nowclock(openid) {
    const users = this.model('users');
    const user = await users.where({openid: openid}).find();
    const moneyTemp = user.nowmoney;
    const userday = new Date(parseInt(user.status));
    const nowday = new Date();
    // console.log(userday.getFullYear());
    // console.log('---------------------');
    // console.log(nowday.getFullYear());
    // console.log(userday.getMonth());
    // console.log('---------------------');
    // console.log(nowday.getMonth());
    // console.log(userday.getDate());
    // console.log('---------------------');
    // console.log(nowday.getDate());
    // console.log(nowday.getHours());
    if (userday.getFullYear() == nowday.getFullYear() && userday.getMonth() == nowday.getMonth() && userday.getDate() + 1 == nowday.getDate() && nowday.getHours() >= 7 && nowday.getHours() < 8) {
      const daylist = this.model('data');
      await daylist.add({
        openid: openid,
        date: user.status,
        money: user.nowmoney,
        name: user.name,
        img: user.img
      });
      await users.where({openid: openid}).update({
        status: '',
        nowmoney: ''
      });
      await users.where({openid: openid}).increment('day', 1);
      await users.where({openid: openid}).increment('money', moneyTemp);
      return 1;
    } else if (userday.getDate() == nowday.getDate()) {
      return 2;
    } else {
      await users.where({openid: openid}).update({
        status: '',
        nowmoney: ''
      });
      return 0;
    }
  }
};

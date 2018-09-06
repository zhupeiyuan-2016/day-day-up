module.exports = class extends think.Model {
  /*
    获取当日签到列表
    @count{int}获取数量
  */
  async daylist(count) {
    const model = this.model('data');
    // const date = new Date(parseInt('1536362700000'));
    const date = new Date();
    const box = await model.limit(count).select();
    const data = [];
    for (let i = 0; i < box.length; i++) {
      console.log(box[i]);
      console.log(box[i].date);
      const day = await this.daysBetween(Date.parse(date), box[i].date);
      if (day == 0) {
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
    const users = this.model('users'); ;
    users.where({openid: openid}).update({
      nowmoney: '',
      status: date
    });
  }
  /*
   打卡验证
  @openid(char)用户唯一id
  */
  async daysBetween(day1, day2) {
    const temp1 = new Date(parseInt(day1));
    const temp2 = new Date(parseInt(day2));
    const time1 = new Date(temp1.getFullYear() + '-' + temp1.getMonth() + '-' + temp1.getDate());
    const time2 = new Date(temp2.getFullYear() + '-' + temp2.getMonth() + '-' + temp2.getDate());
    const result = Math.abs(parseInt((time1 - time2) / 1000 / 3600 / 24));
    return result;
  };
  async nowclock(openid) {
    const users = this.model('users');
    const user = await users.where({openid: openid}).find();
    const moneyTemp = user.nowmoney;
    // const userday = new Date(parseInt(user.status));
    const nowday = new Date();
    // const nowday = new Date(parseInt('1536362700000'));
    console.log('相差');
    console.log(await this.daysBetween(Date.parse(nowday), user.status));
    const daysBetween = await this.daysBetween(Date.parse(nowday), user.status);
    console.log(nowday.getHours());
    console.log(nowday.getMinutes());
    if ((daysBetween == 1) && ((nowday.getHours() == 6 && nowday.getMinutes() >= 30) || (nowday.getHours() == 7 && nowday.getMinutes() <= 30))) {
      const daylist = this.model('data');
      await daylist.add({
        openid: openid,
        date: Date.parse(nowday),
        money: user.nowmoney,
        name: user.name,
        img: user.img
      });
      if (think.isEmpty(user.tempstatus)) {
        await users.where({openid: openid}).update({
          tempstatus: user.status
        });
      } else {
        const tempStatus = new Date(parseInt(user.tempstatus));
        if (daysBetween) {
          console.log('连续加成');
          await users.where({openid: openid}).increment('addday', 1);
          await users.where({openid: openid}).update({
            tempstatus: user.status
          });
        } else {
          const tempDate = new Date();
          await users.where({openid: openid}).update({
            tempstatus: Date.parse(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), 7, 0, 0)),
            addday: '0'
          });
        }
      }
      await users.where({openid: openid}).update({
        // tempstatus: user.status,
        status: '',
        nowmoney: ''
      });
      await users.where({openid: openid}).increment('day', 1);
      await users.where({openid: openid}).increment('money', moneyTemp);
      return 1;
    } else if (((daysBetween == 1) && (nowday.getHours() == 6 && nowday.getMinutes() < 30)) || ((daysBetween == 1) && nowday.getHours() < 6)) {
      return 2;
    } else if (daysBetween == 0) {
      return 2;
    } else {
      await users.where({openid: openid}).update({
        status: '',
        nowmoney: '',
        tempstatus: '',
        addday: ''
      });
      return 0;
    }
  }
};

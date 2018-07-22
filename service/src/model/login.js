module.exports = class extends think.Model {
  async user(name, password) {
    const model = this.model('user');
    const data = await model.where({name: name}).find();
    if (!think.isEmpty(data)) {
      if (password == data.password) {
        return 666;
      } else {
        return '密码错误';
      }
    } else {
      return '用户名不存在';
    }
  }
};

编号;

字段;

名称;

类型;

必须;

描述;

1;

daynumber;

当日打卡人数;

Int;

M;

2;

prizenumber;

当日打卡金额;

Int;

M;

3;

name;

当日打卡最早人名称;

String;

M;

4;

img;

当日打卡最早人头像;

String;

M;

5;

data;

当日打卡最早人时间;

Date;

M;

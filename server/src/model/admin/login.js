module.exports = class extends think.Model {
  async user(name, password) {
    const model = this.model('user');
    const data = await model.where({name: name}).find();
    if (!think.isEmpty(data)) {
      if (password == data.password) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return -1;
    }
  }
  async token(name, token) {
    const model = this.model('user');
    await model.where({name: name}).update({
      token: token
    });
  }
  async gettoken(token) {
    const model = this.model('user');
    const data = model.where({token: token}).find();
    return data;
  }
};

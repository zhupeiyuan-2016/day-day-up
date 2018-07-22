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
};

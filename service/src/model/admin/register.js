module.exports = class extends think.Model {
  async register(name, password) {
    const model = this.model('user');
    if (think.isEmpty(await model.where({name: name}).find())) {
      model.add({
        name: name,
        password: password
      });
      return true;
    } else {
      return false;
    }
  }
};

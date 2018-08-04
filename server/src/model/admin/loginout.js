module.exports = class extends think.Model {
  async out(name) {
    const model = this.model('user');
    if (!think.isEmpty(await model.where({name: name}).find())) {
      await model.where({name: name}).update({
        token: '0'
      });
      return true;
    } else {
      return false;
    }
  }
};

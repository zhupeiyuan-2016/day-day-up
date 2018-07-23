module.exports = class extends think.Model {
  async token(name, token) {
    const model = this.model('user');
    await model.where({'name': name}).update({
      'token': token
    });
  }
  async gettoken(token) {
    const model = this.model('user');
    const data = await model.where({'token': token}).find();
    return data;
  }
  async cleartoken(token) {
    const model = this.model('user');
    await model.where({'token': token}).update({
      'token': '0000'
    });
  }
};

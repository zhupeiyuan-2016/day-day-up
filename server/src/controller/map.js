const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const model = this.model('data');
    const map = await model.map();
    return this.success({
      'radius': map.radius,
      'latitude': map.latitude,
      'longitude': map.longitude
    });
  }
};

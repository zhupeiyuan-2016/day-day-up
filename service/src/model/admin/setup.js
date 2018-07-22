module.exports = class extends think.Model {
  async setup(data) {
    const model = this.model('setup');
    const up = await model.where('1 = 1 ').update({
      latitude: data.latitude,
      longitude: data.longitude,
      radius: data.radius,
      address: data.address,
      map: data.map,
      rulestext: data.rulestext
    });
  }
};

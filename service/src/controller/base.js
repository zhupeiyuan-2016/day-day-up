module.exports = class extends think.Controller {
  __before() {
    // const method = this.http.method.toLowerCase();
    // console.log('开启');
    // if (method === 'options') {
    //   console.log(111);
    //   this.setCorsHeader();
    //   this.end();
    //   return;
    // }
    // this.setCorsHeader();
  }

  // setCorsHeader() {
  //   this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
  //   this.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with');
  //   this.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  //   this.header('Access-Control-Allow-Credentials', 'true');
  // }
};

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios  from 'axios'

axios.defaults.baseURL=" http://127.0.0.1:8360"
Vue.prototype.$axios = axios

Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router: router,
  router,
  components: { App },
  template: '<App/>'
})

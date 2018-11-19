import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Win from 'electron-window-util'
const electron = require('electron');

let baseUrl = electron.remote.getGlobal('baseUrl');
Vue.use(Win, {
  baseUrl,
  freeWindowNum: '',
  baseWindowConfig: {
    // frame: false,
    transparent: false,
    bgColor:'#fff'
  },
  router,
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

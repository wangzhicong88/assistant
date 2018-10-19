// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//tost
import './components/toast/toast.css';
import Toast from './components/toast/index';
Vue.use(Toast);
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.appid = 'web';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
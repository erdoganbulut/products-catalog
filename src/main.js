// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Vuex
import Vuex from 'vuex';

// Vue Analytics
import VueAnalytics from 'vue-analytics';

// Vue resource
import VueResource from 'vue-resource';

// Vue Meta
import Meta from 'vue-meta';

// Bootstrap and bootstrap-vue
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Font-awesome
import 'font-awesome/css/font-awesome.css';

import App from './App';
import router from './router';

// Store
import VuexStore from './store';

// lodash
window.$lodash = require('lodash');

Vue.use(Vuex);

Vue.use(VueResource);

Vue.use(BootstrapVue);

Vue.use(Meta);

Vue.use(VueAnalytics, {
  id: 'UA-113556003-1'
});

Vue.config.productionTip = false;

const store = new Vuex.Store(VuexStore);

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

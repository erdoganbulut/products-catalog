// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// Vuex
import Vuex from 'vuex';

// Vue resource
import VueResource from 'vue-resource';

// Bootstrap and bootstrap-vue
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App';
import router from './router';

// Store
import VuexStore from './store';

Vue.use(Vuex);

Vue.use(VueResource);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const store = new Vuex.Store(VuexStore);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

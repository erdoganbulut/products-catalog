import Vue from 'vue';
import Router from 'vue-router';
import Start from '@/components/Start';
import Catalog from '@/components/Catalog';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/tr',
    },
    {
      path: '/:lang',
      name: 'Start',
      component: Start,
    },
    {
      path: '/:lang/catalog/:catalog',
      name: 'Catalog',
      component: Catalog,
    },
  ],
});

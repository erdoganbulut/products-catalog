import Vue from 'vue';
import Router from 'vue-router';
import Start from '@/components/Start';
import Catalog from '@/components/Catalog';
import Category from '@/components/Category';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartWithoutLang',
      component: Start,
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
    {
      path: '/:lang/catalog/:catalog/category/:category',
      name: 'Category',
      component: Category,
    },
  ],
});

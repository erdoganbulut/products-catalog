import Vue from 'vue';
import Router from 'vue-router';
import Start from '@/components/Start';
import Catalog from '@/components/Catalog';
import Category from '@/components/Category';
import Product from '@/components/Product';
import Login from '@/components/Login';
import User from '@/components/User';

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
      meta: {
        page: 'start',
      },
    },
    {
      path: '/:lang/catalog/:catalog',
      name: 'Catalog',
      component: Catalog,
      meta: {
        page: 'catalog',
      },
    },
    {
      path: '/:lang/catalog/:catalog/category/:category',
      name: 'Category',
      component: Category,
      meta: {
        page: 'category',
      },
    },
    {
      path: '/:lang/product/:productslug',
      name: 'Product',
      component: Product,
      meta: {
        page: 'product',
      },
    },
    {
      path: '/:lang/login',
      name: 'Login',
      component: Login,
      meta: {
        page: 'login',
      },
    },
    {
      path: '/:lang/user',
      name: 'User',
      component: User,
      meta: {
        page: 'user',
      },
    },
  ],
});

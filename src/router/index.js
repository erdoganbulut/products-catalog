import Vue from 'vue';
import Router from 'vue-router';
import Start from '@/components/Start';
import Catalog from '@/components/Catalog';
import Category from '@/components/Category';
import Product from '@/components/Product';
import Login from '@/components/Login';
import User from '@/components/User';
import ListAdd from '@/components/ListAdd';
import ListUpdate from '@/components/ListUpdate';
import About from '@/components/About';
import Contact from '@/components/Contact';

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
    {
      path: '/:lang/list/add',
      name: 'ListAdd',
      component: ListAdd,
      meta: {
        page: 'ListAdd',
      },
    },
    {
      path: '/:lang/list/update/:listindex',
      name: 'ListUpdate',
      component: ListUpdate,
      meta: {
        page: 'ListUpdate',
      },
    },
    {
      path: '/:lang/about',
      name: 'About',
      component: About,
      meta: {
        page: 'about',
      },
    },
    {
      path: '/:lang/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        page: 'contact',
      },
    },
  ],
});

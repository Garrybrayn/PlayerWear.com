import Vue from 'vue';
import Utilities from '../utilities';
import VueRouter from 'vue-router';
import HomePage from '../components/pages/HomePage.vue';
import ProductPage from '../components/pages/ProductPage.vue';
import CollectionPage from '../components/pages/CollectionPage.vue';
import BlankPage from '../components/pages/BlankPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/pages/:collectionHandle',
    name: 'BrandHome',
    component: HomePage,
  },
  {
    path: `/:collectionHandle(${Utilities.brands.join('|')}|all)`,
    name: 'BrandHome',
    component: HomePage,
  },
  {
    path: `/:collectionHandle(${Utilities.brands.join('|')}|all)/products`,
    name: 'Collection',
    component: CollectionPage,
  },
  {
    path: `/:collectionHandle(${Utilities.brands.join('|')}|all)/:tag`,
    name: 'TagInCollection',
    component: CollectionPage,
  },
  {
    path: `/:collectionHandle(${Utilities.brands.join('|')}|all)/products/:productHandle`,
    name: 'ProductInCollection',
    component: ProductPage,
  },
  {
    path: '*',
    name: 'Blank',
    component: BlankPage,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;

import Vue from 'vue';
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
    path: '/products/:productHandle',
    name: 'Product',
    component: ProductPage,
  },
  {
    path: '/collections/:collectionHandle/products/:productHandle',
    name: 'ProductInCollection',
    component: ProductPage,
  },
  {
    path: '/collections/:collectionHandle',
    name: 'Collection',
    component: CollectionPage,
  },
  {
    path: '/collections/:collectionHandle/:tag',
    name: 'TagInCollection',
    component: CollectionPage,
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

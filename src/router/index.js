import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductPage from '../components/pages/ProductPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/products/:productHandle',
    name: 'Product',
    component: ProductPage,
  },
  {
    path: '/collections/:collectionHandle/products/:productHandle',
    name: 'ProductInCollection',
    component: ProductPage,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

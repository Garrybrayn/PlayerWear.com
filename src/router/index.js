import Vue from 'vue';
import Utilities from '../utilities';
import VueRouter from 'vue-router';
import HomePage from '../components/pages/HomePage.vue';
import ProductPage from '../components/pages/ProductPage.vue';
import CollectionPage from '../components/pages/CollectionPage.vue';
import ShopifyPage from '../components/pages/ShopifyPage.vue';
import BlankPage from '../components/pages/BlankPage.vue';

Vue.use(VueRouter);

const routes = [

  // ===============
  // House Homepage
  // ===============
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },

  // =============================================
  // Brand Homepages
  // =============================================
  {
    path: `/:collectionHandle(${Utilities.allBrands.join('|')})`,
    redirect: {
      name: 'BrandHome'
    }
  },
  {
    path: `/pages/:collectionHandle(${Utilities.allBrands.join('|')})`,
    name: 'BrandHome',
    component: HomePage,
  },

  // =============================================
  // Collection Pages
  // =============================================
  {
    path: `/collections/:collectionHandle(${Utilities.allBrands.join('|')}|all)`,
    name: 'Collection',
    component: CollectionPage,
  },
  {
    path: `/collections/:collectionHandle(${Utilities.allBrands.join('|')}|all)/:tag`,
    name: 'TagInCollection',
    component: CollectionPage,
  },

  // =============================================
  // Product Pages
  // =============================================
  {
    path: `/products/:productHandle`,
    name: 'Product',
    component: ProductPage,
  },
  {
    path: `/collections/:collectionHandle(${Utilities.allBrands.join('|')}|all)/products/:productHandle`,
    alias: `/products/:productHandle`,
    name: 'ProductInCollection',
    component: ProductPage,
  },

  // =============================================
  // Shopify Pages
  // =============================================
  {
    path: `/pages/:pageHandle`,
    name: 'ShopifyPage',
    component: ShopifyPage,
  },

  // =============================================
  // Catchall
  // =============================================
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

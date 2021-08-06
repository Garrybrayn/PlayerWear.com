import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta'
import store from '../store';
import HomePage from '../components/pages/HomePage.vue';
import UpsellPage from '../components/pages/UpsellPage.vue';
import ProductPage from '../components/pages/ProductPage.vue';
import CollectionPage from '../components/pages/CollectionPage.vue';
import DesignsPage from '../components/pages/DesignsPage.vue';
import ShopifyPage from '../components/pages/ShopifyPage.vue';
import BlankPage from '../components/pages/BlankPage.vue';

Vue.use(VueRouter);
Vue.use(Meta);

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
    path: `/:collectionHandle(${store.getters['brands/allHandles'].join('|')})`,
    redirect: {
      name: 'BrandHome'
    }
  },
  {
    path: `/pages/:collectionHandle(${store.getters['brands/allHandles'].join('|')})`,
    name: 'BrandHome',
    component: HomePage,
  },

  // =============================================
  // Design Pages
  // =============================================
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)/designs`,
    name: 'Designs',
    component: DesignsPage,
  },

  // =============================================
  // Collection Pages
  // =============================================
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)`,
    name: 'Collection',
    component: CollectionPage,
  },
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)/:tag`,
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
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)/products/:productHandle`,
    alias: `/products/:productHandle`,
    name: 'ProductInCollection',
    component: ProductPage,
  },
  {
    path: `/products_preview`,
    name: 'ProductPreview',
    beforeEnter(to, from, next) {
      console.log(to, from);
      const link = document.querySelector('link[rel=canonical]');
      if(link && link.href){
        const productHandle = link.href.split('/').pop();
        return next({
          name: 'Product',
          params: { productHandle }
        })
      }
      next(false);
    }
  },

  // =============================================
  // Checkout & Upsell
  // =============================================
  {
    path: `/pages/pre-checkout`,
    name: 'PreCheckout',
    component: UpsellPage,
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
  // WEBAIM Testing Workaround
  // =============================================
  // {
  //   path: '/data/getpage*',
  //   name: 'WebAimWave',
  //   component: BlankPage,
  //   beforeEnter(to, from, next) {
  //     console.log(to, from);
  //     const bases = document.getElementsByTagName('base')
  //     if(bases.length > 0){
  //       const href = bases[0].href;
  //       const url = new URL(href);
  //       const path = url.pathname;
  //       console.log({
  //         href, url, path
  //       })
  //       next(path)
  //     }
  //     next();
  //   }
  // },

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
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
});

export default router;

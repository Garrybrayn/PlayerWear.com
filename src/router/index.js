import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta'
import store from '../store';
import HomePage from '../components/pages/HomePage.vue';
import ContactPage from '../components/pages/ContactPage.vue';
import UpsellPage from '../components/pages/UpsellPage.vue';
import ProductPage from '../components/pages/ProductPage.vue';
import CollectionPage from '../components/pages/CollectionPage.vue';
import DesignsPage from '../components/pages/DesignsPage.vue';
import ShopifyPage from '../components/pages/ShopifyPage.vue';
import MissingPage from '../components/pages/MissingPage.vue';
import CheckoutOptionsPage from '../components/pages/CheckoutOptionsPage.vue';
import AccountProfilePage from '../components/pages/AccountProfilePage.vue';
import AccountSignInPage from '../components/pages/AccountSignInPage.vue';
import AccountRegisterPage from "@/components/pages/AccountRegisterPage";
import AccountPasswordResetPage from "@/components/pages/AccountPasswordResetPage";
import AccountInvalidTokenPage from "@/components/pages/AccountInvalidTokenPage";

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
  {
    path: `/pages/contact`,
    name: 'Contact',
    component: ContactPage,
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
    meta: {
      bodyClass: 'offset-chat-button'
    }
  },
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)/products/:productHandle`,
    alias: `/products/:productHandle`,
    name: 'ProductInCollection',
    component: ProductPage,
    meta: {
      bodyClass: 'offset-chat-button'
    }
  },
  {
    path: `/products_preview`,
    name: 'ProductPreview',
    meta: {
      bodyClass: 'offset-chat-button'
    },
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
  // User Account Routes
  // =============================================
  {
    path: `/account/register`,
    name: 'AccountRegister',
    component: AccountRegisterPage,
  },
  {
    path: `/account/login`,
    name: 'AccountSignIn',
    component: AccountSignInPage,
  },
  {
    path: `/account/orders`,
    name: 'AccountOrders',
    component: MissingPage,
  },
  {
    path: `/account/profile`,
    name: 'AccountProfile',
    component: AccountProfilePage,
  },
  {
    path: `/account/reset/:customerId/:resetToken`,
    name: 'AccountPasswordReset',
    component: AccountPasswordResetPage,
  },
  {
    path: `/account/invalid_token`,
    name: 'AccountInvalidToken',
    component: AccountInvalidTokenPage,
  },

  // =============================================
  // Checkout & Upsell
  // =============================================
  {
    path: `/pages/checkout-options`,
    name: 'CheckoutOptions',
    component: CheckoutOptionsPage,
  },
  {
    path: `/pages/pre-checkout`,
    name: 'PreCheckout',
    component: UpsellPage,
    meta: {
      bodyClass: 'hide-chat-button'
    }
  },
  {
    path: `/cart`,
    name: 'Cart',
    component: UpsellPage,
    meta: {
      bodyClass: 'hide-chat-button'
    }
  },

  // =============================================
  // Shopify Pages
  // =============================================
  {
    path: `/pages/:pageHandle`,
    name: 'ShopifyPage',
    component: ShopifyPage,
    meta: {
      includeContentForLayout: true
    }
  },
  {
    path: `/pages/:pageHandle/:hash`,
    name: 'ShopifyPageWithHash',
    component: ShopifyPage,
    meta: {
      includeContentForLayout: true
    }
  },
  {
    path: `/challenge`,
    name: 'ChallengePage',
    component: ShopifyPage,
    meta: {
      includeContentForLayout: true
    }
  },

  // =============================================
  // Catchall
  // =============================================
  {
    path: '/oops',
    name: 'MissingPage',
    component: MissingPage
  },
  {
    path: '*',
    name: 'CatchAll',
    component: MissingPage
  },
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

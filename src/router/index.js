import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [

  // ===============
  // House Homepage
  // ===============
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/pages/HomePage.vue'),
  },
  {
    path: `/pages/contact`,
    name: 'Contact',
    component: () => import('../components/pages/ContactPage.vue'),
  },
  {
    path: `/accessibility`,
    name: 'Accessibility',
    component: () => import('../components/pages/AccessibilityContactPage.vue'),
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
    component: () => import('../components/pages/HomePage.vue'),
  },

  // =============================================
  // Roles Pages
  // =============================================
  {
    path: `/shop-by-role`,
    name: 'Roles',
    component: () => import('../components/pages/RolesPage.vue'),
  },
  {
    path: `/shop-by-role/:tag(${store.getters['roles/roleTags'].join('|')})`,
    name: 'ShopByRole',
    component: () => import('../components/pages/CollectionPage.vue'),
  },

  // =============================================
  // Design Pages
  // =============================================
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)/designs`,
    name: 'Designs',
    component: () => import('../components/pages/DesignsPage.vue'),
  },

  // =============================================
  // Collection Pages
  // =============================================
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)`,
    name: 'Collection',
    component: () => import('../components/pages/CollectionPage.vue'),
  },
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)/:tag`,
    name: 'TagInCollection',
    component: () => import('../components/pages/CollectionPage.vue'),
  },

  // =============================================
  // Product Pages
  // =============================================
  {
    path: `/products/:productHandle`,
    name: 'Product',
    component: () => import('../components/pages/ProductPage.vue'),
    meta: {
      bodyClass: 'offset-chat-button'
    }
  },
  {
    path: `/collections/:collectionHandle(${store.getters['brands/allHandles'].join('|')}|all)/products/:productHandle`,
    alias: `/products/:productHandle`,
    name: 'ProductInCollection',
    component: () => import('../components/pages/ProductPage.vue'),
    meta: {
      bodyClass: 'offset-chat-button'
    }
  },

  // =============================================
  // User Account Routes
  // =============================================
  {
    path: `/account/register`,
    name: 'AccountRegister',
    component: () => import('../components/pages/AccountRegisterPage.vue'),
  },
  {
    path: `/account/login`,
    name: 'AccountSignIn',
    component: () => import('../components/pages/AccountSignInPage.vue'),
  },
  {
    path: `/account/orders`,
    name: 'AccountOrders',
    component: () => import('../components/pages/MissingPage.vue'),
  },
  {
    path: `/account/profile`,
    name: 'AccountProfile',
    component: () => import('../components/pages/AccountProfilePage.vue'),
  },
  {
    path: `/account/reset/:customerId/:resetToken`,
    name: 'AccountPasswordReset',
    component: () => import('../components/pages/AccountPasswordResetPage.vue'),
  },
  {
    path: `/account/invalid_token`,
    name: 'AccountInvalidToken',
    component: () => import('../components/pages/AccountInvalidTokenPage.vue'),
  },

  // =============================================
  // Checkout & Upsell
  // =============================================
  {
    path: `/pages/checkout-options`,
    name: 'CheckoutOptions',
    component: () => import('../components/pages/CheckoutOptionsPage.vue'),
  },
  {
    path: `/pages/pre-checkout`,
    name: 'PreCheckout',
    component: () => import('../components/pages/UpsellPage.vue'),
    meta: {
      bodyClass: 'hide-chat-button'
    }
  },
  {
    path: `/cart`,
    name: 'Cart',
    component: () => import('../components/pages/UpsellPage.vue'),
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
    component: () => import('../components/pages/ShopifyPage.vue'),
    meta: {
      includeContentForLayout: true
    }
  },
  {
    path: `/pages/:pageHandle/:hash`,
    name: 'ShopifyPageWithHash',
    component: () => import('../components/pages/ShopifyPage.vue'),
    meta: {
      includeContentForLayout: true
    }
  },
  {
    path: `/challenge`,
    name: 'ChallengePage',
    component: () => import('../components/pages/ShopifyPage.vue'),
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
    component: () => import('../components/pages/MissingPage.vue'),
  },
  {
    path: '*',
    name: 'CatchAll',
    component: () => import('../components/pages/MissingPage.vue'),
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

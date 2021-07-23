import Vue from 'vue';
import Vuex from 'vuex';
import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'amplify-11-swag-store.myshopify.com',
  storefrontAccessToken: 'f35597e9be904bdf41c5f01b11c8e4a1'
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    getProductByHandle: (context, handle) => client.product.fetchByHandle(handle)
  },
  modules: {
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
import cart from '@/store/cart';
import pages from '@/store/pages';
import brands from '@/store/brands';
import customers from '@/store/customers';
import products from '@/store/products';
import roles from '@/store/roles';

Vue.use(Vuex);

const modules = {
  brands,
  products,
  customers,
  roles,
  cart,
  pages
};


export const createStore = function() {

  const storeSettings = {};

  if(process.client){
    const vuexLocal = new VuexPersistence({
      storage: window.localStorage,
      modules: ['customers','cart'],
      reducer: (state) => ({
        customers: {
          email: state.customers.email,
          geolocation: state.customers.geolocation,
          emailHasAccount: state.customers.emailHasAccount,
          customerAccessToken: state.customers.customerAccessToken
        },
        cart: {
          checkoutId: state.cart.checkoutId
        }
      })
    })
    storeSettings.plugins = [vuexLocal.plugin];
  }
  const store = new Vuex.Store(storeSettings)

  Object.keys(modules).forEach(moduleName => {
    const module = modules[moduleName];
    store.registerModule(moduleName, {
      namespaced: true,
      state: module.state,
      mutations: module.mutations,
      actions: module.actions,
      getters: module.getters
    })
  })
  return store;

}

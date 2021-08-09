import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
import cart from './cart';
import brands from './brands';
import products from './products';
import pages from './pages';
import customers from './customers';
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['customers']
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    cart,
    brands,
    products,
    pages,
    customers
  }
});

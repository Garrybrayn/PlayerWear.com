import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
import cart from './cart';
import brands from './brands';
import products from './products';
import pages from './pages';
import users from './users';
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['users']
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    cart,
    brands,
    products,
    pages,
    users
  }
});

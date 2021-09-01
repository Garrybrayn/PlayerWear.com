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

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    cart,
    brands,
    products,
    pages,
    customers
  }
});



export default store



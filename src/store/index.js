import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
import cart from '@/store/cart';
import brands from '@/store/brands';
import products from '@/store/products';
import pages from '@/store/pages';
import customers from '@/store/customers';
import roles from "@/store/roles";
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
    customers,
    roles
  }
});



export default store



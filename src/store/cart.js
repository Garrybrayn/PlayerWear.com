import Vue from 'vue';

import axios from 'axios';
import Utilities from '../utilities';
import {
  normalizeShopifyCart,
  normalizeShopifyProduct
} from './normalizeShopify';

let state;
const tes = true;

if(tes){
  state = {
      items: {

      },
      note: null
    };
}else{
  state = {"note":null,"items":{"40594729304223":{"id":40594729304223,"title":"KORG \"On Repeat\" Ladies’ Muscle Tank","variant":"L","handle":"korg-on-repeat-ladies-muscle-tank-black","vendor":"Korg","options_with_values":[{"name":"Size","value":"L"}],"image":"https://cdn.shopify.com/s/files/1/0568/7957/9295/products/womens-muscle-tank-black-heather-front-60f5cdb270944.jpg?v=1626721719","price":2500,"quantity":5},"40237432995999":{"id":40237432995999,"image":"https://cdn.shopify.com/s/files/1/0568/7957/9295/products/iphone-case-iphone-7-plus-8-plus-case-on-phone-60c3c5d753813.jpg?v=1623442940","title":"KORG \"Logo\" iPhone Case","variant":"iPhone 7 Plus/8 Plus","price":1550,"handle":"iphone-case","vendor":"Korg","quantity":1,"options_with_values":[{"name":"Size","value":"iPhone 7 Plus/8 Plus"}]}}}
}
export default {
  namespaced: true,
  state: {
    shoppingCart: state,
    isInitialized: false,
    isFetching: false,
    isOpen: false,
    shippingThreshold: 50000
  },
  mutations: {
    initCart(state, payload) {
      state.shoppingCart = payload;
      state.isInitialized = true;
    },
    updateCartItem(state, payload) {
      const { id, quantity } = payload;
      Vue.set(state.shoppingCart.items[id],'quantity', quantity);
      if (quantity < 1) {
        Vue.delete(state.shoppingCart.items, id)
      }
      return state;
    },
    addCartItem(state, payload) {
      Vue.set(state.shoppingCart, 'items', {
        ...state.shoppingCart.items,
        ...payload
      })
      return state;
    },
    toggleCart(state, payload) {
      Vue.set(state,'isOpen', payload === 'open')
      return state;
    },
    toggleFetching(state) {
      state.isFetching = !state.isFetching;
      Vue.set(state,'isFetching', !state.isFetching)
      return state;
    }
  },
  actions: {
    initialize: ({ commit, state }) => new Promise((resolve, reject) => {
      if(state.isInitialized) {
        resolve()
      }else{
        axios
          .get('/cart.js')
          .then(response => {
            commit('initCart', normalizeShopifyCart(response.data));
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      }
    }),
    updateItem: ({ commit, state }, payload) => {
      if (state.isFetching) {
        return;
      } else {
        commit('toggleFetching');
        const { item, action } = payload;
        const { id, quantity } = item;
        const newQty =
          action === 'increase'
            ? quantity + 1
            : action === 'decrease'
            ? quantity - 1
            : 0;
        axios
          .post('/cart/change.js', {
            id: id.toString(),
            quantity: newQty.toString()
          })
          .then(() => {
            commit('updateCartItem', {
              id,
              quantity: newQty
            });
            commit('toggleFetching');
          })
          .catch(error => {
            commit('toggleFetching');
            return error.message;
          });
      }
    },
    addItem: ({ commit, state }, payload) => {
      if (state.isFetching) {
        return;
      } else {
        commit('toggleFetching');
        axios
          .post('/cart/add.js', payload)
          .then(response => {
            commit(
              'addCartItem',
              normalizeShopifyProduct(response.data)
            );
            commit('toggleFetching');
            commit('toggleCart', 'open');
          })
          .catch(error => {
            commit('toggleFetching');
            return error.message;
          });
      }
    },
    loadUpsellProducts: context => new Promise((resolve, reject) => {
      context
        .dispatch('initialize')
        .then(() => {
          const promises = context.getters.vendorsInCart.map(
            vendor => context.dispatch(
              'loadProductsByTagAndVendor',
              { first: 10, tag: 'upsell', vendor },
              { root: true }
            )
          );
          Promise.all(promises)
            .then(() => { resolve(); })
            .catch(e => { reject(e) })
      })
    })
  },
  getters: {
    isOpen: state => state.isOpen,
    shoppingCart: state => state.shoppingCart,
    shippingThreshold: state => state.shippingThreshold,
    items: state => Object.values(state.shoppingCart.items),
    uniqueItemCount: (state, getters) => getters.items.length,
    itemCount: (state, getters) => {
      let count = 0;
      getters.items.forEach(item => count += item.quantity)
      return count;
    },
    vendorsInCart: (state, getters) => [...new Set(getters.items.map(item => item.vendor))],
    subtotal: state => {
      const items = state.shoppingCart.items;
      let total = 0;
      if (items) {
        Object.keys(items).forEach(key => {
          total += items[key].price * items[key].quantity;
        });
      }
      return total;
    },
    total: (state, getters) => getters.subtotal + 400,
    upsellProducts: (state, getters, another, rootGetters) => limit => {
      let products = [];
      getters.vendorsInCart.forEach(vendor => {
        products = products.concat(rootGetters.productsByTagAndVendor('upsell', vendor, limit || 3))
      });
      products = products.filter(product => {
        const hasOneVariant = product.variants.length === 1;
        const variantIsAvailable = product.variants[0].availableForSale
        return hasOneVariant && variantIsAvailable
      })
      return Utilities.arrayShuffle(products).slice(0, limit || 3);
    }
  },
}

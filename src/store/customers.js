import Vue from 'vue';
import axios from 'axios';
import client from './ShopifyGraphqlClient';

export default {
  namespaced: true,
  state: {
    geolocation: null,
    email: null,
    emailHasAccount: false,
    customer: null,
    customerAccessToken: null
  },
  mutations: {
    SET_GEOLOCATION(state, geolocation){
      Vue.set(state, 'geolocation', geolocation)
    },
    SET_EMAIL(state, email){
      if(state.email !== email){
        Vue.set(state, 'emailHasAccount', false);
      }
      Vue.set(state, 'email', email)
    },
    SET_EMAIL_HAS_ACCOUNT(state, value){
      Vue.set(state, 'emailHasAccount', value)
    },
    SET_CUSTOMER(state, customer){
      Vue.set(state, 'customer', customer)
      Vue.set(state, 'emailHasAccount', true)
    },
    SET_CUSTOMER_ACCESS_TOKEN(state, customerAccessToken){
      Vue.set(state, 'customerAccessToken', customerAccessToken)
      Vue.set(state, 'emailHasAccount', true)
    },
    UNSET_CUSTOMER(state){
      Vue.set(state, 'customer', null)
      Vue.set(state, 'customerAccessToken', null)
      Vue.set(state, 'emailHasAccount', false)
    }
  },
  actions: {
    getGeoLocation: (context) => new Promise((resolve, reject) => {
      if(context.state.geolocation){
        resolve(context.state.geolocation);
      }else{
        axios
          .get('https://ipgeolocation.abstractapi.com/v1/?api_key=1d2b9308f8d24df5a368ca1c69591491&fields=country_code')
          .then(geolocation => {
            if(geolocation && geolocation.data){
              context.commit('SET_GEOLOCATION', geolocation.data);
            }
          })
          .catch(e => { reject(e) })
      }
    }),
    create: (context, customer) => new Promise((resolve, reject) => {
      if(context.state.emailHasAccount){
        // This email already has an account.
        return reject(new Error('TAKEN'));
      }
      if(!customer.password){
        // Create a random 20-character, alphanumeric password
        customer.password = Array.from({ length : 20 }, () => Math.random().toString(36)[2]).join('');
      }
      client.customer
        .create(customer)
        .then(results => {
          if(results.customer){
            context.dispatch('signin', customer).then(resolve).catch(reject)
          }else if(results.customerUserErrors){
            console.log(results.customerUserErrors);
            const errorMessage = results.customerUserErrors[0].message;
            if (errorMessage.includes('TAKEN') || errorMessage.includes('CUSTOMER_DISABLED')) {
              context.commit('SET_EMAIL_HAS_ACCOUNT', true)
            }
            reject(results.customerUserErrors[0])
          }
        })
        .catch(e => {
          if (e.message.includes('TAKEN') || e.message.includes('CUSTOMER_DISABLED')) {
            context.commit('SET_EMAIL_HAS_ACCOUNT', true)
          }
          reject(e)
        })
    }),
    signin: (context, credentials) => new Promise((resolve, reject) => {
      console.log(credentials, client, client.customer);
      client.customer
        .createAccessToken({email: credentials.email, password: credentials.password})
        .then(results => {
          if(results.customerAccessToken){
            context.dispatch('setEmail', credentials.email)
            context.commit('SET_CUSTOMER_ACCESS_TOKEN', results.customerAccessToken)
            context.commit('SET_EMAIL_HAS_ACCOUNT', true)
            context.dispatch('fetch').then(resolve).catch(reject)
          }else if(results.customerUserErrors){
            reject(results.customerUserErrors[0])
          }
        })
        .catch(e => reject(e))
    }),
    signOut: (context) => new Promise(resolve => {
      if(context.state.customerAccessToken && context.state.customerAccessToken.accessToken){
        client.customer.deleteAccessToken(context.state.customerAccessToken.accessToken)
      }
      context.commit('UNSET_CUSTOMER');
      resolve();
    }),
    fetch: context => new Promise((resolve, reject) => {
      if(context.state.customerAccessToken && context.state.customerAccessToken.accessToken){
        client.customer
          .fetch(context.state.customerAccessToken.accessToken)
          .then(results => {
            if(results && results.id){
              context.commit('SET_CUSTOMER', results);
              resolve(results);
            }else{
              reject('Customer could not be fetched. Unknown Error')
            }
          })
          .catch(reject)
      }else{
        reject('Customer could not be fetched. There is no access token.')
      }
    }),
    sendForgotPasswordEmail: context => client.customer.recover(context.state.email),
    reset: (context, data) => new Promise((resolve, reject) =>{
      client.customer
        .reset(btoa(`gid://shopify/Customer/${data.id}`), data.input)
        .then(results => {
          if(results.customerAccessToken){
            context.commit('SET_CUSTOMER_ACCESS_TOKEN', results.customerAccessToken)
            context.dispatch('fetch').then(resolve).catch(reject)
          }else{
            console.error('Unknown error', results);
            reject('Unknown error')
          }
        })
        .catch(e => {
          reject(e)
        })
    }),
    setEmail: (context, email) => {
      context.commit('SET_EMAIL', email)
      return context.dispatch('cart/updateEmail', email, {root: true})
    }
  },
  getters: {
    isSignedIn: state => state.customer && state.customer.id,
    isWithinShippingZone: state => state.geolocation && state.geolocation.country_code && state.geolocation.country_code === 'US',
    isOutsideShippingZone: (state, getters) => !getters.isWithinShippingZone,
    hasValidEmail: state => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return state.email && re.test(String(state.email).toLowerCase());
    }
  }
}

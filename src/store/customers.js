import Vue from 'vue';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    geolocation: null,
    email: null
  },
  mutations: {
    SET_GEOLOCATION(state, geolocation){
      Vue.set(state, 'geolocation', geolocation)
    },
    SET_EMAIL(state, email){
      console.log('setting email', email)
      Vue.set(state, 'email', email)
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
            console.log(geolocation);
            if(geolocation && geolocation.data){
              context.commit('SET_GEOLOCATION', geolocation.data);
            }
          })
          .catch(e => { reject(e) })
      }
    }),
    create: () => {
      // create an account with email and a random password
      // return result whether account already exists or was successfully created
      // include checkbox for accepting marketing materials
      //   const accountCreationData = `${formElement.serialize()}&customer[password]=${newRandomPassword}`;
      //
      //   jQuery
      //     .post('/account', accountCreationData)
      //     .done(data => {
      //
      //       const logErrors = String(jQuery(data).find('.errors').text());
      //
      //       if (logErrors != "" && logErrors != 'undefined') {
      //         if(logErrors.includes('reset')){
      //           // The user already has an account.
      //           // Let them choose the checkout style
      //           document.location.href = '/pages/choose-checkout';
      //         }else{
      //           formElement.find('.errors').show().html(logErrors)
      //         }
      //       } else {
      //         // A new user was created.
      //         // Begin the checkout process.
      //         document.location.href = '/pages/pre-checkout';
      //       }
      //     })
      //     .fail(function () {
      //       console.log('error');
      //     });
      //   return false;
      // });
    },
  },
  getters: {
    isWithinShippingZone: state => state.geolocation && state.geolocation.country_code && state.geolocation.country_code === 'US',
    isOutsideShippingZone: (state, getters) => !getters.isWithinShippingZone,
    hasValidEmail: state => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return state.email && re.test(String(state.email).toLowerCase());
    }
  }
}

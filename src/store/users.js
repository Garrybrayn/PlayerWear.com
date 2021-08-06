import Vue from 'vue';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    geolocation: null
  },
  mutations: {
    SET_GEOLOCATION(state, geolocation){
      Vue.set(state, 'geolocation', geolocation)
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
    })
  },
  getters: {
    isWithinShippingZone: state => state.geolocation && state.geolocation.country_code && state.geolocation.country_code === 'US',
    isOutsideShippingZone: (state, getters) => !getters.isWithinShippingZone
  }
}

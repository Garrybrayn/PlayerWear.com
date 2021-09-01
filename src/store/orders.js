import Vue from 'vue';
import { GraphQLClient, gql } from 'graphql-request'

const graphQLClient = new GraphQLClient(
  'amplify-11-swag-store.myshopify.com',
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'f35597e9be904bdf41c5f01b11c8e4a1'
    },
  }
)



export default {
  namespaced: true,
  state: {
    orders: null
  },
  mutations: {
    SET_ORDER(state, order){
      Vue.set(state.order, order.id, order)
    }
  },
  actions: {
    fetchAll: () => new Promise((resolve, reject) => {
      graphQLClient.request(gql`{
          customer(customerAccessToken: "cb915f48c4d4b46ec2bf9949488120e2") {
            orders(first:10) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }`)
        .then(response => {
          console.log(response)
          resolve();
        })
        .catch(e => {
          console.error(e)
          reject()
        })
    }),
  },
  getters: {

  }
}

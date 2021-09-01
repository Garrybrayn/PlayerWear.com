import Client from './shopify-buy/index.es.js'

// Initializing a client to return content in the store's primary language
export default Client.buildClient({
  domain: 'amplify-11-swag-store.myshopify.com',
  storefrontAccessToken: 'f35597e9be904bdf41c5f01b11c8e4a1'
});

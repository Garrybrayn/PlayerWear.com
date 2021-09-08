import Client from './shopify-buy/index.unoptimized.umd'

// Initializing a client to return content in the store's primary language
export default Client.buildClient({
  domain: 'amplify-11-swag-store.myshopify.com',
  storefrontAccessToken: 'f35597e9be904bdf41c5f01b11c8e4a1'
});

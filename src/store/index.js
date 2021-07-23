import Vue from 'vue';
import Vuex from 'vuex';
import Client from 'shopify-buy/index.unoptimized.umd';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'amplify-11-swag-store.myshopify.com',
  storefrontAccessToken: 'f35597e9be904bdf41c5f01b11c8e4a1'
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: { },
  },
  mutations: {
    ADD_PRODUCT(state, product){
      state.products[product.handle] = product;
    }
  },
  actions: {
    getProductByHandle: (context, handle) => new Promise((resolve, reject) => {
      if(context.state.products[handle]){
        resolve(context.state.products[handle])
      }else{
        client.product.fetchByHandle(handle)
          .then(product => {

            const productsQuery = client.graphQLClient.query((root) => {
              root.addConnection('products', {args: {first: 10, query: `title:${product.title}`}}, (product) => {
                product.add('title');
                product.add('handle');
                product.addConnection('metafields', {args: {first: 1}}, (metafield) => {
                  metafield.add('namespace')
                  metafield.add('key')
                  metafield.add('value')
                });
                product.add("images", {
                  args: {
                    first: 250
                  }
                }, function (images) {
                  images.add("pageInfo", function (pageInfo) {
                    pageInfo.add("hasNextPage");
                    pageInfo.add("hasPreviousPage");
                  });
                  images.add("edges", function (edges) {
                    edges.add("cursor");
                    edges.add("node", function (node) {
                      node.add("id");
                      node.add("src");
                      node.add("altText");
                    });
                  });
                });
              });
            });
            // Call the send method with the custom products query
            client.graphQLClient.send(productsQuery).then(({model}) => {
              // Do something with the products
              const colors = model.products.map(product => {
                const colorField = product.metafields.find(metafield => metafield.namespace === 'extras' && metafield.key === 'color');
                return {
                  label: colorField.value,
                  handle: product.handle,
                  image: product.images[0].src
                }
              });
              product.colors = colors;
              context.commit('ADD_PRODUCT', product)
              resolve(product);
            }).catch(e => {
              reject(e)
            })

          })
          .catch(e => {
            reject(e);
          })
      }
    })
  },
  modules: {
  },
});

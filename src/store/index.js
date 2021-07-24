import Vue from 'vue';
import Vuex from 'vuex';
import Client from 'shopify-buy-with-tags/index.unoptimized.umd';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'amplify-11-swag-store.myshopify.com',
  storefrontAccessToken: 'f35597e9be904bdf41c5f01b11c8e4a1'
});

Vue.use(Vuex);

function graphProductDetails(product){
  product.add('title');
  product.add('handle');
  product.add('vendor');
  product.add('descriptionHtml');
  product.add('options', (opts) => {
    opts.add('name')
  })
  product.add('tags');

  product.addConnection('metafields', {args: {first: 5}}, (metafield) => {
    metafield.add('key')
    metafield.add('value')
  });
  product.addConnection(
    "variants",
    { args: { first: 99 } },
    (variant) => {
      variant.add("id");
      variant.add("price");
      variant.add("availableForSale");
      variant.add('selectedOptions', (opts) => {
        opts.add('name')
        opts.add('value')
      })
    }
  );
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
}

export default new Vuex.Store({
  state: {
    products: { },
    colorOptions: { },
  },
  mutations: {
    SET_PRODUCT(state, product){
      Vue.set(state.products, product.handle, product);
    },
    SET_COLOR_OPTIONS(state, product){
      Vue.set(state.colorOptions, product.handle, product.colors);
    }
  },
  actions: {
    loadAllProducts: context => {
      return client.product.fetchAll().then(products => {
        products.forEach(product => context.commit('ADD_PRODUCT', product))
      })
    },
    loadCollectionWithProducts(context, collectionHandle){
      const query = client.graphQLClient.query((root) => {
        root.addConnection('collections', {args:{ first: 1, query: `title:${collectionHandle}` }}, collection => {
          collection.add('title');
          collection.add('handle');
          collection.addConnection('products', {args: { first: 99}}, product => {
            graphProductDetails(product)
          });
        });
      });
      // Call the send method with the custom products query
      client.graphQLClient.send(query).then(({model}) => {
        // Do something with the products
        model.collections.forEach(collection => {
          collection.products.forEach(product => {
            context.commit('SET_PRODUCT', product)
          })
        })
      });
    },
    loadProduct: (context, handle) => new Promise((resolve, reject) => {
      if(context.state.products[handle]){
        resolve()
      }else{
        const query = client.graphQLClient.query((root) => {
          root.addConnection('products', {args:{ first: 1, query: handle }}, product => {
            graphProductDetails(product)
          });
        });
        // Call the send method with the custom products query
        client.graphQLClient.send(query).then(({model}) => {
          // Do something with the products
          model.products.forEach(product => {
            context.commit('SET_PRODUCT', product)
          })
          resolve();
        }).catch(e => {
          reject(e)
        })
      }
    }),
    loadProductColorOptions: (context, handle) => new Promise((resolve, reject) => {
      if(context.state.colorOptions[handle]){
        resolve()
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
                    first: 1
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
              if(model.products.length > 1){
                const colors = model.products.map(product => {
                  const colorField = product.metafields.find(metafield => metafield.namespace === 'extras' && metafield.key === 'color');
                  if(colorField){
                    return {
                      label: colorField.value,
                      handle: product.handle,
                      image: product.images[0].src
                    }
                  }
                  return null;
                });
                context.commit('SET_COLOR_OPTIONS', {
                  handle,
                  colors
                })
              }
              resolve();
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
  getters: {
    products: state => {
      return Object.values(state.products)
    }
  },
});

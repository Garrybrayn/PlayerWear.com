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

  product.addConnection('metafields', {args: {first: 10}}, (metafield) => {
    metafield.add('namespace')
    metafield.add('key')
    metafield.add('value')
  });
}

export default new Vuex.Store({
  state: {
    collections: { },
    products: { },
    colorOptions: { },
  },
  mutations: {
    SET_COLLECTION(state, collection){
      Vue.set(state.collections, collection.handle, {
        title: collection.title,
        handle: collection.handle,
        id: collection.id
      });
    },
    SET_PRODUCT(state, product){
      Vue.set(state.products, product.handle, product);
    },
    SET_COLOR_OPTIONS(state, product){
      Vue.set(state.colorOptions, product.handle, product.colors);
    }
  },
  actions: {
    loadAllProducts: context => {
      return client.product.fetchAll(100).then(products => {
        products.forEach(product => context.commit('SET_PRODUCT', product))
      })
    },
    loadProductsByQuery: (context, query) => new Promise((resolve, reject) => {
      const productsQuery = client.graphQLClient.query(root => {
        root.addConnection('products', {args: query}, (product) => {
          graphProductDetails(product)
        })
      })
      client.graphQLClient.send(productsQuery).then(({ model }) => {
        model.products.forEach(product => {
          context.commit('SET_PRODUCT', product)
          resolve(product);
        })
        resolve();
      }).catch(e => {
        reject(e);
      });
    }),
    loadProductsByTagAndVendor: (context, config) => {
      let query = `tag:${config.tag}`;
      if(config.vendor){
        query += ` AND vendor:${config.vendor}`
      }
      return context.dispatch('loadProductsByQuery', { first: config.first || 10, query })
    },
    loadCollectionWithProducts:(context, collectionHandle) => new Promise((resolve, reject) => {
      if(collectionHandle === 'all'){
        return context.dispatch('loadAllProducts')
      }
      if(context.state.collections[collectionHandle]){
        resolve()
      }else{
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
            context.commit('SET_COLLECTION', collection);
            console.log(collection);
            collection.products.forEach(product => {
              context.commit('SET_PRODUCT', product)
            })
          })
          resolve();
        }).catch(e => {
          reject(e)
        })
      }
    }),
    loadProduct: (context, handle) => new Promise((resolve, reject) => {
      if(context.state.products[handle]){
        resolve(context.state.products[handle])
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
            resolve(product);
          })
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
                product.addConnection('metafields', {args: {first: 10}}, (metafield) => {
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
                const colors = [];
                model.products.forEach(product => {
                  const colorField = product.metafields.find(metafield => metafield.namespace === 'extras' && metafield.key === 'color');
                  if(colorField){
                    colors.push({
                      label: colorField.value,
                      handle: product.handle,
                      image: product.images[0].src
                    });
                  }
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
    },
    relatedProducts: (state, getters) => (handle, count) => {
      let relatedProducts = [];

      // This is the main product
      const product = state.products[handle];

      if(product){
        // Find products with identically matching titles
        relatedProducts = getters.products.filter(
          relatedProduct => (
            relatedProduct.handle !== product.handle &&
            relatedProduct.title === product.title
          )
        );

        if(relatedProducts.length < count){
          // Add more from the same vendor
          for(let i=0; i<getters.products.length; i++){
            const relatedProduct = getters.products[i];
            if(relatedProduct.handle !== product.handle && relatedProduct.vendor === product.vendor){
              // matches the vendor
              const alreadyFoundRelatedProduct = relatedProducts.find(
                existingRelatedProduct => existingRelatedProduct.handle === relatedProduct.handle
              );
              if(!alreadyFoundRelatedProduct){
                relatedProducts.push(relatedProduct);
              }
            }
            if(relatedProducts.length >= count){
              break
            }
          }
        }
      }
      return relatedProducts;
    },
    productsByTagAndVendor: (state, getters) => (tag, vendor) => {
      console.log({
        tag, vendor
      })
      return getters.products.filter(product => {
        const foundTag = product.tags.find(productTag => productTag.value.toLowerCase() === tag.toLowerCase());
        const foundVendor = vendor ? product.vendor.toLowerCase() === vendor.toLowerCase() : true;
        console.log({
          foundTag,
          foundVendor
        })
        return foundTag && foundVendor;
      })
    }
  }
});

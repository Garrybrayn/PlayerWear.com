import Vue from 'vue';
import Vuex from 'vuex';
import client from './ShopifyGraphqlClient';

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
    { args: { first: 15 } },
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
      first: 15
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

  product.addConnection('metafields', {args: {first: 5}}, (metafield) => {
    metafield.add('namespace')
    metafield.add('key')
    metafield.add('value')
  });
}

export default {
  state: {
    cachedQueries: { },
    products: { },
    productCount: 0,
    colorOptions: { },
    sortKey: 'BEST_SELLING',
    resultsPerPage: 6,
    sortReverse: true,
    loading: false
  },
  mutations: {
    SET_CACHED_QUERY(state, payload){
      Vue.set(state.cachedQueries, payload.key, payload.fetchNextPage)
    },
    BULK_SET(state, products){
      products.forEach(product => {
        const productIsNew = !(product.handle in state.products);
        product.soldOut = product.variants.every(variant => variant.availableForSale === false);
        if(productIsNew){
          // ONLY APPLY AN ORDER IF PRODUCT
          // IS NEWLY ADDED
          product.order = product.soldOut ? Infinity : state.productCount;
          state.productCount++;
        }else{
          // KEEP THE ORDER THE SAME AS BEFORE
          product.order = state.products[product.handle].order
        }
        Vue.set(state.products, product.handle, product)
      })
    },
    SET_COLOR_OPTIONS(state, product){
      Vue.set(state.colorOptions, product.handle, product.colors);
    },
    SET_LOADING(state, loading){
      Vue.set(state, 'loading', loading);
    }
  },
  actions: {
    handleProductsResponse: async (context, payload) => {
      let fetchNextPage;

      // GET THE ARRAY OF PRODUCTS
      let products;
      if(Array.isArray(payload)){
        products = payload
      }else if(Array.isArray(payload.response.model)){
        products = payload.response.model;
      }else if(Array.isArray(payload.response.model.products)){
        products = payload.response.model.products;
      }

      // FILTER PRODUCTS TO ENSURE ENTRIES ARE REAL PRODUCTS
      products = products.filter(product => product.type.name === 'Product');


      if(products && products.length > 0){

        // BULK SET PRODUCTS TO STATE
        context.commit('BULK_SET', products)

        // HANDLE PAGINATION
        const hasNextPage = payload.response.data.products.pageInfo.hasNextPage;
        const lastProduct = products[products.length - 1]

        if(hasNextPage && lastProduct && 'nextPageQueryAndPath' in lastProduct){

          // THERE ARE MORE PAGES TO LOAD
          // CREATE A FUNCTION TO LOAD THE NEXT PAGE
          fetchNextPage = async function(){
            context.commit('SET_LOADING', true);
            const response = await client.fetchNextPage(lastProduct);

            return await context.dispatch('handleProductsResponse', {
              response,
              autoFetchNextPage: payload.autoFetchNextPage,
              cacheKey: payload.cacheKey
            });
          }

          if(payload.autoFetchNextPage){
            // AUTOMATICALLY LOAD THE NEXT PAGE
            fetchNextPage();
          }else{
            context.commit('SET_LOADING', false);
          }
        }else{
          context.commit('SET_LOADING', false);
        }
      }

      // RETURN EITHER A FUNCTION TO FETCH NEXT PAGE
      // OR FALSE IF THERE IS NO NEXT PAGE
      const result = fetchNextPage || false

      context.commit('SET_CACHED_QUERY', {
        key: payload.cacheKey,
        fetchNextPage: result
      })
      return result
    },

    graphQuery: async (context, query) => {

      // CONFIGURE SORTING
      query.sortKey = client.graphQLClient.enum(context.state.sortKey);
      query.reverse = context.state.sortReverse;

      // CONFIGURE PAGE AUTO LOADING
      const autoFetchNextPage = query.autoFetchNextPage;
      delete query.autoFetchNextPage;

      // CONFIGURE CACHING KEY
      const cacheKey = JSON.stringify(query);
      if(cacheKey in context.state.cachedQueries) {
        // It's begun loading, but may have a next page.
        if(typeof context.state.cachedQueries[cacheKey] === 'function'){
          // there's a next page for this.
          return await context.state.cachedQueries[cacheKey]
        }
      }else{
        context.commit('SET_LOADING', true);

        // EXECUTE THE QUERY
        const response = await client.graphQLClient.send(
          client.graphQLClient.query(root => {
            root.addConnection(
              'products',
              { args: query },
              product => graphProductDetails(product)
            )
          })
        );

        // HANDLE THE RESPONSE
        if(response && response.model && response.model.products){
          return await context.dispatch('handleProductsResponse', {
            response,
            autoFetchNextPage,
            cacheKey
          });
        }
      }
      return false;
    },

    load(context, config){
      const options = {};

      // CONFIGURE PAGING AND LIMITING
      if(config.limit){
        options.autoFetchNextPage = false;
        options.first = config.limit;
      }else{
        if(config.first){
          options.first = config.first;
        }else{
          options.first = context.state.resultsPerPage
        }
        if('autoFetchNextPage' in config){
          options.autoFetchNextPage = config.autoFetchNextPage;
        }else{
          options.autoFetchNextPage = false;
        }
      }

      // CONFIGURE THE QUERY
      const queryParts = [];

      if(config.vendor && config.vendor !== 'all'){
        queryParts.push(`vendor:${config.vendor}`)
      }else if(config.vendor === 'all'){
        queryParts.push('tag:pw-global')
      }

      if(config.handle){
        queryParts.push(config.handle)
      }
      if(config.title){
        queryParts.push(`title:"${config.title}"`)
      }
      if(config.tag){
        queryParts.push(`tag:${config.tag}`)
      }
      options.query = queryParts.join(' AND ');

      // EXECUTE THE QUERY
      return context.dispatch('graphQuery', options);
    },

    // loadCollection: async (context, collectionHandle) => {
    //
    //   const queryKey = `${collectionHandle}-collection`
    //
    //   // CHECK FOR COLLECTION CACHE FIRST
    //   if(context.state.cachedQueries[queryKey]) {
    //     // It's begun loading, but may have a next page.
    //     if(typeof context.state.cachedQueries[collectionHandle].fetchNextPage === 'function'){
    //       // there's a next page for this.
    //       return await context.state.cachedQueries[collectionHandle].fetchNextPage()
    //     }
    //   }else{
    //     let fetchNextPage;
    //
    //     if(collectionHandle === 'all'){
    //       // LOAD ALL PRODUCTS
    //       fetchNextPage = await context.dispatch('graphQuery', {}) // this is all products
    //       context.commit('SET_CACHED_QUERY', {
    //         key: queryKey,
    //         fetchNextPage
    //       });
    //     }else{
    //       const response = await client.graphQLClient.send(
    //         client.graphQLClient.query((root) => {
    //           root.addConnection(
    //             'collections',
    //             { args:{ first: 1, query: `title:${collectionHandle}` }},
    //             (collection) => {
    //               collection.add('title');
    //               collection.add('handle');
    //               collection.addConnection('products', {args: { first: context.state.resultsPerPage }}, product => {
    //                 graphProductDetails(product)
    //               });
    //             });
    //         })
    //       );
    //       // Call the send method with the custom products query
    //       if(response && response.model && response.model.collections){
    //         const collection = response.model.collections[0];
    //         if(collection){
    //           fetchNextPage = await context.dispatch('handleProductsResponse', collection.products);
    //           context.commit('SET_CACHED_QUERY', {
    //             title: collection.title,
    //             handle: collection.handle,
    //             id: collection.id,
    //             fetchNextPage
    //           });
    //         }
    //       }
    //     }
    //     return fetchNextPage
    //
    //   }
    // },
    loadProduct(context, handle) {
      return context.dispatch('graphQuery', {query: `title:"${handle}"`})
    },
    loadProductColorOptions: (context, handle) => new Promise((resolve, reject) => {
      if(context.state.colorOptions[handle]){
        resolve()
      }else{
        client.product.fetchByHandle(handle)
          .then(product => {

            if(product){
              const productsQuery = client.graphQLClient.query((root) => {
                root.addConnection('products', {args: {first: 15, query: `title:"${product.title}"`}}, (product) => {
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
                  model.products.forEach(relatedProduct => {
                    if(relatedProduct.title === product.title){
                      const colorField = relatedProduct.metafields.find(metafield => metafield.namespace === 'extras' && metafield.key === 'color');
                      if(colorField){
                        colors.push({
                          label: colorField.value,
                          handle: relatedProduct.handle,
                          image: relatedProduct.images[0].src
                        });
                      }
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
            }else{
              reject('No product')
            }

          })
          .catch(e => {
            reject(e);
          })
      }
    })
  },
  getters: {
    products: state => {
      return Object
        .values(state.products)
        .sort((a, b) => a.order - b.order)
    },
    relatedProducts: (state, getters) => (handle, tag, count) => {

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
          // Add more of same tag from the same vendor
          for(let i=0; i<getters.products.length; i++){
            const relatedProduct = getters.products[i];
            const isDifferent = relatedProduct.handle !== product.handle;
            const hasSameVendor = relatedProduct.vendor === product.vendor;
            const hasSameTag = !tag || relatedProduct.tags.find(foundTag => foundTag.value === tag) ? true : false;
            if(isDifferent && hasSameVendor && hasSameTag){
              // matches the vendor and tag
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

        if(relatedProducts.length < count){
          // Add more of same tag from the same vendor
          for(let i=0; i<getters.products.length; i++){
            const relatedProduct = getters.products[i];
            const isDifferent = relatedProduct.handle !== product.handle;
            const hasSameVendor = relatedProduct.vendor === product.vendor;
            if(isDifferent && hasSameVendor){
              // matches the vendor and tag
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
    productsByTagAndVendor: (state, getters) => (tag, vendor, limit) => {
      const products = getters.products.filter(product => {
        const foundTag = product.tags.find(productTag => productTag.value.toLowerCase() === tag.toLowerCase());
        const foundVendor = vendor ? product.vendor.toLowerCase() === vendor.toLowerCase() : true;

        // This exposes (or hides) products tagged with "pw-global" to the house brand home page
        if(!vendor){
          // Check product for the global tag
          const hasGlobalTag = product.tags.find(productTag => productTag.value === 'pw-global');
          if(!hasGlobalTag){
            // Hide the product if it has no global tag
            return false;
          }
        }
        return foundTag && foundVendor;
      });
      return limit ? products.slice(0, limit) : products;
    }
  }
}

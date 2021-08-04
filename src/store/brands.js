import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    route: null,
    houseBrandHandle: 'player-wear',
    brands: {
      "player-wear": {
        handle: "player-wear",
        title: "Player Wear",
        theme: {
          colors: {
            brand: '#94f03a'
          }
        },
        sections: {
          home: {
            categories: [
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
              {
                tag: 'hoodies-and-jackets',
                label: 'Hoodies'
              },
              {
                tag: 'backpacks-and-bags',
                label: 'Bags'
              },
              {
                tag: 'shop-women',
              },
              {
                tag: 'more-merch'
              },
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              }
            ]
          }
        }
      },
      korg: {
        handle: "korg",
        title: "Korg",
        designs: [
          'on-repeat',
          'kronos',
          'in-3d',
          'logo'
        ],
        relatedBrands: ['vox','blackstar'],
        theme: {
          colors: {
            brand: '#36e3d7'
          }
        },
        sections: {
          home: {
            categories: [
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
              {
                tag: 'hoodies-and-jackets',
                label: 'Hoodies'
              },
              {
                tag: 'backpacks-and-bags',
                label: 'Bags'
              },
              {
                tag: 'shop-women',
              },
              {
                tag: 'more-merch'
              },
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
            ],
            midHero: {
              link: {
                name: 'ProductInCollection',
                params: {
                  collectionHandle: 'korg',
                  productHandle: '3-4-sleeve-raglan-shirt-black-and-white'
                },
                query: {
                  tag: 'shirts'
                }
              }
            }
          }
        }
      },
      vox: {
        handle: "vox",
        title: "VOX",
        designs: [
          'elevated',
          '1957',
          'lightning',
          'logo',
        ],
        theme: {
          colors: {
            brand: '#a39161'
          },
        },
        relatedBrands: ['korg','blackstar'],
        sections: {
          home: {
            categories: [
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
              {
                tag: 'hoodies-and-jackets',
                label: 'Hoodies'
              },
              {
                tag: 'backpacks-and-bags',
                label: 'Bags'
              },
              {
                tag: 'shop-women',
              },
              {
                tag: 'more-merch'
              },
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
            ],
            midHero: {
              link: {
                name: 'ProductInCollection',
                params: {
                  collectionHandle: 'vox',
                  productHandle: 'vox-lightning-unisex-champion-embroidered-tie-dye-hoodie'
                },
                query: {
                  tag: 'hoodies-and-jackets'
                }
              }
            }
          }
        }
      },
      blackstar: {
        handle: "blackstar",
        title: "Blackstar",
        theme: {
          colors: {
            brand: '#a39161'
          },
        },
        relatedBrands: ['korg','vox'],
        sections: {
          home: {
            categories: [
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
              {
                tag: 'hoodies-and-jackets',
                label: 'Hoodies'
              },
              {
                tag: 'backpacks-and-bags',
                label: 'Bags'
              },
              {
                tag: 'shop-women',
              },
              {
                tag: 'more-merch'
              },
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
            ],
            midHero: {
              link: {
                name: 'ProductInCollection',
                params: {
                  collectionHandle: 'korg',
                  productHandle: '3-4-sleeve-raglan-shirt-black-and-white'
                },
                query: {
                  tag: 'shirts'
                }
              }
            }
          }
        }
      },
      tascam: {
        handle: "tascam",
        title: "TASCAM",
        designs: [
          'logo',
          'sam',
          'cassette',
          'headphones',
          'reels',
          'meter'
        ],
        theme: {
          colors: {
            brand: '#fa4616'
          }
        },
        sections: {
          home: {
            categories: [
              {
                tag: 'shirts',
              },
              {
                tag: 'hats',
              },
              {
                tag: 'hoodies-and-jackets',
                label: 'Hoodies'
              },
              {
                tag: 'backpacks-and-bags',
                label: 'Bags'
              },
              {
                tag: 'shop-women',
              },
              {
                tag: 'more-merch'
              },
              {
                tag: 'phone-cases'
              },
              {
                tag: 'drinkware'
              }
            ],
            midHero: {
              link: {
                name: 'ProductInCollection',
                params: {
                  collectionHandle: 'tascam',
                  productHandle: 'tascam-headphones-unisex-hoodie-black'
                },
                query: {
                  tag: 'hoodies-and-jackets'
                }
              }
            }
          }
        }
      }
    }
  },
  mutations: {
    SET_ROUTE(state, route){
      Vue.set(state, 'route', route);
    }
  },
  getters: {
    all: state => {
      return Object.values(state.brands)
    },
    allHandles: state => {
      return Object.keys(state.brands)
    },
    allDesigns: (state, getters) => {
      let designs = [];
      getters.all.forEach(brand => {
        if(brand.designs){
          designs = designs.concat(brand.designs.map(design => `${brand.handle}-${design}`))
        }
      })
      return designs;
    },
    houseBrand: state => {
      return state.brands[state.houseBrandHandle]
    },
    currentBrandHandle: (state, getters) => {
      if(state.route && getters.allHandles.includes(state.route.params.collectionHandle)){
        return state.route.params.collectionHandle
      }else{
        return state.houseBrandHandle
      }
    },
    currentBrand: (state, getters) => {
      return state.brands[getters.currentBrandHandle]
    },
    currentBrandName: (state, getters) => {
      return getters.currentBrand.title
    },
    currentBrandColor: (state, getters) => {
      return getters.currentBrand.theme.colors.brand
    },
    currentBrandDesigns: (state, getters) => {
      return getters.currentBrand.designs.map(design => `${getters.currentBrandHandle}-${design}`) || []
    },
    currentBrandHeaderBackgroundImage: (state, getters) => {
      return getters.currentBrand.theme.headerBackgroundImage
    },
    currentBrandTitle: (state, getters) => {
      return getters.currentBrand.title
    },
    currentBrandRelatedBrands: (state, getters) => {
      return getters.currentBrand.relatedBrands
    },
    isCurrentBrandHouseBrand: (state, getters) => {
      return getters.currentBrandHandle === state.houseBrandHandle
    },
    isCurrentBrandThirdParty: (state, getters) => {
      return !getters.isCurrentBrandHouseBrand
    },
    currentBrandPath: (state, getters) => path => {
      try{
        path = `state.brands['${getters.currentBrandHandle}'].${path}`;
        const value = eval(path);
        return value
      }catch(e){
        console.warn('Invalid path', path, e);
        return null
      }
    },
  }
}

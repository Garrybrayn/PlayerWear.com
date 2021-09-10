import Vue from 'vue';

const module = {
  state: {
    route: null,
    houseBrandHandle: 'player-wear',
    brands: {
      "player-wear": {
        handle: "player-wear",
        title: "Player Wear",
        published: true,
        theme: {
          colors: {
            brand: '#c3fd34',
            dark: '#464646',
            light: '#defa80'
          }
        },
        instruments: {
          guitar: {
            tags: ['pw-dreadnaught-design']
          },
          bass: {

          },
          keyboard: {

          },
          drums: {

          }
        },
        sections: {
          home: {
            hero: {
              type: 'image'
            },
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
                label: 'Backpacks & Bags'
              },
              {
                tag: 'womens-tops',
                label: "Women's Tops"
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
            ],
            midHero: {
              title: 'Embroidered Tie-Dye Hoodie',
              buttonLabel: 'See Details',
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
      korg: {
        handle: "korg",
        title: "KORG",
        published: true,
        designs: [
          'synths',
          'logo',
          'geo',
          'ilvkorg',
          'nma',
          'stax',
          'waves'
        ],
        relatedBrands: ['vox','blackstar'],
        theme: {
          colors: {
            brand: '#36e3d7',
            dark: '#2cbab0',
            light: '#a6fcf5'
          }
        },
        sections: {
          home: {
            hero: {
              type: 'video'
            },
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
                label: 'Backpacks & Bags'
              },
              {
                tag: 'womens-tops',
                label: "Women's Tops"
              },
              {
                tag: 'more-merch'
              },
              {
                tag: 'shop-kids',
              },
              {
                tag: 'drinkware',
              },
            ],
            midHero: {
              title: 'Korg "Stax" 3/4 Sleeve ',
              buttonLabel: 'See Details',
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
        published: true,
        designs: [
          'elevated',
          '1957',
          'lightning',
          'logo',
        ],
        theme: {
          colors: {
            brand: '#a39161',
            dark: '#82744d',
            light: '#eedcac'
          },
        },
        relatedBrands: ['korg','blackstar'],
        sections: {
          home: {
            hero: {
              type: 'video'
            },
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
                label: 'Backpacks & Bags'
              },
              {
                tag: 'womens-tops',
                label: "Women's Tops"
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
              title: 'Embroidered Tie-Dye Hoodie',
              buttonLabel: 'See Details',
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
        published: false,
        theme: {
          colors: {
            brand: '#a39161'
          },
        },
        relatedBrands: ['korg','vox'],
        sections: {
          home: {
            hero: {
              type: 'image'
            },
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
                label: 'Backpacks & Bags'
              },
              {
                tag: 'womens-tops',
                label: "Women's Tops"
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
              title: '',
              buttonLabel: '',
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
        published: false,
        designs: [
          'logo',
          'sam',
          'cassette',
          'headphone',
          'reel',
          'vu',
        ],
        theme: {
          colors: {
            brand: '#fa4616',
            dark: '#d83c13',
            light: '#f6c1b3'
          }
        },
        sections: {
          home: {
            hero: {
              type: 'image'
            },
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
                label: 'Backpacks & Bags'
              },
              {
                tag: 'womens-tops',
                label: "Women's Tops"
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
              title: 'Headphone Hoodie',
              buttonLabel: 'See Details',
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
      Vue.set(state, 'route', {
        path: route.path,
        name: route.name,
        query: route.query,
        params: route.params,
        meta: route.meta
      });
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
      getters.all.filter(brand => brand.published).forEach(brand => {
        if(brand.designs){
          designs = designs.concat(brand.designs.map(design => `${brand.handle}-${design}`))
        }
      })
      return designs;
    },
    houseBrand: state => {
      return state.brands[state.houseBrandHandle]
    },
    houseBrandInstruments: state => {
      return state.brands[state.houseBrandHandle].instruments
    },
    houseBrandInstrumentHandles: (state, getters) => {
      return Object.keys(getters.houseBrandInstruments)
    },
    houseBrandInstrumentTags: state => {
      return Object
        .values(state.brands.brands['player-wear'].instruments)
        .map(item => item.tags||null)
        .flat()
        .filter(Boolean)
    },
    currentBrandHandle: (state, getters) => {
      if(state.route && getters.allHandles.includes(state.route.params.collectionHandle)){
        return state.route.params.collectionHandle
      }else{
        const brandFromUrlPath = getters.getBrandFromString(state.route.path);
        if(brandFromUrlPath){
          return brandFromUrlPath
        }else{
          return state.houseBrandHandle
        }
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
    currentBrandColorDark: (state, getters) => {
      return getters.currentBrand.theme.colors.dark
    },
    currentBrandColorLight: (state, getters) => {
      return getters.currentBrand.theme.colors.light
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
    getBrandFromString: (state, getters) => str => {
      return getters.allHandles.find(brand => str.toLowerCase().includes(brand))
    }
  }
}

export const state = () => module.state
export const mutations = module.mutations;
export const actions = module.actions;
export const getters = module.getters;
export default {
  state,
  mutations,
  actions,
  getters
}

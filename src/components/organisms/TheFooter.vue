<template>



<footer>
  <Strip>
    <div>
      <router-link :to="{name: 'Home'}">
        <img :src="assetUrl('collection_logo_player-wear.png')" width="200" alt="PlayerWear.com - Great merch for musicians and music lovers.">
      </router-link>
      <p>
        Great merch for musicians<br>
        and music lovers.
      </p>
      <router-link to="/collections/all">Shop All Brands</router-link>
    </div>
    <nav v-if="$store.getters['brands/isCurrentBrandThirdParty']" role="navigation" :aria-label="`${ thirdPartyBrandName } Merch Categories`">
      <span class="title">{{ thirdPartyBrandName }} Merch</span>
      <router-link v-for="(menuItem, index) in thirdPartyBrandLinks" :key="index" :to="menuItem.route" :class="menuItem.class">
        {{menuItem.title}}
      </router-link>
    </nav>
    <nav v-if="relatedBrands"  role="navigation" aria-label="Related Brand Navigation">
      <span class="title">Other Merch Options</span>
      <router-link v-for="(relatedBrand, index) in relatedBrands" :key="index" :to="{name: 'BrandHome', params: { collectionHandle: relatedBrand }}">
        {{ tagReadable(relatedBrand) }} Merch
      </router-link>
    </nav>
    <nav role="navigation" aria-label="Company Links">
      <span class="title">Player Wear</span>
      <router-link v-for="(menuItem, index) in houseMenu" :key="index" :to="menuItem.route" :class="menuItem.class">
        {{menuItem.title}}
      </router-link>
    </nav>
  </Strip>
  <Strip>
    <div class="legal-links" role="contentinfo">
      <p>
        © Copyright Player Wear 2021 All Rights Reserved.
      </p>
      <router-link v-for="(menuItem, index) in legalLinks" :key="index" :to="menuItem.route" :class="menuItem.class">
        {{menuItem.title}}
      </router-link>
      <a href="https://amplify11.com/marketing-to-musicians/" target="_blank">
        Website and Marketing By
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="138" height="21" viewBox="0 0 138 21">
          <title>Amplify 11 - Connecting Brands to Musicians</title>
          <desc id="desc">Helping Brands Reach, Influence, and Win with Musicians.</desc>
          <image id="Vector_Smart_Object" data-name="Vector Smart Object" width="138" height="21" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAVCAMAAACuaYbAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAAD////////////////////////////////////////////////////////////////////D/DTD/DT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////D/DTD/DT////////////////////////////////////////D/DTD/DT////////////////////////////////////////////////D/DTD/DT////////////D/DT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////D/DQAAABbQf7oAAAAoHRSTlMAAwsCCIcJjzgMoRDrs1QBIMDQwEDgvvoidGhstveQGGGs8nn8sPt2MNi7EiqqE/DQN4zWKIHMmOIGuRb4wos5kT4d6EWvWw3lxSWo3AT+hjvzNO246DpwYlit9hfGH3tSyRvdQn8eD1CI71MZvByeB/RW50mAz0N1tGP5vw5IVVoteMhdrsG6lgrsSo5gLOObgi9cJNPUBX4xEbHbir0HHS82IAAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfjBhkUNyquxkx3AAAC2ElEQVRIx8WW+VcTMRDHp1KwWGWpFoogiAi1WmyriFIFVBA8OLzQiuKJymFRseKNirco3oriNfynZpLdbLqtXXzyXueXfOfI5NPdJF2ArJpjgaFynGY0N0/KhS7rlPxFbnCjYYuXFGgsWEjaI2uWzs7OLgPwomlFUEyDr4QXLOexUjmhsGxFeQVXKytXVa2W8ZJqs6bGv0ZLIgmsRRWF2brg3FBq/TSup3woTDLiENUbNtaRy1A21W8mZaJswYaoREHcuk0hKWtEKwo2aXNCgWYutrP8Dq526tUeUcFQKoSSKC0+xEoFBVt3GV6wjSqtKNg+N5Tde0js1WCfj0QH2KKQ39mloGD3fuEeaEAF5WAgcKjsMKmeNChHjuoonTFux1i4l08vgOM0nGgxUXwSxaei9JWT16uiIJ48xTb26WpUUcKUP0OqNRXl7DnQUcwoiJ3bf553uSCjFwcGdZS+UEBFGeKFdTlJKDh8KT5iPGsV5TIpfwrKlavxoTQoYueO8heWp8QNFHYqFJTgqFhvMBkFsQrToVwjlbCiXAdXwqOjFI2ReUWiWTYpAFuUMb30hmZBQSvKqNd789YwqdtWFLhzFz1J23ZMxMXOZXYPbFHGw8bk++lQutOeoAdWlFzhpaLAQ+FWT9ijPJKTH5soT56KUKL9WTqU5yn3SuSvKBrvgC/AFuXlJMl6fqS8EsULr/rZL3k9Lq4AC8rIAGRCmfSQTRmpN/zdBu1RYqTeRt/JzjoKON8XfwBIRfE3faSzlgGlJnlV4FsZbFGiCVIx+MRvEJeCopuK8tnNTP+Dmn+UUv5E8wE6SPRkRokovTjKl0Fh0/OA0sUv9q8sMsGf/rd/QzEP+/+jTPEtNUOh7yTbsoai/aDxJ0+6SHbXZgullobGuMj+IqcjWyg5TmbGR5ODnN8wE2cmP6QgRC47vWolmeZUjJ1EkeYNpy3Lir6WGLUdJzVNKv8P3qzr4JLyjwEAAAAASUVORK5CYII="></image>
        </svg>
      </a>
    </div>
  </Strip>
</footer>



</template>
<script lang="ts">

import Vue from 'vue';
import Strip from "../atoms/Strip.vue";
import Utilities from '../../utilities'

export default Vue.extend({
  components: {
    Strip
  },
  data(){
    return {
      houseMenu: [
        {
          title: 'Support',
          route: {
            name: 'ShopifyPage',
            params: { pageHandle: 'support' }
          }
        },
        {
          title: 'Shipping',
          route: {
            name: 'ShopifyPage',
            params: { pageHandle: 'shipping' }
          }
        },
        {
          title: 'Returns',
          route: {
            name: 'ShopifyPage',
            params: { pageHandle: 'returns' }
          }
        },
        {
          title: 'Contact',
          route: {
            name: 'ShopifyPage',
            params: { pageHandle: 'contact' }
          }
        },
        {
          title: 'About Us',
          route: {
            name: 'ShopifyPage',
            params: { pageHandle: 'about-us' }
          }
        }
      ],
      legalLinks: [
        {
          title: 'Terms and Conditions',
          class: '',
          route: {
            name: 'ShopifyPage',
            params: {pageHandle: 'terms-and-conditions'}
          }
        },
        {
          title: 'Privacy Policy',
          class: '',
          route: {
            name: 'ShopifyPage',
            params: {pageHandle: 'privacy-policy'}
          }
        }
      ]
    }
  },
  computed :{
    brand(){
      return this.$store.getters['brands/currentBrandHandle']
    },
    thirdPartyBrandName(){
      return Utilities.tagReadable(this.brand);
    },
    relatedBrands(){
      return this.$store.getters['brands/currentBrandRelatedBrands']
    },
    thirdPartyBrandLinks(){
      return [
        {
          title: 'Shirts',
          route: {
            name: 'TagInCollection',
            params: {
              tag: 'shirts',
              collectionHandle: this.brand
            }
          }
        },
        {
          title: 'Hoodies & Jackets',
          route: {
            name: 'TagInCollection',
            params: {
              tag: 'hoodies-and-jackets',
              collectionHandle: this.brand
            }
          }
        },
        {
          title: 'Hats',
          route: {
            name: 'TagInCollection',
            params: {
              tag: 'hats',
              collectionHandle: this.brand
            }
          }
        },
        {
          title: 'Shop Women',
          route: {
            name: 'TagInCollection',
            params: {
              tag: 'shop-women',
              collectionHandle: this.brand
            }
          }
        },
        {
          title: `Other ${this.thirdPartyBrandName} Merch`,
          route: {
            name: 'TagInCollection',
            params: {
              tag: 'other-merch',
              collectionHandle: this.brand
            }
          }
        }
      ]
    }
  },
  methods: {
    tagReadable: Utilities.tagReadable,
    assetUrl: url => `${window.assetUrl}${url}`
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  footer{
    background: #1a1a1a;
    padding-top: 1em;
    padding-bottom: 1em;
    color: white;
  }

  a{
    color: @gray4;
    text-decoration: none;
    font-size: 0.9em;
    &:hover{
      color: @gray5;
      svg{
        opacity: 1;
      }
    }
    svg{
      width: 72px;
      line-height: 1em;
      vertical-align: middle;
      opacity: 0.6;
      margin-top: -2px;
    }
  }
  section {
    display: grid;
    gap: 2em;
  }
  nav {
    line-height: 1.75em;
    a{
      display: block;
    }
  }
  .title{
    font-weight: 600;
  }
  .legal-links{
    grid-column: span 4;
    text-align: center;
    font-size: 0.9em;
    a{
      margin: 1em;
    }
  }

  @media(min-width: @firstbreakpoint){
    section {
      grid-template-columns: 1fr 1fr;
      gap: 0;
      > * {
        padding: 1em 3em;
      }
    }
  }
  @media(min-width: @thirdbreakpoint){
    section {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      > * {
        padding: 3em 3em;
      }
    }
  }
</style>

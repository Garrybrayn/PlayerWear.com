<template>



<footer>
  <Strip>
    <div>
      <img src="//cdn.shopify.com/s/files/1/0568/7957/9295/t/4/assets/amplified-merch-logo.png?v=14148700648949002472" width="200">
      <p>
        Great merch for musicians<br>
        and music lovers.
      </p>
      <router-link to="/collections/all">Shop All Brands</router-link>
    </div>
    <nav v-if="isThirdPartyBrand">
      <span class="title">{{ thirdPartyBrandName }} Merch</span>
      <router-link v-for="(menuItem, index) in thirdPartyBrandLinks" :key="index" :to="menuItem.route" :class="menuItem.class">
        {{menuItem.title}}
      </router-link>
    </nav>
    <nav v-if="relatedBrands">
      <span class="title">Other Merch Options</span>
      <router-link v-for="(relatedBrand, index) in relatedBrands" :key="index" :to="{name: 'BrandHome', collectionHandle: relatedBrand}">
        {{ tagReadable(relatedBrand) }} Merch
      </router-link>
    </nav>
    <nav>
      <span class="title">Amplified Merch</span>
      <router-link v-for="(menuItem, index) in houseMenu" :key="index" :to="menuItem.route" :class="menuItem.class">
        {{menuItem.title}}
      </router-link>
    </nav>
  </Strip>
  <Strip>
    <div class="legal-links">
      <div>
        © Copyright Amplified Merch 2021 All Rights Reserved.
      </div>
      <router-link v-for="(menuItem, index) in legalLinks" :key="index" :to="menuItem.route" :class="menuItem.class">
        {{menuItem.title}}
      </router-link>
    </div>
  </Strip>
</footer>



</template>
<script lang="ts">

import Vue from 'vue';
import Strip from "../atoms/Strip.vue";
import Utilities from '../../utilities'

export default Vue.extend({
  props: {
    brand: {
      type: String,
      required: true
    },
    isThirdPartyBrand: {
      type: Boolean,
      required: true
    }
  },
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
    thirdPartyBrandName(){
      return Utilities.tagReadable(this.brand);
    },
    relatedBrands(){
      const family = Utilities.getBrandFamily(this.brand);
      return family? family.filter(brand => brand != this.brand) : null;
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
    tagReadable: Utilities.tagReadable
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
    color: @gray2;
    text-decoration: none;
    font-size: 0.9em;
    &:hover{
      color: @gray4;
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

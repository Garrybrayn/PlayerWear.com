<template>
  <div class="search-overlay" @click="$emit('close')">
    <div class="search" @click.stop>
      <div class="search-input-container">
        <IconSvg name="magnifying-glass" />
        <IconSvg name="x" v-if="showResults" @click.native="clearQuery"/>
        <input type="text" placeholder="Search" v-debounce.lock:300ms="loadResults" ref="query"/>
      </div>
      <div class="search-results-container">
        <div class="title" v-if="hasBothResults">Page Results</div>
        <div class="link-search-results">
          <router-link v-for="(page, index) in pages" :key="index" :to="page.url">
            <IconSvg name="chainlink" />
            {{ page.title }}
          </router-link>
        </div>
        <div class="title" v-if="hasBothResults">Products</div>
        <div class="product-search-results" v-if="hasProductResults">
          <ProductCard v-for="(product, index) in products" :key="index" :product="product"/>
        </div>
        <div v-if="showResults && !hasResults">
          No results for "{{ $refs.query.value }}"
        </div>
        <div v-if="!showResults">
          Search Suggestions:
          <span v-for="(q, index) in queries" :key="index" @click="loadResults(q)" class="query-suggestion">
            <span class="query-suggestion-label">{{q}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import IconSvg from "../atoms/IconSvg.vue";
import ProductCard from "../molecules/ProductCard.vue";
import vueDebounce from 'vue-debounce'
import axios from 'axios';
Vue.use(vueDebounce)

export default Vue.extend({
  components: {
    IconSvg,
    ProductCard
  },
  data(){
    return {
      showResults: false,
      products: [],
      pages: [],
      queries: [
        'Trucker Hat', '3/4 Sleeve', 'Tank', 'Backpack', 'Shipping'
      ]
    }
  },
  computed:{
    hasResults(){
      return this.hasPageResults || this.hasProductResults
    },
    hasBothResults(){
      return this.hasPageResults && this.hasProductResults
    },
    hasProductResults(){
      return this.products.length > 0
    },
    hasPageResults(){
      return this.pages.length > 0
    }
  },
  methods: {
    loadResults(query){
      if(this.$refs.query.value != query){
        this.$refs.query.value = query;
      }

      // Only search if two or more characters were typed in
      if(query.length >= 2){
        this.showResults = true;

        // Limit the search by the current brand
        if(this.$store.getters['brands/isCurrentBrandThirdParty']){
          query = `${this.$store.getters['brands/currentBrandName']}} ${query}}`;
        }
        // Load products
        axios.get(`/search/suggest.json?q=${query}&resources[type]=product&resources[limit]=20&resources[options][unavailable_products]=last`).then(products => {
          if(products && products.data && products.data.resources && products.data.resources.results && products.data.resources.results.products) {
            this.products = products.data.resources.results.products
              .filter(product => product.tags.includes('pw-global'));
          }
        })
          // Load pages
        axios.get(`/search/suggest.json?q=${query}&resources[type]=page&resources[limit]=10&resources[options][fields]=title,body`).then(products => {
          if(products && products.data && products.data.resources && products.data.resources.results && products.data.resources.results.pages){
            this.pages = products.data.resources.results.pages
              .filter(page => {
                if(this.$store.getters['brands/allHandles'].includes(page.handle)){
                  // This is a brand page.
                  // Make sure the brand is published.
                  const brand = this.$store.state.brands.brands[page.handle];
                  if(brand && !brand.published){
                    return false;
                  }
                }
                return true;
              });
          }
        })
      }
    },
    clearQuery(){
      this.products = [];
      this.pages = [];
      this.$refs.query.value = '';
      this.showResults = false;
    }
  }
});
</script>
<style scoped lang="less">

  @import '../../less/variables';

  .search-overlay{
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background: #0005;
    z-index: 3;
    transition: opacity 250ms ease-in-out;
    &.closed{
      pointer-events: none;
      touch-action: none;
      opacity: 0;
      .search {
        bottom: -10vh;
        top: calc(5em + 10vh);
        opacity: 0;
      }
    }
  }
  .search {
    display: flex;
    background: rgba(255,255,255,0.90);
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 15px #0005;
    border-radius: 0.5em 0.5em 0em 0em;
    position: fixed;
    padding: 1em;
    top: 5em;
    right: 0;
    left: 0;
    bottom: 0;
    flex-direction: column;
    transition: all 500ms;
    font-size: 0.9rem;
  }
  .search-input-container{
    position: relative;
    .icon-svg{
      position: absolute;
      top: 50%;
      margin-top: -0.5em;
      left: 0.5em;
      color: @gray2;
    }
    .icon-svg.x{
      left: auto;
      right: 0.5em;
      color: white;
      background: @gray2;
      border-radius: 50%;
      border: 3px solid @gray2;
      box-sizing: border-box;
      line-height: 0;
    }
  }
  input{
    font: inherit;
    padding: 0.5em 1em 0.5em 2em;
    border-radius: 9px;
    border: none;
    background: white;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 0 3em #0002;
  }
  .search-results-container{
    overflow: auto;
    padding-top: 1em;
  }
  .title{
    color: @gray3;
    text-transform: uppercase;
    margin-top: 2em;
    margin-bottom: 0.5em;
    font-size: 0.9em;
  }
  .product-search-results{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1em;
    row-gap: 2em;
  }
  /deep/ .product-image img{
    filter: brightness(100%)
  }
  .link-search-results{
    font-size: 1.25em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    .icon{
      background: @gray5;
      height: 2em;
      width: 2em;
      border-radius: 3px;
      margin-right: 0.25em;
      box-sizing: border-box;
      font-size: 1em;
      border: 0.3em solid @gray5;
      color: @gray3;
    }
    a{
      font-weight: 600;
      text-decoration: none;
    }
  }
  .query-suggestion{
    color: @gray2;
    margin-right: 0.35em;
    cursor: pointer;
    &:not(:last-child):after{
      content:','
    }
  }


  @media(min-width: @secondbreakpoint){
    .search-overlay{
      &.closed{
        pointer-events: none;
        touch-action: none;
        opacity: 0;
        .search {
          right: -450px;
          opacity: 0;
          top:0;
          bottom: 0;
        }
      }
    }
    .search{
      width: 450px;
      top:0;
      right: 0;
      bottom:0;
      left: auto;
      font-size: 1rem;
      border-radius: 0;
    }
  }
</style>

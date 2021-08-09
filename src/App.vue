<template>
  <div id="vue-app" :class="classes" role="application">
    <TheHeader @toggleCart="showCart = !showCart"/>
    <div ref="contentForLayout" />
    <router-view
      class="page-content"
      rol="main"
      @addToCart="addToCart"
    />
    <TheFooter />
    <TheCart :class="{closed: !showCart}" @close="showCart=false"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/organisms/TheHeader.vue';
import TheFooter from './components/organisms/TheFooter.vue';
import TheCart from './components/organisms/TheCart.vue';

export default Vue.extend({
  metaInfo: {
    titleTemplate(titleChunk){
      let title;
      if(titleChunk){
        title = `${titleChunk} | `;
      }
      title += 'Player Wear - Shop merch for musicians and music lovers';
      return title
    },
    htmlAttrs: {
      lang: 'en'
    }
  },
  components: {
    TheHeader,
    TheFooter,
    TheCart
  },
  data(){
    return {
      contentForLayout: null,
      showCart: false
    }
  },
  mounted(){
    if(['BlankPage','ShopifyPage'].includes(this.$route.name)){
      const contentElement = document.getElementById('content_for_layout');
      if(contentElement.innerHTML.length > 0){
        console.log('inserting before');
        this.$refs.contentForLayout.parentNode.insertBefore(contentElement, this.$refs.contentForLayout);
        contentElement.style.display ='revert';
        this.contentForLayout = contentElement
      }
    }
    this.$store.dispatch('cart/initialize');
  },
  computed: {
    brand(){
      if(this.$store.getters['brands/isBrand'](this.$route.params.collectionHandle)){
        return this.$route.params.collectionHandle
      }else{
        return this.$store.state.brands.houseBrandHandle
      }
    },
    classes(){
      const classes = {
        'house-brand': this.$store.getters['brands/isCurrentBrandHouseBrand'],
        'third-party-brand': this.$store.getters['brands/isCurrentBrandThirdParty']
      }
      if(this.$store.getters['brands/isThirdPartyBrand']){
        classes[this.brand] = true;
      }
      return classes;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from){
        if(this.contentForLayout && to && from){
          this.contentForLayout.remove();
        }
        if(to){
          this.$store.commit('brands/SET_ROUTE', to);
        }
      }
    }
  },
  methods: {
    addToCart(payload){
      this.$store.dispatch('cart/addItem', payload).then(() => {
        this.showCart = true;
      })
    }
  }
});
</script>
<style lang="less">
  @import './less/unicons.css';
  @import './less/variables';
  #vue-app{
    line-height: 1.5;
    padding-top: 60px;
  }
  .placeholder-content{
    min-height: 1em;
    background: #eee;
    border-radius: 2px;
    display: none;
  }
  .placeholder .placeholder-content{
    display: inline-block;
  }
  h1, h2{
    &.center{
      text-align: center
    }
  }
  .heading-1{
    font-size: 25px;
    font-weight: bolder;
    display: block;
    margin-bottom: 0.25em;
    &.center{
      text-align: center
    }
  }
  @media(min-width: @thirdbreakpoint){
    #vue-app{
      padding-top: 100px;
    }
    .heading-1{
      font-size: 35px;
    }
  }
</style>

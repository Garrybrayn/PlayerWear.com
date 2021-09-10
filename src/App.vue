<template>
  <div id="vue-app" :class="classes" role="application">
      <TheHeader @toggleCart="showCart = !showCart" @toggleSearch="showSearch = !showSearch"/>
      <router-view
        class="page-content"
        rol="main"
        @addToCart="addToCart"
        @pageMetadata="pageMetadata = $event"
      />
      <BrandFamilyStrip v-if="false && $store.getters['brands/currentBrandRelatedBrands']"/>
      <TheFooter :page-metadata="pageMetadata"/>
      <TheCart :class="{closed: !showCart}" @close="showCart=false"/>
      <TheSearch :class="{closed: !showSearch}" @close="showSearch=false"/>
      <TheMailingListModal :class="{closed: !showMailingListModal}" @close="showMailingListModal=false"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/organisms/TheHeader.vue';
import TheFooter from './components/organisms/TheFooter.vue';
import TheCart from './components/organisms/TheCart.vue';
import TheSearch from './components/organisms/TheSearch.vue';
import TheMailingListModal from './components/organisms/TheMailingListModal.vue';
import BrandFamilyStrip from "./components/organisms/BrandFamilyStrip.vue";

export default Vue.extend({
  components: {
    TheHeader,
    TheFooter,
    TheCart,
    TheSearch,
    BrandFamilyStrip,
    TheMailingListModal
  },
  data(){
    return {
      showCart: false,
      showSearch: false,
      showMailingListModal: false,
      cacheBustingVersion: 0,
      pageMetadata: {
        title: '',
        description: ''
      }
    }
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
        'third-party-brand': this.$store.getters['brands/isCurrentBrandThirdParty'],
        'safari-only': process.client && /Safari/i.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) && !/Mobi|Android/i.test(navigator.userAgent)
      }
      if(this.$store.getters['brands/isThirdPartyBrand']){
        classes[this.brand] = true;
      }
      return classes;
    },
    bodyClass(){
      return this.$route.meta.bodyClass
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to){
        if(to){
          this.$store.commit('brands/SET_ROUTE', to);
        }
        this.repositionChatButton();
        if('join' in to.query){
          this.showMailingListModal = true;
        }
        if(this.showSearch){
          this.showSearch = false;
        }
        if(to.name == 'Cart'){
          this.showCart = true;
        }
      }
    },
    bodyClass:{
      immediate: true,
      handler(to, from){
        if(process.client){
          if(from){
            document.body.classList.remove(from);
          }
          if(to){
            document.body.classList.add(to);
          }
        }
      }
    },
    pageMetadata: {
      immediate: true,
      handler(){
        this.setPageMetadata()
      }
    }
  },
  mounted(){
    // document.body.addEventListener('touchstart', () => {});
    // document.body.addEventListener('touchend', () => {});

    this.$store.dispatch('cart/initialize');
    this.$store.dispatch('customers/fetch').catch(() => {});
  },
  methods: {
    setPageMetadata(){
      if(process.client){
        document.title = this.pageMetadata.title || "[NEEDS TITLE]"
        // TODO: FIX THIS
        // const metaTags = document.getElementsByTagName('meta');
        //
        // metaTags["description"].content = this.pageMetadata.description || "[NEEDS DESCRIPTION]";
        // metaTags["og:description"].content = this.pageMetadata.description || "[NEEDS DESCRIPTION]";
      }
    },
    addToCart(payload){
      this.$store.dispatch('cart/addItem', payload).then(() => {
        this.showCart = true;
      })
    },
    repositionChatButton(){
      // Reorder the shopify chat button
      if(process.client){
        const shopifyChatButtonElement = document.getElementById('shopify-chat');
        if(shopifyChatButtonElement){
          shopifyChatButtonElement.style.zIndex = "2";
          shopifyChatButtonElement.children[0].style.zIndex = "2";
        }
      }
    }
  }
});
</script>
<style lang="less">
  @import './less/variables';
  html, body {
    font-family: Helvetica, Arial, sans-serif;
    line-height: 1.5;
    padding: 0;
    margin: 0;
  }
  #vue-app{
    line-height: 1.5;
    padding-top: 60px;
  }
  .placeholder-content{
    min-height: 1em;
    border-radius: 2px;
    display: none;
    background: #eee;
    transition: background 2s;
    animation: pulse 1.5s ease infinite;
  }
  .placeholder .placeholder-content{
    display: inline-block;
  }

@keyframes pulse {
	0% {
		background: #eeeeee;
	}
	50% {
		background: #f8f8f8;
	}
	100% {
		background: #eeeeee;
	}
}

  h1, h2{
    &.center{
      text-align: center
    }
  }
  a{
    cursor: pointer;
    color: @black;
    text-decoration: none;
  }
  p.center{
    text-align: center
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


  @media(max-width: @secondbreakpoint){
    .offset-chat-button #shopify-chat iframe{
      transform: translateY(-50px);
    }
    .hide-chat-button {
      #shopify-chat {
        display: none !important;
        iframe{
          display: none !important;
        }
      }
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

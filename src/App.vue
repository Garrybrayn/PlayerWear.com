<template>
  <div id="vue-app" :class="classes" role="application">
    <TheHeader @toggleCart="showCart = !showCart" @toggleSearch="showSearch = !showSearch"/>
    <div ref="contentForLayout" />
    <router-view
      class="page-content"
      rol="main"
      @addToCart="addToCart"
    />
    <BrandFamilyStrip v-if="false && $store.getters['brands/currentBrandRelatedBrands']"/>
    <TheFooter />
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
  metaInfo: {
    titleTemplate(titleChunk){
      return `${titleChunk}${titleChunk.length < 30 ? ' - Player Wear' : ''}`
    },
    htmlAttrs: {
      lang: 'en'
    }
  },
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
      contentForLayout: null,
      showCart: false,
      showSearch: false,
      showMailingListModal: false,
      cacheBustingVersion: 0
    }
  },
  mounted(){
    // document.body.addEventListener('touchstart', () => {});
    // document.body.addEventListener('touchend', () => {});

    if('includeContentForLayout' in this.$route.meta){
      const contentElement = document.getElementById('content_for_layout');
      if(contentElement.innerHTML.length > 0){
        console.log('inserting before');
        this.$refs.contentForLayout.parentNode.insertBefore(contentElement, this.$refs.contentForLayout);
        contentElement.style.display ='revert';
        this.contentForLayout = contentElement
      }
    }
    this.$store.dispatch('cart/initialize');
    this.$store.dispatch('customers/fetch').catch(() => {});
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
        'safari-only': /Safari/i.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) && !/Mobi|Android/i.test(navigator.userAgent)
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
      handler(to, from){
        if(this.contentForLayout && to && from){
          this.contentForLayout.remove();
        }
        if(to){
          this.$store.commit('brands/SET_ROUTE', to);
        }
        this.showSearch = false;
        this.repositionChatButton();

        if('join' in to.query){
          this.showMailingListModal = true;
        }

        if(to.name == 'Cart'){
          this.showCart = true;
        }
      }
    },
    bodyClass:{
      immediate: true,
      handler(to, from){
        if(from){
          document.body.classList.remove(from);
        }
        if(to){
          document.body.classList.add(to);
        }
      }
    }
  },
  methods: {
    addToCart(payload){
      this.$store.dispatch('cart/addItem', payload).then(() => {
        this.showCart = true;
      })
    },
    repositionChatButton(){
      // Reorder the shopify chat button
      const shopifyChatButtonElement = document.getElementById('shopify-chat');
      if(shopifyChatButtonElement){
        shopifyChatButtonElement.style.zIndex = "2";
        shopifyChatButtonElement.children[0].style.zIndex = "2";
      }
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

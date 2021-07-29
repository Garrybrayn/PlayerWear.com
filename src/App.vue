<template>
  <div id="vue-app" :class="classes">
    <TheHeader :brand="brand" :isThirdPartyBrand="isThirdPartyBrand"/>
    <div ref="contentForLayout" />
    <router-view class="page-content" :brand="brand"/>
    <TheFooter :brand="brand" :isThirdPartyBrand="isThirdPartyBrand"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/organisms/TheHeader.vue';
import TheFooter from './components/organisms/TheFooter.vue';
import Utilities from './utilities';

export default Vue.extend({
  components: {
    TheHeader,
    TheFooter
  },
  data(){
    return {
      contentForLayout: null
    }
  },
  mounted(){
    // this.$store.dispatch('cart/initialize');
    const contentElement = document.getElementById('content_for_layout');
    if(contentElement.innerHTML.length > 0){
      console.log('inserting before');
      this.$refs.contentForLayout.parentNode.insertBefore(contentElement, this.$refs.contentForLayout);
      contentElement.style.display ='revert';
      this.contentForLayout = contentElement
    }
  },
  computed: {
    brand(){
      if(this.$route.params.collectionHandle){
        return Utilities.getBrandFromCollectionHandle(this.$route.params.collectionHandle);
      }else{
        return Utilities.houseBrand;
      }
    },
    isHouseBrand(){
      return this.brand === Utilities.houseBrand
    },
    isThirdPartyBrand(){
      return !this.isHouseBrand
    },
    classes(){
      const classes = {
        'house-brand': this.isHouseBrand,
        'third-party-brand': this.isThirdPartyBrand
      }
      if(this.isThirdPartyBrand){
        classes[this.brand] = true;
      }
      return classes;
    }
  },
  watch: {
    $route(){
      console.log('leaving route');
      if(this.contentForLayout){
        this.contentForLayout.remove();
      }
    }
  }
});
</script>
<style lang="less">
  @import './less/variables';
  #vue-app{
    line-height: 1.5em;
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
    text-transform: uppercase;
    &.center{
      text-align: center
    }
  }
  @media(min-width: @thirdbreakpoint){
    #vue-app{
      padding-top: 100px;
    }
  }
</style>

<template>
  <div id="vue-app" :class="classes">
    <TheHeader :brand="brand" :isThirdPartyBrand="isThirdPartyBrand"/>
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
  mounted(){
    // this.$store.dispatch('cart/initialize');
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
  }
});
</script>
<style lang="less">
  @import './less/variables';

  #vue-app{
    line-height: 1.5em;
    padding-top: @headerHeightMobile;
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
      padding-top: @headerHeightDesktop;
    }
  }
</style>

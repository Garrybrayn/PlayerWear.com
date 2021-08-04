<template>
  <div id="vue-app" :class="classes">
    <TheHeader />
    <div ref="contentForLayout" />
    <router-view class="page-content" />
    <TheFooter />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/organisms/TheHeader.vue';
import TheFooter from './components/organisms/TheFooter.vue';

export default Vue.extend({
  metaInfo: {
    titleTemplate(titleChunk){
      let title;
      if(titleChunk){
        title = `${titleChunk} | `;
      }
      title += 'Player Wear - Shop merch for musicians and music lovers';
      return title
    }
  },
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
    if(['BlankPage','ShopifyPage'].includes(this.$route.name)){
      const contentElement = document.getElementById('content_for_layout');
      if(contentElement.innerHTML.length > 0){
        console.log('inserting before');
        this.$refs.contentForLayout.parentNode.insertBefore(contentElement, this.$refs.contentForLayout);
        contentElement.style.display ='revert';
        this.contentForLayout = contentElement
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
        'third-party-brand': this.$store.getters['brands/isCurrentBrandThirdParty']
      }
      if(this.$store.getters['brands/isThirdPartyBrand']){
        classes[this.brand] = true;
      }
      return classes;
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
      }
    }
  }
});
</script>
<style lang="less">
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
  @media(min-width: @thirdbreakpoint){
    #vue-app{
      padding-top: 100px;
    }
  }
</style>

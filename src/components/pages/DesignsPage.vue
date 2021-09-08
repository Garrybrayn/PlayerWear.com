<template>
  <Page :bottom-spacing="true" class="designs-page">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="designs">
      <router-link
         v-for="(design, index) in designsForBrand"
         :key="index"
         :to="{
            name: 'TagInCollection',
            params: {
              collectionHandle: design.split('-')[0],
              tag: `${design}-design`
            }
          }">
        <img :src="assetUrl(`${design}-design.jpg`)" loading="lazy" :alt="`${tagReadable(design)} T-Shirts, Hoodies, Hats, Bags & More`"/>
      </router-link>
    </div>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Breadcrumbs from "../molecules/Breadcrumbs.vue";
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  components: {
    Page,
    Breadcrumbs
  },
  computed: {
    pageTitle(){
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        return `${this.$store.getters['brands/currentBrandName']} logo T-Shirts, Hats, Hoodies, Backpacks & more | Player Wear Official ${this.$store.getters['brands/currentBrandName']} Gear`
      }else{
        return ``;
      }
    },
    pageDescription(){
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        return `Your official source for ${this.$store.getters['brands/currentBrandName']} merch. Select from traditional, vintage and exclusive Korg designs, available on a wide range of products.`
      }else{
        return ``;
      }
    },
    designsForBrand(){
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        return this.arrayShuffle(this.$store.getters['brands/currentBrandDesigns'])
      }
      return this.arrayShuffle(this.$store.getters['brands/allDesigns']);
    },
    breadcrumbs(){
      const breadcrumbs = [];
      if(this.$route.params.collectionHandle) {
        breadcrumbs.push({
          label: this.$store.getters['brands/currentBrandTitle'],
          url: {
            name: "Collection",
            params: {
              collectionHandle: this.$route.params.collectionHandle
            }
          }
        });
      }
        breadcrumbs.push({
          label: 'Shop By Design'
        });
      return breadcrumbs;
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .designs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  @media(min-width: @secondbreakpoint) {
    .designs {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

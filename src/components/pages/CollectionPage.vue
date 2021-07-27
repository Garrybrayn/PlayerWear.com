<template>
  <Page>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="collection-page">
      <TagSelector :tags="tags"/>
      <div class="product-grid">
        <ProductCard v-for="(product, index) in productsForGrid" :key="index" :product="product"/>
      </div>
    </div>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Utilities from "../../utilities";
import Breadcrumbs from "../molecules/Breadcrumbs.vue";
import TagSelector from "../molecules/TagSelector.vue";
import ProductCard from "../molecules/ProductCard.vue";

export default Vue.extend({
  components: {
    Page,
    Breadcrumbs,
    TagSelector,
    ProductCard
  },
  data(){
    return {
      tags: [
        'shirts',
        'hats',
        'hoodies-and-jackets',
        'backpacks-and-bags',
        'shop-women',
        'more-merch'
      ]
    }
  },
  beforeMount(){
    this.$store.dispatch('loadCollectionWithProducts', this.$route.params.collectionHandle);
  },
  computed: {
    productsForGrid(){
      if(this.$store.getters.products.length > 0){
        return this.$store.getters.products.filter(product => {
          let include = true;
          if(this.$route.params.collectionHandle && this.$route.params.collectionHandle !== 'all' && product.vendor.toLowerCase() !== this.$route.params.collectionHandle){
            include = false;
          }
          if(this.$route.params.tag && product.tags.find(tag => tag.value === this.$route.params.tag) === undefined){
            include = false;
          }
          return include;
        })
      }
      return [null, null, null, null, null];
    },
    breadcrumbs(){
      const breadcrumbs = [];
      if(this.$route.params.collectionHandle) {
        breadcrumbs.push({
          label: Utilities.tagReadable(this.$route.params.collectionHandle + ' Merch'),
          url: {
            name: "Collection",
            params: {
              collectionHandle: this.$route.params.collectionHandle
            }
          }
        });
      }
      if(this.$route.params.tag){
        breadcrumbs.push({
          label: Utilities.tagReadable(this.$route.params.tag)
        });
      }

      return breadcrumbs;
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .collection-page{
    display: flex;
    flex-direction: column;
  }

  .product-grid{
    flex-grow: 1;
    display: grid;
    flex-wrap: wrap;
    grid-column-gap: 1em;
    grid-row-gap: 2em;
    grid-template-columns: 1fr 1fr;
  }

  @media(min-width: @thirdbreakpoint){
    .collection-page{
      flex-direction: row;
    }
    .tag-selector{
      width: 220px;
      flex-shrink: 0;
    }
  }
  @media(min-width: @fourthbreakpoint){
    .product-grid{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

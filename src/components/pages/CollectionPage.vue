<template>
  <Strip class="collection-page">
    <TagSelector :tags="tags"/>
    <div class="product-grid">
      <ProductCard v-for="(product, index) in productsForGrid" :key="index" :product="product" @click="viewProduct(product)"/>
    </div>
  </Strip>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from "../atoms/Strip.vue";
import TagSelector from "../molecules/TagSelector.vue";
import ProductCard from "../molecules/ProductCard.vue";

export default Vue.extend({
  components: {
    Strip,
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
      return this.$store.getters.products.filter(product => {
        console.log(product);
        let include = true;
        if(this.$route.params.collectionHandle && product.vendor.toLowerCase() !== this.$route.params.collectionHandle){
          console.log(product.vendor.toLowerCase(),'is not', this.$route.params.collectionHandle);
          include = false;
        }
        if(this.$route.params.tag && product.tags.find(tag => tag.value === this.$route.params.tag) === undefined){
          include = false;
        }
        return include;
      })

    }
  },
  methods: {
    viewProduct(product){
      this.$router.push({
        name: "ProductInCollection",
        params: {
          collection: this.$route.params.collectionHandle,
          productHandle: product.handle
        }
      })
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
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 2em;
    grid-column-gap: 1em;
    grid-row-gap: 2em;
  }

  .product-card{
    width: 330px;
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
</style>

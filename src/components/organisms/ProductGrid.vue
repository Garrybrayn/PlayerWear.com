<template>
  <div class="product-grid">
    <ProductCard
      v-for="(product, index) in productsForGrid"
      :key="index"
      :product="product"
      :show-product-title="showProductTitle"
      :show-product-price="showProductPrice"
      :show-product-color="showProductColor"
      :show-product-icon="showProductIcon"
      :show-buy-button="showBuyButton"
      :show-price-on-button="showPriceOnButton"
      @addToCart="$emit('addToCart', $event)"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ProductCard from "../molecules/ProductCard.vue";

export default Vue.extend({
  props: {
    products: {
      type: Array
    },
    showProductTitle: {
      type: Boolean,
      default: true
    },
    showBuyButton: {
      type: Boolean,
      default: false
    },
    showPriceOnButton:{
      type: Boolean,
      default: true
    },
    showProductPrice: {
      type: Boolean,
      default: true
    },
    showProductColor: {
      type: Boolean,
      default: true
    },
    showProductIcon: {
      type: String,
      default: null
    }
  },
  components: {
    ProductCard
  },
  computed: {
    productsForGrid(){
      // Include 5 empty placeholder products
      return this.products.length > 0 ? this.products : [null, null, null, null, null]
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .product-grid{
    flex-grow: 1;
    display: grid;
    flex-wrap: wrap;
    grid-column-gap: 1em;
    grid-row-gap: 2em;
    grid-template-columns: 1fr 1fr;
  }
  .product-card{
    cursor: pointer;
  }
  @media(min-width: @fourthbreakpoint){
    .product-grid{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

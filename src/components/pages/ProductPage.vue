<template>
  <Strip v-if="product" class="product-page">
    <ProductPageImageGrid
      :images="product.images"/>
    <div class="product-details">
      <div class="product-title">
        {{ product.title }}
      </div>
      <div class="product-price">
        ${{ selectedVariant.price }} USD
      </div>
      <label>Select a Size:</label>
      <ProductPageSizeSelector
        v-if="showSizeSelector"
        :options="product.options"
        :variants="product.variants"
        :selected-variant-id="selectedVariantId"
        @select="selectedVariantId = $event"
      />
      <InputNumber :value="quantity" @change="quantity=$event" v-show="false"/>
      <Button class="buy-button full-width">Add to cart - ${{ total }}</Button>
      <label>Description:</label>
      <div v-html="product.descriptionHtml" />
    </div>
  </Strip>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from '../atoms/Strip.vue';
import InputNumber from '../atoms/InputNumber.vue';
import Button from '../atoms/Button.vue';
import ProductPageImageGrid from '../molecules/ProductPageImageGrid.vue';
import ProductPageSizeSelector from '../molecules/ProductPageSizeSelector.vue';

export default Vue.extend({
  components: {
    Strip,
    ProductPageImageGrid,
    ProductPageSizeSelector,
    InputNumber,
    Button
  },
  data(){
    return {
      product: null,
      selectedVariantId: null,
      quantity: 1
    }
  },
  computed: {
    selectedVariant(){
      return this.product.variants.find(variant => variant.id === this.selectedVariantId)
    },
    showSizeSelector(){
      return this.product.options.find(option => option.name === 'Size');
    },
    total(){
      return this.selectedVariant.price * this.quantity;
    }
  },
  watch: {
    product(){
      if(this.product){
        // Select the first variant by default
        this.selectedVariantId = this.product.variants[0].id
      }
    },
    selectedVariantId(selectedVariantId){
      console.log({selectedVariantId})
    }
  },
  beforeCreate() {
    this.$store.dispatch('getProductByHandle', this.$route.params.productHandle).then(product => {
      this.product = product;
      console.log(product);
    })
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .product-page-image-grid-container{
    margin-bottom: 1em;
  }
  .product-title{
    font-weight: 800;
    margin-bottom: 1em;
    font-size: 1.2em;
  }
  .product-price{
    color: @gray1;
    font-weight: 800;
    margin-bottom: 1em;
  }
  .product-size-selector{
    margin-bottom: 1em;
  }
  label{
    display: block;
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: 800;
    margin-bottom: 0.5em;
  }

  .buy-button{
    font-weight: 800;
    text-transform: uppercase;
  }

  @media(min-width: @thirdbreakpoint){
    .product-page {
      display: flex;
      grid-gap: 70px;
    }
    .product-page-image-grid-container{
      flex-grow: 2;
      flex-basis: 0;
    }
    .product-details{
      flex-grow: 1;
      flex-basis: 0;
    }
  }
</style>

<template>
  <div v-if="product">
    <Strip class="breadcrumbs">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
    </Strip>
    <Strip class="product-page" v-sticky-container>
      <ProductPageImageGrid
        :images="product.images"/>
      <div class="product-details">
        <div v-sticky="{topSpacing: 150, bottomSpacing:40}">
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
          <div class="buy-button-container">
            <Button class="buy-button full-width">Add to cart - ${{ total }}</Button>
          </div>
          <label>Description:</label>
          <div v-html="product.descriptionHtml" class="description"/>
        </div>
      </div>
    </Strip>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from '../atoms/Strip.vue';
import InputNumber from '../atoms/InputNumber.vue';
import Button from '../atoms/Button.vue';
import ProductPageImageGrid from '../molecules/ProductPageImageGrid.vue';
import Breadcrumbs from '../molecules/Breadcrumbs.vue';
import ProductPageSizeSelector from '../molecules/ProductPageSizeSelector.vue';
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'

export default Vue.extend({
  components: {
    Strip,
    Breadcrumbs,
    ProductPageImageGrid,
    ProductPageSizeSelector,
    InputNumber,
    Button
  },
  directives: {
    sticky: VueStickyDirective
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
    },
    breadcrumbs(){
      const breadcrumbs = [];
      breadcrumbs.push({
        label: "Home",
        url: '/'
      });
      breadcrumbs.push({
        label: this.product.vendor,
        url: `/collections/${this.product.vendor.toLowerCase()}`
      });
      breadcrumbs.push({
        label: this.product.title
      });
      return breadcrumbs;
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
  .breadcrumbs{
    display: none;
  }
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
    margin: 0;
  }
  .buy-button-container{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0.75rem;
    background: white;
    box-shadow: 0px 0px 20px #0005;
  }

  .description table{
    font-size: 0.8em !important;
  }

  @media(min-width: @secondbreakpoint){
    .breadcrumbs {
      display: block;
    }
    .product-page {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 40px;
    }
    .product-page-image-grid-container{
      grid-column: span 7;
    }
    .buy-button-container{
      position: relative;
      padding: 0;
      box-shadow: none;
      margin-bottom: 1em;
    }
    .product-details{
      grid-column: span 5;
    }
  }

  @media(min-width: @thirdbreakpoint){
    .product-page{
      grid-gap: 70px;
    }
    .product-page-image-grid-container{
      grid-column: span 8;
    }
    .product-details{
      grid-column: span 4;
    }
  }
</style>

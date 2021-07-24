<template>
  <div v-if="product">
    <Strip class="breadcrumbs">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
    </Strip>
    <Strip class="product-page" data-v-sticky-container>
      <ProductPageImageGrid
        class="product-images"
        :images="product.images"/>
      <div class="product-details">
        <div v-sticky="{topSpacing: 150, bottomSpacing:40}">
          <div class="product-title">
            {{ product.title }}
          </div>
          <div class="product-price">
            ${{ selectedVariant.price }} USD
          </div>
          <div v-if="product.colors">
            <label>Select a Color:</label>
            <ProductColorSelector
              :options="product.colors"
              :value="product.handle"
              @select="selectColor($event)"
            />
          </div>
          <div v-if="showSizeSelector">
            <label>Select a Size:</label>
            <ProductPageSizeSelector
              :options="product.options"
              :variants="product.variants"
              :selected-variant-id="selectedVariantId"
              @select="selectedVariantId = $event"
            />
          </div>
          <form class="buy-button-container">
            <InputNumber :value="quantity" @change="quantity=$event" v-if="false"/>
            <input type="number" :value="quantity" data-qty-input @change="quantity=$event" v-show="false"/>
            <input name="id" type="hidden" :value="selectedVariantIdDecoded" :data-variant-id="selectedVariantIdDecoded" />
            <Button type="submit" class="buy-button full-width" @click.native="addToCart($event)" :data-original-text="buyButtonLabel">
              <span data-button-text>{{buyButtonLabel}}</span>
            </Button>
          </form>
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
import ProductColorSelector from '../molecules/ProductColorSelector.vue';
import ProductPageSizeSelector from '../molecules/ProductPageSizeSelector.vue';
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'

export default Vue.extend({
  components: {
    Strip,
    Breadcrumbs,
    ProductPageImageGrid,
    ProductColorSelector,
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
    selectedVariantIdDecoded(){
      return this.selectedVariantId ? atob(this.selectedVariantId).split('/').slice(-1)[0] : false;
    },
    showSizeSelector(){
      return this.product.options.find(option => option.name === 'Size');
    },
    buyButtonLabel(){
      return `Add to cart - $${ this.total }`
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
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchProductData(to.params.productHandle);
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProductData(to.params.productHandle);
    next();
  },
  methods: {
    fetchProductData(productHandle){
      this.$store
        .dispatch('getProductByHandle', productHandle)
        .then(product => {
          this.product = product;
        })
    },
    selectColor(productHandle){
      this.$router.push({
        name: this.$route.name,
        params: {
          collection: this.$route.params.collection ? this.$route.params.collection : null,
          productHandle: productHandle
        }
      })
    },
    addToCart(event){
      event.preventDefault();
      boosterCart.addToCart(event.currentTarget, event)
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .breadcrumbs{
    display: none;
  }
  .product-images{
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
  .product-color-selector{
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
    .product-images{
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
    .product-images{
      grid-column: span 8;
    }
    .product-details{
      grid-column: span 4;
    }
  }
</style>

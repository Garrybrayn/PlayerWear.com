<template>
  <div>
    <Strip :class="{placeholder: showPlaceholders}">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="product-page" data-v-sticky-container>
        <ProductPageImageGrid
          class="product-images"
          :images="images"/>
        <div class="product-details">
          <div v-sticky="{topSpacing: 150, bottomSpacing:40}">
            <div class="product-title">
              {{ title }}
              <span class="placeholder-content" />
            </div>
            <div class="product-price">
              {{ priceReadable }}
              <span class="placeholder-content" />
            </div>
            <div v-show="colors && colors.length > 0">
              <ProductColorSelector
                :options="colors"
                :value="product && product.handle"
                @select="selectColor($event)"
              />
            </div>
            <ProductPageSizeSelector
              v-show="showSizeSelector"
              :options="options"
              :variants="variants"
              :selected-variant-id="selectedVariantId"
              :size-guide="sizeGuide"
              @select="selectedVariantId = $event"
            />
            <form class="buy-button-container">
              <input v-show="false" type="number" :value="quantity" data-qty-input @change="quantity=$event"/>
              <input name="id" type="hidden" :value="selectedVariantIdDecoded" :data-variant-id="selectedVariantIdDecoded" />
              <InputNumber :value="quantity" data-qty-input @change="quantity=$event"/>
              <Button
                v-if="!showPlaceholders"
                type="submit"
                :disabled="selectedVariantIdDecoded?false:true"
                :class="{'buy-button': true, 'full-width': true, disabled: selectedVariantIdDecoded?false:true}"
                @click.native="addToCart($event)"
                :data-original-text="buyButtonLabel"

              >
                <span data-button-text>{{buyButtonLabel}}</span>
              </Button>
              <span class="placeholder-content" />
            </form>
            <div class="note" v-show="!showPlaceholders">
              <i class="uil uil-truck" />
              SPECIAL Flat Rate Shipping $4.00
            </div>
            <b v-show="description">DESCRIPTION:</b>
            <div v-html="description" class="description"/>
            <span class="description placeholder-content" />
            <span class="description placeholder-content" />
            <span class="description placeholder-content" />
            <span class="description placeholder-content" />
          </div>
        </div>
      </div>
    </Strip>

    <Strip class="related-products full-width">
      <h1 class="center">You might like</h1>
      <ProductCarousel :products="relatedProducts" />
    </Strip>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from '../atoms/Strip.vue';
import Button from '../atoms/Button.vue';
import InputNumber from '../atoms/InputNumber.vue';
import ProductPageImageGrid from '../molecules/ProductPageImageGrid.vue';
import Breadcrumbs from '../molecules/Breadcrumbs.vue';
import ProductColorSelector from '../molecules/ProductColorSelector.vue';
import ProductPageSizeSelector from '../molecules/ProductPageSizeSelector.vue';
import ProductCarousel from '../organisms/ProductCarousel.vue';

import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
import Utilities from '../../utilities';

export default Vue.extend({
  components: {
    Strip,
    Breadcrumbs,
    ProductPageImageGrid,
    ProductColorSelector,
    ProductPageSizeSelector,
    ProductCarousel,
    InputNumber,
    Button
  },
  directives: {
    sticky: VueStickyDirective
  },
  data(){
    return {
      selectedVariantId: null,
      quantity: 1
    }
  },
  computed: {
    product(){
      return this.$store.state.products[this.$route.params.productHandle];
    },
    relatedProducts(){
      return this.$store.getters.relatedProducts(this.$route.params.productHandle, 8);
    },
    selectedVariant(){
      if(this.variants){
        return this.variants.find(variant => variant.id === this.selectedVariantId);
      }
      return null
    },
    selectedVariantPrice(){
      return this.selectedVariant ? Number(this.selectedVariant.price) : null
    },
    lowestVariantPrice(){
      return this.variants ? Math.min(...(this.variants.map(variant => Number(variant.price)))) : null
    },
    priceReadable(){
      return `$${this.selectedVariantPrice || this.lowestVariantPrice} USD`
    },
    title(){
      return this.product ? this.product.title : null
    },
    colors(){
      return this.$store.state.colorOptions[this.$route.params.productHandle]
    },
    options(){
      return this.product && this.product.options ? this.product.options : null
    },
    images(){
      if(this.product && this.product.images){
        return this.product.images;
      }
      return null
    },
    variants(){
      return this.product && this.product.variants ? this.product.variants : null
    },
    description(){
      return this.product ? this.product.descriptionHtml : null
    },
    selectedVariantIdDecoded(){
      return this.selectedVariantId ? atob(this.selectedVariantId).split('/').slice(-1)[0] : false;
    },
    showSizeSelector(){
      return this.product && this.product.options && this.product.options.find(option => option.name === 'Size');
    },
    sizeGuide(){
      if(this.product && this.product.metafields){
        const sizeGuide = this.product.metafields.find(metafield => metafield.key==='size_chart')
        if(sizeGuide){
          return sizeGuide.value;
        }
      }
      return null;
    },
    buyButtonLabel(){
      if(this.selectedVariant){
        return `Add to cart - $${ this.total }`
      }else if(this.showSizeSelector){
        return 'Select a Size';
      }else{
        return 'Select an Option';
      }
    },
    total(){
      return this.selectedVariant ? this.selectedVariant.price * this.quantity : null;
    },
    breadcrumbs(){
      const breadcrumbs = [];
      if(this.product){
        breadcrumbs.push({
          label: `${this.product.vendor} Merch`,
          url: {
            name: "Collection",
            params: {
              collectionHandle: this.product.vendor.toLowerCase()
            }
          }
        });
        if(this.$route.query.tag){
          breadcrumbs.push({
            label: Utilities.tagReadable(this.$route.query.tag),
            url: {
              name: "TagInCollection",
              params: {
                tag: this.$route.query.tag,
                collectionHandle: this.product.vendor.toLowerCase()
              }
            }
          });
        }
        breadcrumbs.push({
          label: this.product.title
        });
      }

      return breadcrumbs;
    },
    showPlaceholders(){
      return this.product ? false : true
    }
  },
  watch: {
    variants:{
      immediate: true,
      handler(){
        if(this.variants && this.variants.length === 1 && !this.selectedVariantId){
          this.selectedVariantId = this.variants[0].id
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchProductColorData(to.params.productHandle);
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProductColorData(to.params.productHandle);
    next();
  },
  methods: {
    fetchProductColorData(productHandle){
      // Load the product details
      this.$store.dispatch('loadProduct', productHandle).then(product => {

        // Load all products by this brand
        this.$store.dispatch('loadCollectionWithProducts', product.vendor);
      })

      // Load the color options.
      this.$store.dispatch('loadProductColorOptions', productHandle);
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
      if(this.selectedVariant){
        boosterCart.addToCart(event.currentTarget, event)
      }
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
  .VueCarousel{
    margin-right: -0.5em;
    margin-left: -0.5em;
  }
  .product-title{
    font-weight: 800;
    margin-bottom: 1em;
    font-size: 1.5em;
    line-height: 1.3em;
    .placeholder-content{
      width: 100%;
      height: 1.2em;
    }
  }
  .product-price{
    color: @gray2;
    font-weight: 800;
    margin-bottom: 1em;
    font-size: 1.2em;
    .placeholder-content{
      width: 50px;
    }
  }
  .product-color-selector{
    margin-bottom: 1em;
  }
  .product-size-selector{
    margin-bottom: 2em;
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
    display: flex;
    align-items: stretch;
    gap: 0.5em;
    z-index: 1;
    .placeholder-content{
      height: 3em;
      width: 100%;
    }
  }

  .note{
    padding: 1em;
    border-radius: 2px;
    background: #eee;
    margin-bottom: 1em;
    i{
      font-size: 1.25em;
      vertical-align: middle;
    }
  }

  .description table{
    font-size: 0.8em !important;
  }
  .description.placeholder-content{
    width: 100%;
  }
  .related-products{
    margin-top: 4rem;
    padding: 4em 50px !important;
    box-sizing: border-box;
    background: #F3F3F3;
    /deep/ .product-image img {
      filter: brightness(90%) !important;
    }
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
      margin-bottom: 2em;
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

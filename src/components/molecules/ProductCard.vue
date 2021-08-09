<template>
  <component :is="componentType" :class="{'product-card': true, placeholder }" :to="route" :disabled="product?false:true" role="tab" :aria-label="escape(title)" aria-hidden="false">
    <ProductImage :src="imageOne" :alt="altText" class="first" />
    <ProductImage :src="imageTwo || imageOne" :alt="altText" :class="{second: true, zoom:imageTwo?false:true}" :preload="true"/>
    <div v-if="showProductIcon" class="product-icon" :style="{color: $store.getters['brands/currentBrandColor']}" >
      <i :class="`uil uil-${showProductIcon}`"></i>
    </div>
    <div v-if="showProductPrice" class="product-price">
      {{ price }}
      <span v-if="placeholder" class="placeholder-content" />
    </div>
    <div v-if="showProductTitle" class="product-title">
      {{ title }}
      <span v-if="placeholder" class="placeholder-content" />
    </div>
    <div v-if="showProductColor && (color || placeholder)" class="product-color">
      {{ color }}
      <span v-if="placeholder" class="placeholder-content" />
    </div>
    <div v-if="showBuyButton">
      <FormAddToCart
        :selectedVariantIdDecoded="selectedVariantIdDecoded"
        :show-quantity-selector="false"
        :quantity="quantity"
        :buy-button-label="buyButtonLabel"
        @addToCart="$emit('addToCart', $event)"
      />
    </div>
  </component>
</template>
<script lang="ts">
import Vue from 'vue';
import Utilities from '../../utilities';
import FormAddToCart from "../molecules/FormAddToCart.vue";
import ProductImage from "../atoms/ProductImage.vue";

export default Vue.extend({
  props: {
    product: {
      type: Object
    },
    showProductTitle: {
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
    },
    showBuyButton: {
      type: Boolean,
      default: false
    },
  },
  components: {
    ProductImage,
    FormAddToCart
  },
  data(){
    return {
      quantity: 1
    }
  },
  computed:{
    componentType(){
      if(this.showBuyButton){
        return 'div'
      }else{
        return 'router-link';
      }
    },
    placeholder(){
      return this.product ? false : true
    },
    title() {
      return this.product && this.product.title ? this.product.title : ''
    },
    altText() {
      return this.color ? `${this.title}  - ${this.color}` : this.title
    },
    imageOne() {
      return this.product && this.product.images && this.product.images[0] ? this.product.images[0].src : ''
    },
    imageTwo(){
      return this.product && this.product.images && this.product.images[1] ? this.product.images[1].src : ''
    },
    price(){
      return this.product && this.product.variants ? `$${this.product.variants[0].price.replace('.00','')}` : '';
    },
    color(){
      if(this.product && this.product.metafields){
        const colorMetafield = this.product.metafields.find(metafield => metafield.key === 'color');
        return colorMetafield ? colorMetafield.value : null
      }
      return null;
    },
    variants(){
      return this.product && this.product.variants ? this.product.variants : null
    },
    selectedVariant(){
      if(this.variants){
        return this.variants.find(variant => variant.id === this.selectedVariantId);
      }
      return null
    },
    total(){
      return this.selectedVariant ? this.selectedVariant.price * this.quantity : null;
    },
    selectedVariantIdDecoded(){
      return this.selectedVariantId ? atob(this.selectedVariantId).split('/').slice(-1)[0] : false;
    },
    selectedVariantPrice(){
      return this.selectedVariant ? Number(this.selectedVariant.price) : null
    },
    buyButtonLabel(){
      if(this.selectedVariant){
        return `Add to Cart - $${ this.total }`
      }else{
        return 'Select an Option';
      }
    },
    route(){
      let route = {};
      if(this.product){
        route = {
          name: "ProductInCollection",
          params: {
            collectionHandle: Utilities.tagify(this.product.vendor),
            productHandle: this.product.handle
          }
        };

        if(this.$route.params.tag){
          route.query = { tag: this.$route.params.tag || '' }
        }
      }
      return route;
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
  methods: {
    escape: string => Utilities.escape(string)
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  a.product-card{
    cursor: pointer;
  }
  .product-card{
    display: block;
    position: relative;
    &:hover{
      .first{
        display: none;
      }
      .second{
        display: block;
      }
    }
    color: @black;
    text-decoration: none;
  }
  .product-image {
    &.second{
      display: none;
    }
    &.zoom /deep/ img{
      transform: scale(1.5);
    }
  }
  .product-title{
    margin-top: 0.75em;
    .placeholder-content{
      width: 200px;
    }
  }
  .product-price{
    font-weight: 700;
    float: right;
    margin-top: 0.75em;
    .placeholder-content{
      width: 50px;
    }
  }
  .product-color{
    font-size: 0.9em;
    color: @black;
    opacity: 0.75;
    .placeholder-content{
      width: 50px;
    }
  }
  .product-icon{
    position: absolute;
    background: black;
    height: 1.75em;
    width: 1.75em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    bottom: 1em;
    left: 1em;
    zoom: 1.25
  }
</style>

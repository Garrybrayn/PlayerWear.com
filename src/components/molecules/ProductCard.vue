<template>
  <component :is="componentType" :class="{'product-card': true, placeholder, 'sold-out': soldOut }" :to="route" :disabled="product?false:true" role="tab" :aria-label="escape(title)" aria-hidden="false">
    <ProductImage
      :src="imageOne"
      :alt="altText"
      class="first" />
    <ProductImage
      v-if="isDesktop()"
      :src="imageTwo || imageOne"
      :alt="altText"
      :class="{second: true, zoom:imageTwo?false:true}"
      :preload="true"
    />
    <div v-if="showProductIcon" class="product-icon" :style="{color: $store.getters['brands/currentBrandColor']}" >
      <IconSvg :name="showProductIcon" />
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
    <div v-if="soldOut" class="product-sold-out">
      SOLD OUT<IconSvg name="fire" />
    </div>
    <div v-if="showBuyButton">
      <FormAddToCart
        :selectedVariantIdDecoded="selectedVariantIdDecoded"
        :selectedVariantId="selectedVariantId"
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
import FormAddToCart from "../molecules/FormAddToCart.vue";
import IconSvg from "../atoms/IconSvg.vue";
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
    showPriceOnButton:{
      type: Boolean,
      default: true
    }
  },
  components: {
    ProductImage,
    FormAddToCart,
    IconSvg
  },
  data(){
    return {
      quantity: 1,
      selectedVariantId: null
    }
  },
  computed:{
    componentType(){
      if(this.showBuyButton){
        return 'router-link';
        // return 'div'
      }else{
        return 'router-link';
      }
    },
    placeholder(){
      return this.product ? false : true
    },
    title() {
      return this.product && this.product.title ? this.product.title : '';
    },
    altText() {
      return this.color ? `${this.title}  - ${this.color}` : this.title
    },
    imageOne() {
      if(this.product){
        if(this.product.images && this.product.images[0]){
          return this.product.images[0].src
        }else if(this.product.image){
          return this.product.image
        }
      }
      return '';
    },
    imageTwo(){
      return this.product && this.product.images && this.product.images[1] ? this.product.images[1].src : ''
    },
    price(){
      if(this.product){
        if(this.product.variants && this.product.variants[0]){
          return `$${this.product.variants[0].price.replace('.00','')}`
        }else if(this.product.price){
          return `$${this.product.price}`
        }
      }
      return '';
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
      return this.selectedVariantId && this.variants ? this.variants.find(variant => variant.id === this.selectedVariantId) : null
    },
    total(){
      return this.selectedVariant ? this.selectedVariant.price * this.quantity : 0;
    },
    soldOut() {
      return this.product && this.product.soldOut;
    },
    selectedVariantIdDecoded(){
      return this.selectedVariantId ? atob(this.selectedVariantId).split('/').slice(-1)[0] : false;
    },
    selectedVariantPrice(){
      return this.selectedVariant ? Number(this.selectedVariant.price) : null
    },
    buyButtonLabel(){
      if(this.total){
        return `Add to Cart${this.showPriceOnButton? `- $${ this.total }`:''}`
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
            collectionHandle: this.tagify(this.product.vendor),
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
        if(this.variants && this.variants.length === 1){
          this.selectedVariantId = this.variants[0].id
        }
      }
    }
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
    color: @black;
    text-decoration: none;
    font-size: 90%;
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
  .product-sold-out{
    font-size: 0.9em;
    color: @red;
    font-weight: 700;
  }

  @media(min-width: @firstbreakpoint){
    .product-card{
      font-size: 100%;
      &:hover{
        .first{
          display: none;
        }
        .second{
          display: block;
        }
      }
    }

  }
</style>

<template>
  <router-link :class="{'product-card': true, placeholder }" :to="route" :disabled="product?false:true">
    <ProductImage :src="imageOne" :alt="title" class="first" />
    <ProductImage :src="imageTwo || imageOne" :alt="title" :class="{second: true, zoom:imageTwo?false:true}" :preload="true"/>
    <div class="product-price">
      {{ price }}
      <span v-if="placeholder" class="placeholder-content" />
    </div>
    <div class="product-title">
      {{ title }}
      <span v-if="placeholder" class="placeholder-content" />
    </div>
    <div v-if="color || placeholder" class="product-color">
      {{ color }}
      <span v-if="placeholder" class="placeholder-content" />
    </div>
  </router-link>
</template>
<script lang="ts">
import Vue from 'vue';
import Utilities from '../../utilities';
import ProductImage from "../atoms/ProductImage.vue";

export default Vue.extend({
  props: {
    product: {
      type: Object
    }
  },
  components: {
    ProductImage
  },
  computed:{
    placeholder(){
      return this.product ? false : true
    },
    title() {
      return this.product && this.product.title ? this.product.title : null
    },
    imageOne() {
      return this.product && this.product.images && this.product.images[0] ? this.product.images[0].src : null
    },
    imageTwo(){
      return this.product && this.product.images && this.product.images[1] ? this.product.images[1].src : null
    },
    price(){
      return this.product && this.product.variants ? `$${this.product.variants[0].price.replace('.00','')}` : null;
    },
    color(){
      if(this.product && this.product.metafields){
        const colorMetafield = this.product.metafields.find(metafield => metafield.key === 'color');
        return colorMetafield ? colorMetafield.value : null
      }
      return null;
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
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .product-card{
    display: block;
    cursor: pointer;
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
    margin-bottom: 0.75em;
    &.second{
      display: none;
    }
    &.zoom /deep/ img{
      transform: scale(1.5);
    }
  }
  .product-title{
    .placeholder-content{
      width: 200px;
    }
  }
  .product-price{
    font-weight: 700;
    float: right;
    .placeholder-content{
      width: 50px;
    }
  }
  .product-color{
    font-size: 0.9em;
    color: @gray3;
    .placeholder-content{
      width: 50px;
    }
  }
</style>

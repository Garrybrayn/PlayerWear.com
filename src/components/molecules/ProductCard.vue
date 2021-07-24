<template>
  <div class="product-card" @click="$emit('click')">
    <ProductImage :src="product.images[0].src" :alt="product.title" class="first" />
    <ProductImage :src="product.images[1].src" :alt="product.title" class="second" :preload="true"/>
    <div class="product-price">
      ${{ product.variants[0].price.replace('.00','') }}
    </div>
    <div class="product-title">{{ product.title }}</div>
    <div v-if="color" class="product-color">{{ color }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
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
    color(){
      if(this.product.metafields){
        const colorMetafield = this.product.metafields.find(metafield => metafield.key === 'color');
        return colorMetafield ? colorMetafield.value : null
      }
      return null;
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .product-card{
    cursor: pointer;
    &:hover{
      .first{
        display: none;
      }
      .second{
        display: block;
      }
    }
  }
  .product-image {
    margin-bottom: 0.75em;
    &.second{
      display: none;
    }
  }
  .product-title{
  }
  .product-price{
    font-weight: 700;
    float: right;
  }
  .product-color{
    font-size: 0.9em;
    color: @gray1;
  }
</style>

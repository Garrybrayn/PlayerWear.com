<template>
  <div :class="{'product-card': true, placeholder: placeholder }" @click="$emit('click')">
    <ProductImage :src="imageOne" :alt="title" class="first" />
    <ProductImage :src="imageTwo" :alt="title" class="second" :preload="true"/>
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
    color: @gray1;
    .placeholder-content{
      width: 50px;
    }
  }
</style>

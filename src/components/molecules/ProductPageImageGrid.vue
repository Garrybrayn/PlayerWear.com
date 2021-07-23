<template>
  <div class="product-page-image-grid-container">
    <Carousel :per-page="1" pagination-position="bottom-overlay" pagination-color="rgba(128,128,128, 0.5)" pagination-active-color="rgba(128,128,128, 1)" :pagination-padding="5">
      <Slide v-for="(image, index) in images" :key="index">
        <ProductImage :src="image.src" :alt="image.altText || ''"/>
      </Slide>
    </Carousel>
    <div :class="{'product-page-image-grid': true, 'show-more-images': showMoreImages }">
        <ProductImage v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.altText || ''"/>
    </div>
    <Button v-if="images.length > 7" class="round" @click="showMoreImages = !showMoreImages">Show {{showMoreOrLessImagesLabel}} images</Button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';

import ProductImage from '../atoms/ProductImage.vue';
import Button from '../atoms/Button.vue';
export default Vue.extend({
  props: {
    images: {
      type: Array
    }
  },
  components: {
    Carousel,
    Slide,
    ProductImage,
    Button
  },
  data(){
    return {
      showMoreImages: false
    }
  },
  computed:{
    showMoreOrLessImagesLabel(){
      return this.showMoreImages ? 'less':'more';
    }
  },
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .product-page-image-grid-container{
    position: relative;
  }

  .VueCarousel {
    margin-right: 0 - @pagePadding;
    margin-left: 0 - @pagePadding;
  }

  .product-page-image-grid{
    display: none;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    .product-image{
      grid-column: span 4;
      &:nth-child(4), &:nth-child(7){
        grid-column: span 12;
      }
      &:nth-child(6), &:nth-child(5){
        grid-column: span 6;
      }
      &:nth-child(n+7){
        display: none;
      }
    }
    &.show-more-images .product-image:nth-child(n+7){
      display: block !important;
    }
  }

  /deep/ .VueCarousel-pagination{
    bottom: 10px;
  }

  button{
    position: absolute;
    bottom: 40px;
    width: 200px;
    left: 50%;
    margin-left: -100px;
    background: #0009;
    font-size: 0.9em;
    display: none;
    &:hover{
      background: #000;
    }
  }

  @media(min-width: @secondbreakpoint){
    .VueCarousel{
      display: none;
    }
    .product-page-image-grid {
      display: grid;
    }
    button {
      display: block;
    }
  }
</style>

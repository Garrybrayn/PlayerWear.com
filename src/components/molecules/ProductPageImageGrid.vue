<template>
  <div :class="`contains-${imagesToShow.length}`">
    <div class="product-page-image-grid-container">
      <Carousel class="mobile" :per-page="1" pagination-position="bottom-overlay" pagination-color="rgba(128,128,128, 0.5)" pagination-active-color="rgba(128,128,128, 1)" :pagination-padding="5">
        <Slide v-for="(image, index) in imagesToShow" :key="index">
          <ProductImage :src="image && image.src || null" :alt="`${alt} - Photo ${index + 1}`" />
        </Slide>
      </Carousel>
      <div :class="{'product-page-image-grid': true, 'show-more-images': showMoreImages }">
          <ProductImage v-for="(image, index) in imagesToShow" :key="index" :src="image && image.src || null" :alt="`${alt} - Photo ${index + 1}`" @click.native="selectedImageIndex = index"/>
      </div>
      <Button v-if="images && images.length > 7" class="button-show-more round" @click="showMoreImages = !showMoreImages">Show {{showMoreOrLessImagesLabel}} images</Button>
    </div>
    <Modal v-if="selectedImageIndex !== false" @close="selectedImageIndex=false">
      <Carousel class="desktop" :navigateTo="[selectedImageIndex, false]" :per-page="1" pagination-position="bottom-overlay" pagination-color="rgba(128,128,128, 0.5)" pagination-active-color="rgba(128,128,128, 1)" :pagination-padding="5">
        <Slide v-for="(image, index) in imagesToShow" :key="index">
          <img :src="image && image.src" :alt="`${alt} - Photo ${index + 1}`" @load="$event.target.style.opacity=1" />
        </Slide>
      </Carousel>
    </Modal>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';

import Modal from '../molecules/Modal.vue';
import Button from '../atoms/Button.vue';
import ProductImage from '../atoms/ProductImage.vue';
export default Vue.extend({
  props: {
    images: {
      type: Array
    },
    alt: {
      type: String,
      default: ''
    }
  },
  components: {
    Button,
    Carousel,
    Slide,
    ProductImage,
    Modal
  },
  data(){
    return {
      showMoreImages: false,
      selectedImageIndex: false
    }
  },
  computed:{
    imagesToShow(){
      return this.images ? this.images : [{},{},{},{}];
    },
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

  .VueCarousel.mobile {
    margin-right: 0 - @pagePadding;
    margin-left: 0 - @pagePadding;
  }

  .VueCarousel.desktop{
    flex: 1;
    width: 100%;
    text-align: center;
    height: 100%;
    max-height: 100vh;
    justify-content: center;
    align-items: center;
    /deep/ .VueCarousel-inner{
      max-height: 100vh;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0;
      transition: opacity 250ms;
    }
  }

  .product-page-image-grid{
    display: none;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    .product-image{
      grid-column: span 4;
      cursor: zoom-in;
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
  .contains-1 .product-image{
    grid-column: span 12;
  }
  .contains-2 .product-image{
    grid-column: span 6;
  }
  .contains-3 .product-image{
    grid-column: span 6;
    &:nth-child(3){
      grid-column: span 12;
    }
  }

  /deep/ .VueCarousel-pagination{
    bottom: 10px;
  }

  /deep/ .VueCarousel-dot[aria-selected=true]{
    transform: scale(1.25);
  }
  /deep/ .VueCarousel-dot[aria-selected=false]{
    transform: scale(.7);
  }
  .button-show-more{
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

  .modal{
    background: white;
  }


  @media(min-width: @secondbreakpoint){
    .VueCarousel.mobile{
      display: none;
    }
    .product-page-image-grid {
      display: grid;
    }
    .button-show-more {
      display: block;
    }
  }
</style>

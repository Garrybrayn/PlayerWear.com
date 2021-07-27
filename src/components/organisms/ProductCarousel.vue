<template>
  <Carousel class="product-carousel"
      :per-page="slidesPerPage"
      :pagination-enabled="true"
      :navigation-enabled="navigationEnabled"
      :pagination-padding="8"
      pagination-position="bottom-overlay"
      pagination-color="rgba(128,128,128, 0.5)"
      pagination-active-color="rgba(128,128,128, 1)"
      :scrollPerPage="false">
    <Slide v-for="(product, index) in products" :key="index">
      <ProductCard :product="product" />
    </Slide>
  </Carousel>
</template>
<script lang="ts">
import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import ProductCard from '../molecules/ProductCard.vue';
export default Vue.extend({
  props: {
    products: {
      type: Array
    },
    slideWidth: {
      type: Number,
      default: 300
    }
  },
  components: {
    Carousel,
    Slide,
    ProductCard
  },
  data(){
    return {
      parentWidth: null
    }
  },
  computed:{
    slidesPerPage(){
      return Math.max(
          Math.floor(this.parentWidth / this.slideWidth),
          1
      );
    },
    navigationEnabled(){
      return this.parentWidth >= 800;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.parentWidth = this.$parent.$el.offsetWidth;
    }
  }
});
</script>
<style scoped lang="less">
  .VueCarousel-slide{
    box-sizing: border-box;
  }
  /deep/ .VueCarousel-navigation--disabled{
    opacity: 0;
  }
  /deep/ .VueCarousel-dot[aria-selected=true]{
    transform: scale(1.25);
  }
  /deep/ .VueCarousel-dot[aria-selected=false]{
    transform: scale(.7);
  }
</style>

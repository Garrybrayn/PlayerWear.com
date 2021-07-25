<template>
  <Carousel class="product-carousel" :per-page="slidesPerPage" :pagination-enabled="false" :navigation-enabled="true" :pagination-padding="5" :scrollPerPage="false">
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
      return Math.floor(this.parentWidth / this.slideWidth);
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
  .VueCarousel{
    margin-right: -0.5em;
    margin-left: -0.5em;
  }
  .VueCarousel-slide{
    padding: 0.5em;
    box-sizing: border-box;
  }
  /deep/ .VueCarousel-navigation--disabled{
    opacity: 0;
  }
</style>

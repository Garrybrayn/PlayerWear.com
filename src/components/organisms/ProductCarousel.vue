<template>
  <Carousel class="product-carousel"
      :per-page="slidesPerPage"
      :pagination-enabled="paginationEnabled"
      :navigation-enabled="navigationEnabled"
      :pagination-padding="8"
      pagination-position="bottom-overlay"
      pagination-color="rgba(128,128,128, 0.5)"
      pagination-active-color="rgba(128,128,128, 1)"
      :scrollPerPage="false">
    <Slide v-for="(product, index) in products" :key="index">
      <ProductCard
        :product="product"
        :show-product-title="showProductTitle"
        :show-product-price="showProductPrice"
        :show-product-color="showProductColor"
        :show-product-icon="showProductIcon"
        :show-buy-button="showBuyButton"
        @addToCart="$emit('addToCart', $event)"
      />
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
    },
    showProductTitle: {
      type: Boolean,
      default: true
    },
    showBuyButton: {
      type: Boolean,
      default: false
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
    paginationEnabled: {
      type: Boolean,
      default: true
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
      return Math.min(
        Math.max(
          Math.floor(this.parentWidth / this.slideWidth),
          1
        ),
        this.products.length
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
  @import '../../less/variables';
  .VueCarousel-slide{
    box-sizing: border-box;
    padding: @pagePadding;
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

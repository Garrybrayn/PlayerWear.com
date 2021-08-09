<template>
  <Page :top-spacing="true" :bottom-spacing="true">
    <div class="button-container">
      <Button label="Continue to Checkout" class="primary chevron" :has-chevron="true" @click="checkout"/>
    </div>
    <Strip class="narrow">
      <div class="heading-1 center">You might also like</div>
      <ProductCarousel :products="products" :show-buy-button="true" :slide-width="300" @addToCart="$emit('addToCart', $event)"/>
    </Strip>
    <div class="button-container">
      <Button label="Continue to Checkout" class="primary chevron" :has-chevron="true" @click="checkout"/>
    </div>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from '../atoms/Strip';
import Page from '../atoms/Page';
import Button from '../atoms/Button';
import ProductCarousel from '../organisms/ProductCarousel';

export default Vue.extend({
  components: {
    Page,
    Strip,
    Button,
    ProductCarousel
  },
  metaInfo(){
    return {
      title: 'Checkout'
    }
  },
  computed: {
    products(){
      return this.$store.getters['cart/upsellProducts'](3);
    }
  },
  beforeMount() {
    this.$store.dispatch('cart/initialize').then(() => {
      this.$store.dispatch('cart/loadUpsellProducts')
    })
  },
  methods: {
    checkout(){
      window.location.href = '/checkout';
    }
  }
});
</script>
<style scoped lang="less">
@import "../../less/variables";
  /deep/ .VueCarousel-inner{
  }
  /deep/ .VueCarousel-slide{
    padding: 0.5em !important;
  }
  button {
    width: 100%;
  }
  @media(min-width: @secondbreakpoint){
    button {
      width: auto;
      display: inline-block;
    }
    .button-container{
      text-align: right;
    }
  }
</style>

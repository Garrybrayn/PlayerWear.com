<template>
  <Page :top-spacing="true" :bottom-spacing="true">
    <h1>You might also like</h1>
    <Button label="Continue to Checkout" class="primary chevron" :has-chevron="true" @click="checkout"/>
    <ProductCarousel :products="products" :show-buy-button="true" :slide-width="400"/>
    <Button label="Continue to Checkout" class="primary chevron" :has-chevron="true" @click="checkout" />
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from '../atoms/Page';
import Button from '../atoms/Button';
import ProductCarousel from '../organisms/ProductCarousel';

export default Vue.extend({
  components: {
    Page,
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
  button {
    float: right;
  }
</style>

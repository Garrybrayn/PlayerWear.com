<template>
  <Page :top-spacing="false" :bottom-spacing="true" class="full-width">
    <Strip class="really-narrow button-container desktop">
      <Button label="Continue to Checkout" class="primary chevron" :has-chevron="true" @click="checkout"/>
    </Strip>
    <Strip class="really-narrow">
      <div class="heading-1 center">You might also like</div>
      <ProductGrid
        role="navigation"
        aria-label="Brand Navigation"
        :products="products"
        :showBuyButton="true"
        :showPriceOnButton="false"
        @addToCart="$emit('addToCart', $event)"
      />
    </Strip>
    <Strip class="really-narrow button-container mobile">
      <Button label="Continue to Checkout" class="primary chevron" :has-chevron="true" @click="checkout"/>
    </Strip>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from '../atoms/Strip';
import Page from '../atoms/Page';
import Button from '../atoms/Button';
import ProductGrid from '../organisms/ProductGrid';
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  components: {
    Page,
    Strip,
    Button,
    ProductGrid
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
      this.$store.dispatch('cart/checkout');
    }
  }
});
</script>
<style scoped lang="less">
  @import "../../less/variables";
  button {
    width: 100%;
  }
  .desktop.button-container {
    display: none;
  }
  .mobile.button-container {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    z-index: 2;
    box-shadow: 0 0 2em #0005;
    background: white;
    button {
      margin: 0;
    }
  }

  @media(min-width: @secondbreakpoint){
    /deep/ .VueCarousel-inner{
      font-size: inherit;
    }
    .desktop.button-container{
      display: block;
    }
    .mobile.button-container{
      position: relative !important;
      box-shadow: none;
      button{
        margin: revert;
      }
    }
    button {
      width: auto;
      display: inline-block;
    }
    .button-container{
      text-align: right;
    }
  }
</style>

<template>
  <div class="product-image">
    <img :src="src" loading="lazy" :alt="alt" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true,
      default: "Product Image"
    }
  }
});
</script>
<style scoped lang="less">
  .product-image{
    position: relative;
    overflow: hidden;
    &:after{
      display: block;
      content: "";
      padding-bottom: 122%;
    }
    img{
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      filter: brightness(94%);
    }
  }
</style>

<template>
  <div class="product-image">
    <img :src="src" loading="lazy" :alt="alt" @load="$event.target.style.opacity=1"/>
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
      filter: brightness(94%);
      object-fit: cover;
      opacity: 0;
      transition: opacity 250ms;
    }
  }
</style>

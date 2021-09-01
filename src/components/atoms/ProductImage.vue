<template>
  <div :class="{'product-image': true, placeholder: !loaded }">
    <img
      v-if="src"
      :src="src"
      :srcset="srcset"
      loading="lazy"
      :class="{loaded: loaded}"
      :alt="escape(alt)"
      @load="loaded = true"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: false
    },
    alt: {
      type: String,
      required: true,
      default: "Product Image"
    },
    preload: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      loaded: false
    }
  },
  computed: {
    srcset(){
      return [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(width => {
        return `${this.src.replace('.jpg', `_${width}x.jpg`)} ${width}w`
      }).join(',')
     }
  },
  watch:{
    src:{
      immediate: true,
      handler(){
        this.loaded = false;
        if(this.src && this.preload){
          this.preloadImage();
        }
      }
    }
  },
  methods: {
    preloadImage(){
      const image = new Image();
      image.src = this.src;
    }
  }
});
</script>
<style scoped lang="less">
  .product-image{
    position: relative;
    overflow: hidden;
    background: #eee;
    transition: background 2s;
    &:after{
      display: block;
      content: "";
      padding-bottom: 122%;
    }
    &.placeholder{
      animation: pulse 1.5s ease infinite;
    }
    img{
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      filter: brightness(94%);
      object-fit: cover;
      opacity: 0;
      transition: opacity 200ms;
      &.loaded {
        opacity: 1;
      }
    }
  }
</style>

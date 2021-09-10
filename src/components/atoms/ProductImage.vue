<template>
  <div :class="{'product-image': true, placeholder: !showImage }">
    <img
      loading="lazy"
      :src="srcLarge"
      :srcset="srcset"
      :sizes="sizes"
      :class="{visible: showImage}"
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
    sizes: {
      type: String,
      default: "(max-width: 412px) 50vw, (max-width: 800px) 33vw, 500px"
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
    showImage(){
      return this.loaded || this.isSsr || process.server;
    },
    srcLarge(){
      if(this.src) {
        return this.src;
        // TODO: FIX THIS BY IMPLEMENTING A CDN THAT AUTO-RESIZES IMAGES
        // return this.src.replace('.jpg', `_1000x.jpg`)
      }else{
        return './1x1.png'
      }
    },
    srcset(){
      // TODO: FIX THIS BY IMPLEMENTING A CDN THAT AUTO-RESIZES IMAGES
      // if(this.src) {
      //   return [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(width => {
      //     return `${this.src.replace('.jpg', `_${width}x.jpg`)} ${width}w`
      //   }).join(',')
      // }else{
      //   return null;
      // }
      return null;
    }
  },
  watch:{
    srcLarge:{
      immediate: true,
      handler(){
        this.loaded = false;
        if(process.client){
          if(this.srcLarge && this.preload){
            const image = new Image();
            image.src = this.srcLarge;
          }
        }
      }
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
      transition: opacity 300ms;
      &.visible {
        opacity: 1;
      }
    }
  }
</style>

<template>
  <div :class="{'product-image': true, placeholder: src ? false : true}">
    <img v-if="src" :src="src" loading="lazy" :class="{loaded: loaded}" :alt="escape(alt)" @load="loaded = true"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Utilities from '../../utilities';

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
    },
    escape(string){
      return Utilities.escape(string);
    }
  }
});
</script>
<style scoped lang="less">
  .product-image{
    position: relative;
    overflow: hidden;
    background:#eee;
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
      transition: opacity 150ms;
      &.loaded {
        opacity: 1;
      }
    }
  }
</style>

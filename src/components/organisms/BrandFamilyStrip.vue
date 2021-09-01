<template>
  <Strip class="full-width">
    <div class="heading-1 center">
      Related Brands
    </div>
    <div class="brand-logos-container">
      <Strip class="really-narrow">
        <router-link
          v-for="(brand, index) in $store.getters['brands/currentBrandRelatedBrands']"
          :key="index"
          class="brand-logo-container"
          :to="{
            name: 'BrandHome',
            params: {
              collectionHandle: brand
            }
          }"
        >
          <img :src="assetUrl(`${brand}-logo.svg`)" />
        </router-link>
      </Strip>
    </div>

  </Strip>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from "../atoms/Strip.vue";

export default Vue.extend({
  components: {
    Strip
  }
});
</script>
<style scoped lang="less">
  @import "../../less/variables";

  .brand-logos-container{
    background: @gray0;
    section{
      display: grid;
      justify-content: center;
      gap: 1em;
      padding: 2em 0;
    }
  }
  .brand-logo-container{
    background: @black;
    width: 300px;
    height: 57px;
    padding: 3em 1em;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  @media(min-width: @secondbreakpoint){
    .brand-logos-container section{
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

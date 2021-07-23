<template>
  <div class="product-size-selector">
    <div v-for="sizeVariant in sizeVariants"
       :key="sizeVariant.value"
       :class="{
         available: sizeVariant.available,
         selected: sizeVariant.selected
       }"
       @click="$emit('select', sizeVariant.id)">
      {{sizeVariant.label}}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    options: {
      type: Array
    },
    variants: {
      type: Array
    },
    selectedVariantId: {
      type: String
    }
  },
  data(){
    return {
      selectedSize: null
    }
  },
  computed:{
    sizeVariants(){
      return this.variants.map(variant => {
        return {
          label: variant.selectedOptions[0].value,
          available: variant.available,
          selected: variant.id === this.selectedVariantId,
          id: variant.id
        }
      })
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .product-size-selector{
    height: 40px;
    display: flex;
    width: 100%;
    align-content: stretch;
    justify-content: space-between;
    gap: 10px;
    div{
      border:1px solid black;
      border-radius: 2px;
      flex-grow: 1;
      flex-basis: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.selected{
        color: #fff;
        background: #000;
      }
    }
  }

  @media(min-width: @fourthbreakpoint){
    .product-size-selector{
      height: 50px;
    }
  }
</style>

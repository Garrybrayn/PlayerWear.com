<template>
  <div class="product-color-selector">
    <ProductImage v-for="option in options"
      :key="option.value"
      :class="{ selected: option.handle === value }"
      :src="option.image"
      :alt="option.value"
      @click.native="$emit('select', option.handle)"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ProductImage from '../atoms/ProductImage.vue';

export default Vue.extend({
  props: {
    options: {
      type: Array
    },
    value: {
      type: String
    }
  },
  components: {
    ProductImage
  },
  data(){
    return {
      selectedColor: null
    }
  },
  computed:{

  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .product-color-selector{
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: stretch;
    gap: 10px;
    > div{
      border-radius: 2px;
      max-width: 75px;
      flex-grow: 1;
      flex-basis: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border:1px solid transparent;
      &.selected{
        border:1px solid black;
      }
      img{

      }
    }
  }

  @media(min-width: @fourthbreakpoint){

  }
</style>

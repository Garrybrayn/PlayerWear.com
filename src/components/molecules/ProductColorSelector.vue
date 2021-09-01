<template>
  <div class="product-color-selector">
    <label><span class="bold">COLOR:</span> {{ colorLabel }}</label>
    <div class="product-color-list">
      <ProductImage v-for="(option, index) in options"
        :key="index"
        :class="{ selected: option.handle === value }"
        :src="option.image"
        :alt="`Select Color ${option.label}`"
        @click.native="$emit('select', option.handle)"
        @mouseover.native="hoveredOption = option"
        @mouseout.native="hoveredOption = null"
      />
    </div>
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
    },
    alt: {
      type: String
    }
  },
  components: {
    ProductImage
  },
  data(){
    return {
      hoveredOption: null
    }
  },
  computed: {
    colorLabel(){
      return this.hoveredOption ? this.hoveredOption.label : this.selectedColor ? this.selectedColor.label : null;
    },
    selectedColor() {
      return this.options ? this.options.find(option => option.handle === this.value) : null;
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';


  label {
    margin-bottom: 0.5em;
  }
  .bold{
    font-weight: 800;
  }
  .safari-only{
    .product-color-list{
      > * + *{
        margin-left: 10px;
        margin-bottom: 10px;
      }
    }
  }
  .product-color-list{
    margin-top: 0.5em;
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

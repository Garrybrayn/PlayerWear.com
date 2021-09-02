<template>
  <div class="product-size-selector">
    <label>
      <b>SIZE:</b>
      <span v-if="sizeGuide" @click="$emit('clickShowSizeGuide')" role="link" aria-label="View Size Guide">
        <IconSvg name="shirt-filled" style="font-size: 1.25em; margin-right: 0.25em;" />Size Guide
      </span>
    </label>
    <div class="product-size-options">
      <div v-for="(sizeVariant, index) in sizeVariants"
         :key="index"
         :class="{
           'product-size-option': true,
           'sold-out': !sizeVariant.available,
           selected: sizeVariant.selected
         }"
         :aria-label="`Select Size ${sizeVariant.label}`"
         :aria-selected="sizeVariant.selected"
         @click="sizeVariant.available ? $emit('select', sizeVariant.id) : null"
      >
        {{sizeVariant.label}}
        <IconSvg name="x" v-if="!sizeVariant.available" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import IconSvg from "../atoms/IconSvg.vue";

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
    },
    sizeGuide: {
      type: String
    }
  },
  components: {
    IconSvg
  },
  computed:{
    sizeVariants(){
      if(this.variants){
        return this.variants.map(variant => {
          return {
            label: variant.selectedOptions[0].value,
            available: variant.availableForSale,
            selected: variant.id === this.selectedVariantId,
            id: variant.id
          }
        })
      }
      return null
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  label span{
    float: right;
    font-weight: bolder;
    text-decoration: underline;
    cursor: pointer;
  }
  .safari-only{
    .product-size-options{
      > * + *{
        margin-left: 10px;
      }
    }
    .product-size-option{
      margin-bottom: 10px;
    }
  }
  .product-size-options{
    margin-top: 0.5em;
    display: flex;
    width: 100%;
    align-content: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    .product-size-option{
      min-height: 40px;
      border:1px solid black;
      border-radius: 2px;
      flex-grow: 1;
      flex-basis: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      white-space: nowrap;
      padding: 0 0.75em;
      &.selected{
        color: #fff;
        background: #000;
      }
      &.sold-out{
        color: @gray3;
        border-color: @gray4;
        background: fade(@gray5, 50%);
        cursor: default;
        position: relative;
        overflow: hidden;
        .x{
          position: absolute;
          top: 50%;
          margin-top: -0.5em;
          font-size: 60px;
          opacity: 0.2;
          color: @gray4;
        }
      }
    }
  }
  .modal /deep/ .table-responsive{
    table{
      tbody td{
        padding: 0.5em 0.75em;
      }
      tbody tr:nth-child(odd){
        background-color: #eee;
      }
    }
  }

  @media(min-width: @thirdbreakpoint){
    .size-guide-container{
      padding: 40px 2em 50px 2em;
    }
  }
  @media(min-width: @fourthbreakpoint){
    .product-size-options div{
      min-height: 50px;
    }
  }
</style>

<template>
  <div class="product-size-selector">
    <label>
      <b>SIZE:</b>
      <span v-if="sizeGuide" @click="showSizeGuide=true">Size Guide</span>
    </label>
    <div class="product-size-options">
      <div v-for="(sizeVariant, index) in sizeVariants"
         :key="index"
         :class="{
           available: sizeVariant.available,
           selected: sizeVariant.selected
         }"
         @click="$emit('select', sizeVariant.id)">
        {{sizeVariant.label}}
      </div>
    </div>
    <Modal v-if="showSizeGuide" @close="showSizeGuide=false">
      <div v-html="sizeGuide" class="size-guide-container"/>
    </Modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Modal from '../molecules/Modal.vue';

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
    Modal
  },
  data(){
    return {
      showSizeGuide: false
    }
  },
  computed:{
    sizeVariants(){
      if(this.variants){
        return this.variants.map(variant => {
          return {
            label: variant.selectedOptions[0].value,
            available: variant.available,
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
  .product-size-options{
    margin-top: 0.5em;
    display: flex;
    width: 100%;
    align-content: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    div{
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
    }
  }
  /deep/ .size-guide-container{
    background: white;
    padding: 2em 1em !important;
    p {
      font-size: 2em;
      text-align: center;
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

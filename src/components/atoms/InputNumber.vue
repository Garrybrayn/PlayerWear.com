<template>
  <div class="input-number">
    <label :for="`quantity-${uniqueKey}`" style="display: none;">Quantity</label>
    <span @click="$emit('change', Math.max(value - 1, min))" aria-label="Decrease Quantity">-</span>
    <input type="text" :value="value" @change="$emit('change', Number($event.target.value))" :min="min" :max="max" :id="`quantity-${uniqueKey}`"/>
    <span @click="$emit('change', Math.min(value + 1, max))" aria-label="Increase Quantity">+</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: Number
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 20
    },
    uniqueKey: {
      type: String,
      required: true
    }
  }
});
</script>
<style scoped lang="less">
  .input-number{
    display: flex;
    border:1px solid black;
    border-radius: 2px;
    span{
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 0;
      width: 25px;
      cursor: pointer;
    }
    input{
      flex-grow: 2;
      border: none;
      background: none;
      border-right: 1px solid black;
      border-left: 1px solid black;
      text-align: center;
      width: 40px;
      border-radius: 0;
      margin-bottom: 0 !important;
      font-size: inherit;
    }
  }
</style>

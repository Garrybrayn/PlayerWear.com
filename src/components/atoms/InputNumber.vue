<template>
  <div class="input-number">
    <span @click="$emit('change', Math.max(value - 1, min))">-</span>
    <input type="number" :value="value" @change="$emit('change', $event.value)" :min="min" :max="max"/>
    <span @click="$emit('change', Math.min(value + 1, max))">+</span>
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
  }
});
</script>
<style scoped lang="less">
  .input-number{
    display: flex;
    border:1px solid black;
    height: 40px;
    border-radius: 2px;
    span{
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 0;
      width: 40px;
    }
    input{
      flex-grow: 2;
      border: none;
      background: none;
      border-right: 1px solid black;
      border-left: 1px solid black;
      text-align: center;
    }
  }
</style>

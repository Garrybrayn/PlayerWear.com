<template>
  <div class="progress-spinner" />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
<style scoped lang="less">
  @import '../../less/variables';

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .progress-spinner{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    &.center{
      margin:0 auto;
    }
  }

  .progress-spinner:before {
    content: '';
    box-sizing: border-box;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid @gray3;
    border-top-color: @gray3;
    border-right-color: @gray5;
    border-bottom-color: @gray5;
    animation: spinner .6s linear infinite;
    opacity: 0.75;
    float: left;
  }
</style>

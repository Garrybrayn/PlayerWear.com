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
  }

  .progress-spinner:before {
    content: '';
    box-sizing: border-box;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid @grayLightMedium;
    border-top-color: @grayLightMedium;
    border-right-color: @grayDark;
    border-bottom-color: @grayDark;
    animation: spinner .6s linear infinite;
    opacity: 0.75;
    float: left;
  }
</style>

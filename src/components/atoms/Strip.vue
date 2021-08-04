<template>
  <section>
    <slot />
  </section>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  section {
    margin:0 auto;
    width: 100%;
    max-width: @fourthbreakpoint;
    padding-left: @pagePadding;
    padding-right: @pagePadding;
    box-sizing: border-box;
    &.full-width{
      max-width: none;
      padding-left: 0;
      padding-right: 0;
    }
    &.narrow{
      width: 80%;
    }
    &.really-narrow{
      width: 70%;
    }
  }
</style>

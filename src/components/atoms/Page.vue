<template>
  <main :class="{'top-spacing': topSpacing, 'bottom-spacing': bottomSpacing}">
    <slot />
  </main>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    topSpacing: {
      type: Boolean,
      default: false
    },
    bottomSpacing: {
      type: Boolean,
      default: false
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  main {
    margin:0 auto;
    width: 100%;
    max-width: @fourthbreakpoint;
    padding-left: @pagePadding;
    padding-right: @pagePadding;
    box-sizing: border-box;
    min-height: 800px;
    &.full-width{
      max-width: none;
      padding-left: 0;
      padding-right: 0;
    }
    &.top-spacing{
      padding-top: 1em;
    }
    &.bottom-spacing{
      padding-bottom: 2em;
    }
    &.narrow-fixed{
      max-width: 1000px;
    }
    &.really-narrow-fixed{
      max-width: 600px;
    }
  }

  @media(min-width: @secondbreakpoint){
    main {
      &.narrow, &.narrow-fixed{
        width: 80%;
      }
      &.really-narrow, &.really-narrow-fixed{
        width: 70%;
      }
    }
  }

  @media(min-width:@thirdbreakpoint){
    main.top-spacing{
      padding-top: 50px;
    }
    main.bottom-spacing{
      padding-bottom: 50px;
    }
  }

  @media(min-width:@fourthbreakpoint){
    main.top-spacing{
      padding-top: 90px;
    }
    main.bottom-spacing{
      padding-bottom: 90px;
    }
  }

</style>

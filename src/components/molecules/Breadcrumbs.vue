<template>
  <h1 class="page-breadcrumbs">
    <span class="page-breadcrumb" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
      <component :is="breadcrumb.url ? 'router-link' : 'span'" :to="breadcrumb.url">
        {{breadcrumb.label}}
      </component>
    </span>
  </h1>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  }
});
</script>
<style scoped lang="less">
  .page-breadcrumbs{
    font-weight: 600;
    line-height: 1rem;
    margin: 0;
    padding: 1.25rem 0 !important;
  }
  a, span{
    color: black;
    text-decoration: none;
  }
  .page-breadcrumb{
    font-size: 0.8rem;
    display: inline;
    text-decoration: none;
    text-transform: none;
    &:not(:last-child):after{
      display: inline;
      content:'/';
      padding: 0.75em;
    }
  }
</style>

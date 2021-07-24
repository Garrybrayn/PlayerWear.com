<template>
  <div class="page-breadcrumbs">
    <div class="page-breadcrumb" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
      <router-link v-if="breadcrumb.url" :to="breadcrumb.url">{{breadcrumb.label}}</router-link>
      <span v-if="!breadcrumb.url">{{breadcrumb.label}}</span>
    </div>
  </div>
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
    font-size: 0.8rem;
    font-weight: 600;
    padding: 1.25em 0;
  }
  a, span{
    color: black;
    text-decoration: none;
  }
  .page-breadcrumb{
    display: inline;
    text-decoration: none;
    &:not(:last-child):after{
      display: inline;
      content:'/';
      padding: 0.75em;
    }
  }
</style>

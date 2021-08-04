<template>
  <div class="page-breadcrumbs">
    <h1 class="page-breadcrumb" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
      <router-link v-if="breadcrumb.url" :to="breadcrumb.url">{{breadcrumb.label}}</router-link>
      <span v-if="!breadcrumb.url">{{breadcrumb.label}}</span>
    </h1>
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
    font-weight: 600;
    padding: 1.25em 0;
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

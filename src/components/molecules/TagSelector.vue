<template>
  <div class="tag-selector">
    <label v-if="title">{{ title }}</label>
    <ul>
      <li v-for="(tag, index) in options" :key="index">
        <router-link :to="tag.link" role="link" :aria-label="tag.name">{{ tag.label }}</router-link>
      </li>
    </ul>
    <select :value="value" @change="onChange">
      <option v-for="option in options" :key="option.value" :value="JSON.stringify(option.link)" :selected="option.selected">{{option.label}}</option>
    </select>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String
    },
    options: {
      type: Array
    },
    value: {
      type: String,
    }
  },
  methods: {
    onChange(e){
      this.$router.push(JSON.parse(e.target.value))
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .tag-selector{
    line-height: 2em;
    margin-bottom: 1em;
  }
  label {
    color: @gray1;
    font-weight: 700;
    text-transform: uppercase;
    display: none;
  }
  ul, li{
    padding:0;
    margin:0;
    display: none;
  }
  a{
    color: @black;
    font-weight: 600;
    text-transform: capitalize;
    text-decoration: none;
    &.router-link-exact-active {
      border-bottom: 1px solid black;
    }
  }
  select{
    text-transform: capitalize;
    width: 100%;
    font: inherit;
    padding: 0.5em;
    box-sizing: border-box;
  }
  @media(min-width: @thirdbreakpoint){
    label, ul, li{
      display: block;
    }
    select{
      display: none;
    }
    .tag-selector{
      margin-bottom: 2em;
    }
  }
</style>

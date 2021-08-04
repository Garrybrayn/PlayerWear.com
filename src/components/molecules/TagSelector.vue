<template>
  <div class="tag-selector">
    <label v-if="title">{{ title }}</label>
    <ul>
      <li v-for="(tag, index) in options" :key="index">
        <router-link :to="tag.link">{{ tag.label }}</router-link>
      </li>
    </ul>
    <v-select :value="value" :options="options" @input="$router.push($event.link)"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

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
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .tag-selector{
    line-height: 2em;
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
  .v-select{
    text-transform: capitalize;
    margin-bottom: 1em;
  }
  @media(min-width: @thirdbreakpoint){
    label, ul, li{
      display: block;
    }
    .v-select{
      display: none;
    }
  }
</style>

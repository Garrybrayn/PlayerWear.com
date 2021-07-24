<template>
  <div class="tag-selector">
    <label>{{ title }}</label>
    <ul>
      <li v-for="(tag, index) in options" :key="index">
        <router-link :to="tag.link">{{ tag.label }}</router-link>
      </li>
    </ul>
    <v-select :value="currentTag" :options="options" @input="$router.push($event.link)"/>
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
      type: String,
      default: "Merch Type"
    },
    tags: {
      type: Array
    }
  },
  computed:{
    options(){
      return this.tags.map(tag => this.getTagDetails(tag))
    },
    currentTag(){
      return this.getTagDetails(this.$route.params.tag || "")
    }
  },
  methods: {
    getTagDetails(tag){
      return {
        value: tag,
        label: tag.replace(/-/ig,' ').replace(' and ', ' & '),
        link: {
          name: 'TagInCollection',
          params: {
            collection: this.$route.params.collection ? this.$route.params.collection : null,
            tag
          }
        },
        selected: this.$route.params.tag === tag
      }
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

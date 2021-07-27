<template>
  <Page v-html="htmlContents" :top-spacing="true" :bottom-spacing="true"/>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from '../atoms/Page';

export default Vue.extend({
  components: {
    Page
  },
  computed: {
    htmlContents(){
      const page = this.$store.state.pages.pages[this.$route.params.pageHandle];
      return page ? page.body : null;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchPage(to.params.pageHandle);
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchPage(to.params.pageHandle);
    next();
  },
  methods: {
    fetchPage(pageHandle) {
      // Load the product details
      this.$store.dispatch('pages/fetch', pageHandle)
    },
  }
});
</script>
<style scoped lang="less">

</style>

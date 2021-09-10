<template>
  <Page v-html="htmlContents" :top-spacing="true" :bottom-spacing="true"/>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from '../atoms/Page';
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  components: {
    Page
  },
  computed: {
    page(){
      return this.$store.state.pages.pages[this.$route.params.pageHandle];
    },
    pageTitle(){
      return this.page ? this.page.title : null;
    },
    htmlContents(){
      return this.page ? this.page.body : null;
    }
  },
  watch:{
    htmlContents(){
      if(this.$route.params.hash && this.htmlContents){
        Vue.nextTick(() => {
          const element = document.querySelector(`a[name=${this.$route.params.hash}]`);
          if(element){
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        })
      }
    }
  },
  serverPrefetch() {
    return this.fetchPage(this.$route.params.pageHandle);
  },
  mounted(){
    console.warn('IGNORE NODE COUNTING ERROR ABOVE in development mode. This is an vue-ssr bug. The node comparison strategy does not account for html being injected via v-html prop');
  },
  // beforeRouteEnter(to, from, next) {
  //   this.fetchPage(to.params.pageHandle);
  //   next();
  // },
  methods: {
    fetchPage(pageHandle) {
      // Load the product details
      return this.$store.dispatch('pages/fetch', pageHandle).then(page => {
        if(!page){
          this.$router.replace({
            name: 'MissingPage'
          })
        }
      })
    },
  }
});
</script>
<style scoped lang="less">

</style>

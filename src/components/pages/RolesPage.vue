<template>
  <Page :bottom-spacing="true">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div>
      <router-link
         v-for="(role, index) in $store.state.roles.roles"
         :key="index"
         :to="{
            name: 'ShopByRole',
            params: {
              collectionHandle: role.split('-')[0],
              tag: `role-${role}`
            }
          }">
        {{role}}
      </router-link>
    </div>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Breadcrumbs from "../molecules/Breadcrumbs.vue";
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  components: {
    Page,
    Breadcrumbs
  },
  computed: {
    pageTitle(){
      return ''
    },
    pageDescription(){
      return ''
    },
    breadcrumbs(){
      return [{
        label: 'Shop By Role'
      }]
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  a{
    display :block;
  }
</style>

<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <Form>
      <h1 class="center">Orders</h1>

    </Form>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Button from "../atoms/Button.vue";
import Form from "../atoms/Form.vue";

export default Vue.extend({
  components: {
    Form,
    Page
  },
  mounted(){
    this.$store.dispatch('orders/load');
  },
  methods: {

  }
});
</script>
<style scoped lang="less">
  .buttons{
    text-align: center;
  }
  .button{
    clear: both;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
</style>

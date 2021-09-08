<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <Form>
      <h1 class="center">Account</h1>
      <div class="input-container">
        Email: <b>{{$store.state.customers.email}}</b>
      </div>
      <div class="input-container">
        First Name: <b>{{$store.state.customers.customer.firstName || "Not Set"}}</b>
      </div>
      <div class="input-container">
        Last Name: <b>{{$store.state.customers.customer.lastName || "Not Set"}}</b>
      </div>
      <Button @click="signOut" label="Sign Out" />
    </Form>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Button from "../atoms/Button.vue";
import Form from "../atoms/Form.vue";
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  components: {
    Form,
    Page,
    Button
  },
  data(){
    return {
      pageTitle: 'My Account'
    }
  },
  methods: {
    signOut(){
      this.$store.dispatch('customers/signOut').then(() => {
        this.$router.push({name: 'AccountSignIn'})
      })
    }
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

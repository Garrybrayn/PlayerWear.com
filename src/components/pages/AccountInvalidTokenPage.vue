<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <h1 class="center">{{ pageTitle }}</h1>
    <p v-if="sent" class="center">
      We've emailed you a link to set your account password.
    </p>
    <div class="buttons">
      <div v-if="!sent && $store.state.customers.email">
        <Button @click="resetPassword" label="Send me a new link" /><br />
        <Button @click="signin" label="I know my password" />
      </div>
      <div>
        <p>
          Or
        </p>
        <Button @click="checkoutAsGuest" label="Checkout as Guest" />
      </div>
    </div>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Button from "../atoms/Button.vue";
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  components: {
    Page,
    Button
  },
  data(){
    return {
      sent: false
    }
  },
  computed: {
    pageTitle(){
      if(this.sent){
        return 'Check your email.'
      }
      return 'Your reset password link has expired.';
    }
  },
  methods: {
    checkoutAsGuest(){
      this.$router.push({
        name: 'PreCheckout'
      })
    },
    resetPassword(){
      this.$store.dispatch('customers/sendForgotPasswordEmail').then(() => {
        this.action = 'check-email';
      })
    },
    signin(){
      this.$router.push({
        name: 'AccountSignIn',
        query: {
          redirect: '/pages/pre-checkout'
        }
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
  .center{
    text-align: center;
  }
</style>

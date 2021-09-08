<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <h1 class="center">{{ heading }}</h1>
    <p v-if="action==='check-email'" class="center">
      We've emailed you a link to set your account password.
    </p>
    <div class="buttons">
      <div v-if="action === 'checkout'">
        <Button @click="action='signin'" :label="`Checkout as ${ $store.state.customers.email }`" />
      </div>
      <div v-if="action === 'signin'">
        <Button @click="resetPassword" label="Email me a Login Link" /><br />
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
      action: 'checkout',
      pageTitle: 'Choose a Checkout Option'
    }
  },
  computed: {
    heading(){
      if(this.action === 'checkout'){
        return 'How would you like to checkout?'
      }else if(this.action === 'signin'){
        return 'How would you like to sign in?'
      }else if(this.action === 'check-email'){
        return 'Check your email.'
      }
      return '';
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

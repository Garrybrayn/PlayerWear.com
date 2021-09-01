<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <Form>
      <h1 class="center">Register</h1>
      <div class="input-container">
        <input type="email" placeholder="Email Address" v-model="email">
      </div>
      <div class="input-container">
        <input type="password" v-model="password">
      </div>
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
      <Button @click="signIn" class="full-width">
        Register
        <ProgressSpinner v-if="showLoadingSpinner" />
      </Button>
      <div class="link-list">
        <router-link :to="{name: 'AccountSignIn'}">I have an Account</router-link>
      </div>
    </Form>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Button from "../atoms/Button.vue";
import ProgressSpinner from "../atoms/ProgressSpinner.vue";
import Form from "../atoms/Form.vue";

export default Vue.extend({
  components: {
    Page,
    Form,
    Button,
    ProgressSpinner
  },
  data(){
    return {
      email: null,
      password: null,
      showLoadingSpinner: false,
      errorMessage: null
    }
  },
  mounted(){
    this.email = this.$store.state.customers.email;
  },
  methods: {
    signIn(){
      this.errorMessage = null;
      if(this.password && this.email){
        this.showLoadingSpinner = true;
        this.$store
          .dispatch('customers/create', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({name: 'AccountProfile'})
          })
          .catch(e => {
            if(e.message.includes('UNIDENTIFIED_CUSTOMER')){
              this.errorMessage = 'Wrong email or password.'
            }else{
              this.errorMessage = e.message;
            }
          })
          .finally(() => {
            this.showLoadingSpinner = false;
          })
      }else{
        this.errorMessage = 'Enter your email address and password.'
      }
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

<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <Form v-if="!showForgotPasswordForm">
      <h1 class="center">Sign In</h1>
      <div class="input-container">
        <input type="email" placeholder="Email Address" v-model="email" />
      </div>
      <div class="input-container">
        <input type="password" v-model="password" placeholder="Password">
      </div>
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
      <Button @click="signIn" class="full-width">
        Sign In
        <ProgressSpinner v-if="showLoadingSpinner" />
      </Button>
      <div class="link-list">
        <a @click="showForgotPasswordForm=true">Forgot Password</a>
        <span>•</span>
        <router-link :to="{name: 'AccountRegister'}">Create an Account</router-link>
      </div>
    </Form>

    <Form v-if="showForgotPasswordForm">
      <div v-if="showCheckEmailMessage">
        <h1 class="center">Check your email.</h1>
        <p class="center">
          We sent you a link to login and set your password.
        </p>
        <div class="link-list center">
          <a @click="showForgotPasswordForm=false">Sign in with Password</a>
        </div>
      </div>
      <div v-else>
        <h1 class="center">Forgot your Password?</h1>
        <div class="input-container">
          <input type="email" placeholder="Email Address" v-model="email" />
        </div>
        <div v-if="errorMessage" class="error">
          {{ errorMessage }}
        </div>
        <Button @click="resetPassword" class="full-width">
          Reset my Password
          <ProgressSpinner v-if="showLoadingSpinner" />
        </Button>
        <div class="link-list">
          <a @click="showForgotPasswordForm=false">Sign in with Password</a>
        </div>
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
      // Variables
      email: null,
      password: null,
      errorMessage: null,

      // Loading Status
      showLoadingSpinner: false,

      // View Switching
      showForgotPasswordForm: false,
      showCheckEmailMessage: false
    }
  },
  mounted(){
    this.email = this.$store.state.customers.email;
  },
  watch: {
    showForgotPasswordForm(){
      this.errorMessage = false;
      this.showLoadingSpinner = false;
    }
  },
  methods: {
    signIn(){
      this.errorMessage = null;
      if(this.email){
        this.$store.commit('customers/SET_EMAIL', this.email);
      }

      if(this.password && this.email){
        this.showLoadingSpinner = true;
        this.$store
          .dispatch('customers/signin', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            if(this.$route.query.redirect){
              this.$router.push(this.$route.query.redirect)
            }else{
              this.$router.push({name: 'AccountProfile'})
            }
          })
          .catch(e => {
            if(e.message.includes('UNIDENTIFIED_CUSTOMER')){
              this.errorMessage = 'Wrong email or password.'
            }
          })
          .finally(() => {
            this.showLoadingSpinner = false;
          })
      }else{
        this.errorMessage = 'Enter your email address and password.'
      }
    },
    resetPassword(){
      this.$store.commit('customers/SET_EMAIL', this.email);
      if(this.$store.getters['customers/hasValidEmail']){
        this.showLoadingSpinner = true;
        this.$store
          .dispatch('customers/sendForgotPasswordEmail', this.email)
          .then(result => {
            console.log(result);
            this.showCheckEmailMessage = true;
          })
          .catch(error => {
            if(error.message.includes('limit exceeded')){
              this.errorMessage = 'Password reset limit exceeded. Try again later.'
            }
          })
          .finally(() => {
            this.showLoadingSpinner = false;
          })
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

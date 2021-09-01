<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <Form>
      <h1 class="center">Create a new Password</h1>
      <div class="input-container">
        <input type="password" v-model="password" placeholder="New Password">
      </div>
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
      <Button @click="signIn" class="full-width">
        Create New Password
        <ProgressSpinner v-if="showLoadingSpinner" />
      </Button>
      <div class="link-list">
        <router-link :to="{name: 'AccountSignIn'}">I remembered my old password</router-link>
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
      password: null,
      showLoadingSpinner: false,
      errorMessage: null
    }
  },
  methods: {
    signIn(){
      this.errorMessage = null;
      if(this.password){
        this.showLoadingSpinner = true;
        this.$store
          .dispatch('customers/reset', {
            "id": this.$route.params.customerId,
            "input": {
              "resetToken": this.$route.params.resetToken,
              "password": this.password
            }
          })
          .then(result => {
            console.log(result)
            this.$router.push({name: 'Cart'})
          })
          .catch(e => {
            console.error(e);
            if(e.message.includes('TOKEN_INVALID')){
              this.errorMessage = 'Your password reset link has expired.';
            }
          })
          .finally(() => {
            this.showLoadingSpinner = false;
          })
      }else{
        this.errorMessage = 'Enter your new password.'
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

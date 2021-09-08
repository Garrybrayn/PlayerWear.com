<template>
  <Modal @close="$emit('close')">
    <Form class="modal-contents">
      <h1>Calling all musicians!</h1>
      <p>Get access to our growing collection of apparel and goodies designed specifically for musicians. We're adding new products, new designs, and new brands weekly. Be the first to see new cool stuff inspired by the brands and music you love!</p>
      <label for="mailingListEmail" style="display: none;">Enter your email</label>
      <input :value="$store.state.customers.email" type="email" placeholder="Enter your Email" ref="emailInput" id="mailingListEmail" aria-label="Enter your email"/>
      <Button class="primary full-width" @click="submit" label="Get on the list">
        <ProgressSpinner v-if="showProgressSpinner"/>
      </Button>
    </Form>
  </Modal>
</template>
<script lang="ts">
import Vue from 'vue';
import Modal from "../molecules/Modal.vue";
import Form from "../atoms/Form.vue";
import Button from "../atoms/Button.vue";
import ProgressSpinner from "../atoms/ProgressSpinner.vue";
export default Vue.extend({
  components: {
    Modal,
    Form,
    Button,
    ProgressSpinner
  },
  data(){
    return {
      errorMessage: null,
      showProgressSpinner: false
    }
  },
  methods: {
    submit(){
      this.errorMessage = null;
      this.$store.commit('customers/SET_EMAIL', this.$refs.emailInput.value);
      if(this.$store.getters['customers/hasValidEmail']){
        this.showProgressSpinner = true;

        // Try to create a new account for them
        this.$store.dispatch('customers/create', {
          email: this.$refs.emailInput.value,
          acceptsMarketing: true
        })
        .then(results => {
          console.log(results)
          // Customer was created. Redirect them to pre-checkout
          this.$emit('close');
        })
        .catch(error => {
          console.error(error);
          // Customer already subscribed
          if(error.message.includes('TAKEN')){
            this.$emit('close');
          }
        })
        .finally(() => {
          this.showProgressSpinner = false;
        })
      }else{
        this.errorMessage = 'Enter your email address to continue.';
      }
    }
  }
});
</script>
<style scoped lang="less">

  .modal.closed{
    pointer-events: none;
    touch-action: none;
    opacity: 0;
  }
</style>

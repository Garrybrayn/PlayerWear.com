<template>
  <Page class="narrow-fixed" :top-spacing="true">
    <h1>Contact</h1>
    <form action="/contact" method="post">
      <input type="hidden" name="form_type" value="contact">
      <input type="hidden" name="utf8" value="✓">

      <Form v-if="!wasSent" class="grid">
        <div class="input-container half">
          <label>Your Name</label>
          <input type="text" v-model="name" name="contact[name]"/>
        </div>
        <div class="input-container half">
          <label>Your Email Address</label>
          <input type="text" v-model="email" name="contact[email]" ref="emailInput"/>
        </div>
        <div class="input-container half">
          <label>Your Order Number</label>
          <input type="text" v-model="orderNumber" name="contact[order_number]"/>
        </div>
        <div class="input-container half">
          <label>Inquiry Type</label>
          <select v-model="inquiryType" name="contact[inquiry_type]">
            <option disabled selected>Select an Option</option>
            <option v-for="(value, index) in inquiryTypes" :key="index">
              {{ value }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label>Tell Us How We Can Help You</label>
          <textarea v-model="message"  name="contact[body]"/>
        </div>
        <p v-if="errorMessage" class="error">
          {{ errorMessage }}
        </p>
        <div class="input-container">
          <Button @click="submit" class="full-width" label="Send Message">
            <ProgressSpinner v-if="showProgressSpinner" />
          </Button>
        </div>
      </Form>
    </form>
    <div v-if="wasSent">
      Your message has been sent.
    </div>
  </Page>
</template>
<script lang="ts">

import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Form from "../atoms/Form.vue";
import Button from "../atoms/Button.vue";
import ProgressSpinner from "../atoms/ProgressSpinner.vue";
import pageMetaMixin from '../mixins/pageMetaMixin'
import contactFormMixin from '../mixins/contactFormMixin'

export default Vue.extend({
  mixins: [
    pageMetaMixin,
    contactFormMixin
  ],
  components: {
    Page,
    Form,
    Button,
    ProgressSpinner
  },
  data(){
    return {
      pageTitle: 'Contact Us',
      email: null,
      name: null,
      message: null,
      orderNumber: null,
      inquiryType: null,
      inquiryTypes: [
        'Product Question',
        'Order Status',
        'Help with my account',
        'Request a return',
        'Request a refund',
        'Website Accessibility Issues'
      ],
    }
  },
  methods: {
    resetForm(){
      this.message = '';
      this.orderNumber = '';
      this.inquiryType = '';
    },
    getFormData(){
      if(!this.name){
        return 'Please enter your name.'
      }
      if(!this.$store.getters['customers/hasValidEmail']){
        return 'Please enter a valid email address to continue.'
      }
      if(!this.message){
        return 'Please enter your message.'
      }
      if(!this.inquiryType){
        return 'Please select an inquiry type.'
      }
      return {
        name: this.name,
        email: this.email,
        body: this.message,
        orderNumber: this.orderNumber,
        inquiryType: this.inquiryType,
      }
    },
  }
});
</script>
<style scoped lang="less">

</style>

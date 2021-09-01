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
          <Button @click="submit" class="full-width">
            Send Message
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
import axios from 'axios';
import Page from "../atoms/Page.vue";
import Form from "../atoms/Form.vue";
import Button from "../atoms/Button.vue";
import ProgressSpinner from "../atoms/ProgressSpinner.vue";

export default Vue.extend({
  metaInfo(){
    return {
      title: 'Contact Us'
    }
  },
  components: {
    Page,
    Form,
    Button,
    ProgressSpinner
  },
  data(){
    return {
      name: null,
      email: null,
      orderNumber: null,
      inquiryType: null,
      message: null,
      inquiryTypes: [
        'Product Question',
        'Order Status',
        'Help with my account',
        'Request a return',
        'Request a refund',
        'Website Accessibility Issues'
      ],
      showProgressSpinner: false,
      errorMessage: null,
      wasSent: false
    }
  },
  mounted(){
    this.email = this.$store.state.customers.email
  },
  watch: {
    wasSent(){
      if(this.wasSent){
        this.name = '';
        this.orderNumber = '';
        this.inquiryType = '';
        this.message = '';
      }
    },
    $route:{
      immediate: true,
      handler(to){
        if('contact_posted' in to.query){
          this.wasSent = true;
        }
      }
    }
  },
  methods: {
    submit(){
      this.errorMessage = null;
      this.$store.commit('customers/SET_EMAIL', this.$refs.emailInput.value);
      if(this.$store.getters['customers/hasValidEmail']){
        this.showProgressSpinner = true;

        axios.post('/contact',{
          form_type: 'contact',
          utf8: "✓",
          contact: {
            name: this.name,
            email: this.email,
            orderNumber: this.orderNumber,
            inquiryType: this.inquiryType,
            body: this.message
          }
        })
        .then(results => {
          if(results.data.includes('challenge')){
            window.location.href = '/challenge';
          }else{
            this.showProgressSpinner = false;
            this.wasSent = true;
          }
        })
        .catch(error => {
          console.error(error);
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

</style>

<template>
  <Page class="narrow-fixed" :top-spacing="true">
    <h1>Accessibility</h1>
    <p>
      We strive to make our products and services, and all of our web content, accessible to all customers. We care about the customer experience of everyone, regardless of disability. To accomplish this, we take steps to improve Player-Wear.com, improve functionality with assertive technology devices, and ensure consistency with the World Wide Web Consortium’s Content Accessibility Guidelines (WGAG 2.0). Our team employs accessibility and usability tests during regular content reviews to improve the accessibility of our site.
    </p>
    <p v-if="false">
      For those who are vision impaired, we have implemented an additional functionality of a High Contrast Mod. You can access that using the link in the footer of any page on Player-Wear.com, plus there is a button above that will turn this functionality on site-wide.
    </p>
    <p>
      In addition, we encourage customers and anyone else who visits our website to let us know if there are any problems with accessing any portion of the site. To share your feedback specific to Accessibility suggestions, please use the form below. Thanks for your interest in Player-Wear.com.
    </p>
    <br />
    <br />
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
        <div class="input-container">
          <label>Please give us the URL for the webpage with the reported problem.</label>
          <input type="text" v-model="problemPageUrl" name="contact[problem_page]"/>
        </div>
        <div class="input-container">
          <label>Please describe the usability challenge that you encountered.</label>
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
      pageTitle: 'Accessibility',
      email: null,
      name: null,
      message: null,
      problemPageUrl: null
    }
  },
  methods: {
    resetForm(){
      this.message = '';
      this.orderNumber = '';
    },
    getFormData(){
      if(!this.name){
        return 'Please enter your name.'
      }
      if(!this.$store.getters['customers/hasValidEmail']){
        return 'Please enter a valid email address to continue.'
      }
      if(!this.problemPageUrl){
        return 'Please enter the webpage URL.'
      }
      if(!this.message){
        return 'Please describe the usability challenge you have encountered.'
      }
      return {
        name: this.name,
        email: this.email,
        problemPageUrl: this.problemPageUrl,
        body: this.message,
        inquiryType: 'Accessibility',
      }
    },
  }
});
</script>
<style scoped lang="less">

</style>

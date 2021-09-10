<template>
  <div class="cart-overlay" @click="$emit('close')">
    <div :class="{cart: true, empty}" @click.stop>
      <div class="cart-scrollable">
        <div class="cart-summary">
          Subtotal: <span class="value">${{ subtotal }}</span>
        </div>
        <div class="cart-products">
          <CartItem v-for="(item, index) in items" :key="index" :item="item" />
        </div>
        <div class="empty-message">
          Your cart is empty.
        </div>
      </div>
      <div class="cart-bottom" v-if="!empty">
        <div class="line-items">
          <div>
            Shipping: <span class="value">$4.00 Flat Rate</span>
          </div>
          <div class="total">
            Total ({{ itemCountReadable }}): <span class="value">${{ total }}</span>
          </div>
        </div>
        <div class="form">
          <label for="checkoutEmail" style="display: none">Enter your Email</label>
          <input v-if="!$store.getters['customers/isSignedIn']" :value="$store.state.customers.email" type="email" placeholder="Enter your Email" ref="emailInput" id="checkoutEmail"/>
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
          <div  v-if="!$store.getters['customers/isSignedIn']" class="checkbox-input">
            <input type="checkbox" ref="acceptsMarketingInput" id="acceptsMarketingInput" checked/>
            <label for="acceptsMarketingInput">Send me discounts and specials.</label>
          </div>
          <Button @click="checkout" class="button-checkout" :has-chevron="true" label="Checkout">
            <ProgressSpinner v-if="showProgressSpinner"/>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Button from '../atoms/Button';
import CartItem from '../molecules/CartItem';
import ProgressSpinner from "../atoms/ProgressSpinner.vue";

export default Vue.extend({
  components: {
    Button,
    CartItem,
    ProgressSpinner
  },
  data(){
    return {
      errorMessage: null,
      showProgressSpinner: false
    }
  },
  computed: {
    items(){
      return this.$store.getters['cart/items']
    },
    subtotal(){
      return (this.$store.getters['cart/subtotal'] / 100).toFixed(2)
    },
    total(){
      return (this.$store.getters['cart/total'] / 100).toFixed(2)
    },
    itemCountReadable(){
      return `${this.$store.getters['cart/itemCount']} item${this.$store.getters['cart/itemCount'] === 1 ? '':'s'}`
    },
    empty(){
      return !this.items || this.items.length === 0
    }
  },
  methods: {
    checkout(){
      this.errorMessage = null;
      if(this.$refs.emailInput && this.$refs.emailInput.value){
        this.$store.commit('customers/SET_EMAIL', this.$refs.emailInput.value);
      }

      // If the customer is on the upsell page
      // immediately redirect them to the checkout
      if(this.$route.name === 'PreCheckout' || this.$route.name === 'Cart' || this.$route.name === 'CheckoutOptions'){
        this.$emit('close');

      // Customer is signed in.
      // Send them to pre-checkout
      }else if(this.$store.getters['customers/isSignedIn']){
        this.$emit('close');
        this.$router.push({ name: 'PreCheckout' });

      }else{
        // Customer is not signed in.
        // Check to make sure their email format is valid.
        if(this.$store.getters['customers/hasValidEmail']){


          if(this.$store.state.customers.emailHasAccount) {
            // This customer already has an account but is not signed in.
            // Redirect them to checkout options to allow them to sign in.
            this.$emit('close');
            this.$router.push({name: 'CheckoutOptions'});

          }else{
            // We don't know if this customer has an account yet.
            // Try to create a new account for them
            this.showProgressSpinner = true;
            this.$store.dispatch('customers/create', {
              email: this.$refs.emailInput.value,
              acceptsMarketing: this.$refs.acceptsMarketingInput.checked ? true : false
            })
              .then(results => {
                console.log(results)

                // A new customer was created. Redirect them to pre-checkout
                this.$emit('close');
                this.$router.push({name: 'PreCheckout'});
              })
              .catch(error => {
                // Assuming either "TAKEN" or "CUSTOMER_DISABLED" error
                // In either case, redirect to checkout options.
                console.error(error);
                this.$emit('close');
                this.$router.push({name: 'CheckoutOptions'});
              })
              .finally(() => {
                this.showProgressSpinner = false;
              })
          }
        }else{
          this.errorMessage = 'Enter your email address to continue.';
        }
      }
    }
  }
});
</script>
<style scoped lang="less">

@import '../../less/variables';

  .cart-overlay{
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background: #0005;
    z-index: 3;
    transition: opacity 250ms ease-in-out;
    &.closed{
      pointer-events: none;
      touch-action: none;
      opacity: 0;
      .cart {
        bottom: -10vh;
        top: calc(5em + 10vh);
        opacity: 0;
      }
    }
  }
  .cart {
    display: flex;
    background: rgba(255,255,255,0.90);
    backdrop-filter: blur(5px);
    border-radius: 0.5em 0.5em 0em 0em;
    box-shadow: 0px 0px 15px #0005;
    position: fixed;
    top: 5em;
    right: 0;
    left: 0;
    bottom: 0;
    flex-direction: column;
    transition: all 500ms;

    &.empty{
      font-weight: 600;
      text-align: center;
      .cart-scrollable{
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .cart-summary, .cart-products, .cart-bottom{
        display: none;
      }
      .empty-message{
        display: block;
      }
    }
  }
  .empty-message{
    display: none;
    font-size: 1.5rem;
  }

  .value{
    font-weight: 600;
    float: right;
  }
  .cart-scrollable{
    overflow: auto;
    flex-grow: 1;
  }
  .cart-summary{
    padding: 1em;
  }
  .cart-products{

  }
  .total{
    font-weight: 600;
    font-size: 110%;
  }
  .error{
    color: #620404;
    font-size: 90%;
  }
  .cart-bottom{
    background: white;
    flex-grow: 0;
    border-top: 1px solid #0002;
    box-shadow: 0px 0px 30px #0001;
    padding: 1em 1em 0em 1em;
  }
  .line-items{
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .form{
    display: flex;
    flex-direction: column;
    align-content: stretch;
    justify-content: stretch;
    input[type=email]{
      height: 40px;
      font: inherit;
      padding: 0.5em 1em;
      box-sizing: border-box;
      margin-bottom: 0em;
      margin-top: 1em;
    }
    .checkbox-input{
      padding: 0.5em;
      font-size: 90%;
      color: @gray2;
      input{
        margin-right: 0.5em;
      }
    }
    button{
      margin-top: 0.5em;
      font-size: 125% !important;
      padding: 0.45em 0em;
      font-weight: 600;
    }
  }

  @media(min-width: @secondbreakpoint){

    .cart-overlay{
      &.closed{
        pointer-events: none;
        touch-action: none;
        opacity: 0;
        .cart {
          right: -450px;
          opacity: 0;
          top:0;
          bottom: 0;
        }
      }
    }
    .cart{
      width: 450px;
      border-radius: 0;
      top:0;
      right: 0;
      bottom:0;
      left: auto;
      font-size: 1rem;
    }
    .total{
      font-size: 125%;
    }
    .cart-scrollable{
      flex-grow: 0;
    }
    .cart-bottom{
      flex-grow: 1;
      border-top: none;
    }
  }
</style>

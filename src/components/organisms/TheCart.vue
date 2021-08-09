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
          <input v-if="!$store.state.customers.email" type="email" placeholder="Enter your Email" ref="emailInput"/>
          <p class="error" v-if="showEmailError">Enter your email address to continue.</p>
          <Button @click="checkout" class="button-checkout" :has-chevron="true">
            Checkout
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

export default Vue.extend({
  components: {
    Button,
    CartItem
  },
  data(){
    return {
      showEmailError: false
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
      return this.items.length === 0
    }
  },
  methods: {
    checkout(){
      this.showEmailError = false;
      this.$store.commit('customers/SET_EMAIL', this.$refs.emailInput.value);
      if(this.$store.getters['customers/hasValidEmail']){
        this.$router.push({
          name: 'PreCheckout'
        })
        this.$emit('close');
      }else{
        this.showEmailError = true;
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
    z-index: 2;
    transition: opacity 250ms ease-in-out;
    &.closed{
      pointer-events: none;
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
    font-size: 0.9rem;

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
    input{
      height: 40px;
      font: inherit;
      padding: 0.5em 1em;
      box-sizing: border-box;
      margin-bottom: 0em;
      margin-top: 1em;
    }
    button{
      margin-top: 0.5em;
      font-size: 125%;
      padding: 0.45em 0em;
      font-weight: 600;
    }
  }

  @media(min-width: @secondbreakpoint){

    .cart-overlay{
      &.closed{
        pointer-events: none;
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

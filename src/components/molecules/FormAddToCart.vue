<template>
  <form class="buy-button-container">
    <input v-show="false" type="number" :value="quantity" data-qty-input @change="$emit('changeQuantity', $event)"/>
    <input name="id" type="hidden" :value="selectedVariantIdDecoded" :data-variant-id="selectedVariantIdDecoded" />
    <InputNumber v-if="showQuantitySelector" :value="quantity" data-qty-input @change="$emit('changeQuantity', $event)"/>
    <Button
      v-if="!showPlaceholders"
      type="submit"
      :disabled="selectedVariantIdDecoded?false:true"
      :class="{'buy-button': true, 'full-width': true, disabled: selectedVariantIdDecoded?false:true}"
      @click.native="addToCart($event)"
      :data-original-text="buyButtonLabel"
    >
      <span data-button-text>{{buyButtonLabel}}</span>
    </Button>
    <span class="placeholder-content" />
  </form>
</template>
<script lang="ts">
import Vue from 'vue';
import InputNumber from "../atoms/InputNumber.vue";
import Button from "../atoms/Button.vue";

export default Vue.extend({
  props: {
    selectedVariantIdDecoded: {
      type: [String, Boolean]
    },
    quantity: {
      type: Number,
      default: 1
    },
    showPlaceholders: {
      type: Boolean,
      default: false
    },
    buyButtonLabel: {
      type: String,
      default: 'Add to Cart'
    },
    showQuantitySelector: {
      type: Boolean,
      default: true
    }
  },
  components: {
    InputNumber,
    Button
  },
  data(){
    return {
      cartElement: null
    }
  },
  mounted(){
    this.cartElement = document.getElementById('booster__popup--holder');
  },
  methods: {
    openCartOnce(){
      document.getElementById('minicart__button').click();
      this.cartElement.removeEventListener("DOMSubtreeModified", this.openCartOnce, false);
    },
    addToCart(event){
      event.preventDefault();
      if(this.selectedVariantIdDecoded){
        this.cartElement.addEventListener("DOMSubtreeModified", this.openCartOnce, false);
        boosterCart.addToCart(event.currentTarget, event)
      }
    }
  }
});
</script>
<style scoped lang="less">

</style>

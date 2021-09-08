<template>
  <div class="buy-button-container" role="form" @click.stop @click.prevent>
    <InputNumber v-if="!showPlaceholders && showQuantitySelector" :value="quantity" @change="$emit('changeQuantity', $event)" uniqueKey="product"/>
    <Button
      v-if="!showPlaceholders"
      aria-label="Add to Cart"
      :disabled="disabled"
      :class="{'buy-button': true, 'full-width': true, disabled}"
      :label="buyButtonLabel"
      @click.native="addToCart($event)"
    />
    <span class="placeholder-content" />
  </div>
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
    selectedVariantId: {
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
  computed: {
    disabled(){
      return this.selectedVariantIdDecoded ? false : true
    }
  },
  methods: {
    addToCart(){
      if(this.selectedVariantIdDecoded){
        this.$emit('addToCart', {
          id: this.selectedVariantIdDecoded,
          idEncoded: this.selectedVariantId,
          quantity: this.quantity
        })
      }
    }
  }
});
</script>
<style scoped lang="less">

</style>

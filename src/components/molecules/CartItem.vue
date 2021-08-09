<template>
  <div v-if="item && item.quantity > 0" class="cart-item">
    <router-link :to="productRoute">
      <ProductImage :src="item.image" :alt="item.title || ''" />
    </router-link>
    <div class="item-details">
      <router-link class="item-title" :to="productRoute">
        {{ item.title }}
      </router-link>
      <div class="item-price">
        ${{ price }}
      </div>
      <div v-if="item.options_with_values && item.options_with_values.length > 0" class="item-variant">
        <span v-for="(option, index) in item.options_with_values" :key="index">
          {{option.name}}: {{option.value}}
        </span>
      </div>
      <div>
        <InputNumber :value="item.quantity" @change="changeQuantity"/>
      </div>
      <div>
        <Button @click="remove" class="button-delete link">
          <i class="uil-trash-alt" />
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ProductImage from "../atoms/ProductImage.vue";
import Button from "../atoms/Button.vue";
import InputNumber from "../atoms/InputNumber.vue";

export default Vue.extend({
  props: {
    item: {
      type: Object
    }
  },
  components: {
    ProductImage,
    InputNumber,
    Button
  },
  computed: {
    price(){
      return (this.item.price / 100).toFixed(2);
    },
    productRoute(){
      return {
        name: 'ProductInCollection',
        params: {
          collectionHandle: String(this.item.vendor || "").toLowerCase(),
          productHandle: this.item.handle
        }
      }
    }
  },
  methods: {
    changeQuantity(newQuantity){
      this.$store.dispatch('cart/updateItem', {
        action: newQuantity > this.item.quantity ? 'increase' : 'decrease',
        item: {
          id: this.item.id,
          quantity: this.item.quantity
        }
      })
    },
    remove(){
      this.$store.dispatch('cart/updateItem', {
        action: 'delete',
        item: {
          id: this.item.id,
          quantity: this.item.quantity
        }
      })
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .cart-item{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1em;
    border-top: 1px solid #0002;
    margin-bottom: -1px;
    gap: 1em;
    font-size: 0.9rem;
    &:last-child{
      border-bottom: 1px solid #0002;
    }
  }
  .product-image{
    width: 100px;
    flex-grow: 0;
    box-shadow: 0 0 10px #0001;
    /deep/ img{
      filter: brightness(100%);
      border-radius: 4px;
    }
  }
  .item-details{
    display: grid;
    grid-template-columns: 1fr 50px;
    flex-grow: 1;
    column-gap: 1em;
    row-gap: 0.5em;
  }
  .item-title{
    font-weight: 600;
    color: black;
    text-decoration: none;
  }
  .item-price{
    font-weight: bolder;
  }
  .item-variant {
    grid-column: span 2;
    color: @gray3;
    font-size: 0.9em;
  }
  .input-number{
    flex-grow: 0;
    width: 100px;
    height: 2em;
    margin-top: 0.5em;
  }
  .button-delete{
    margin:0 !important;
    font-size: 1.25em;
    padding: 0 !important;
    text-align: right;
    float: right;
  }
  @media(min-width: @secondbreakpoint){
    .cart-item{
      font-size: 1rem;
    }
  }
</style>

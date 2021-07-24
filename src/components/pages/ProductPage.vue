<template>
  <Page :class="{placeholder: showPlaceholders}">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="product-page" data-v-sticky-container>
      <ProductPageImageGrid
        class="product-images"
        :images="images"/>
      <div class="product-details">
        <div v-sticky="{topSpacing: 150, bottomSpacing:40}">
          <div class="product-title">
            {{ title }}
            <span class="placeholder-content" />
          </div>
          <div class="product-price">
            <span class="placeholder-content" />
          </div>
          <div v-show="colors">
            <label>Select a Color:</label>
            <ProductColorSelector
              :options="colors"
              :value="product && product.handle"
              @select="selectColor($event)"
            />
          </div>
          <div v-show="showSizeSelector">
            <label>Select a Size:</label>
            <ProductPageSizeSelector
              :options="options"
              :variants="variants"
              :selected-variant-id="selectedVariantId"
              @select="selectedVariantId = $event"
            />
          </div>
          <form class="buy-button-container">
            <input v-show="false" type="number" :value="quantity" data-qty-input @change="quantity=$event"/>
            <input name="id" type="hidden" :value="selectedVariantIdDecoded" :data-variant-id="selectedVariantIdDecoded" />
            <Button v-if="buyButtonLabel" type="submit" class="buy-button full-width" @click.native="addToCart($event)" :data-original-text="buyButtonLabel">
              <span data-button-text>{{buyButtonLabel}}</span>
            </Button>
            <span class="placeholder-content" />
          </form>
          <div v-html="description" class="description"/>
          <span class="description placeholder-content" />
          <span class="description placeholder-content" />
          <span class="description placeholder-content" />
          <span class="description placeholder-content" />
        </div>
      </div>
    </div>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from '../atoms/Page.vue';
import Button from '../atoms/Button.vue';
import ProductPageImageGrid from '../molecules/ProductPageImageGrid.vue';
import Breadcrumbs from '../molecules/Breadcrumbs.vue';
import ProductColorSelector from '../molecules/ProductColorSelector.vue';
import ProductPageSizeSelector from '../molecules/ProductPageSizeSelector.vue';
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
import Utilities from '../../utilities';

export default Vue.extend({
  components: {
    Page,
    Breadcrumbs,
    ProductPageImageGrid,
    ProductColorSelector,
    ProductPageSizeSelector,
    Button
  },
  directives: {
    sticky: VueStickyDirective
  },
  data(){
    return {
      selectedVariantId: null,
      quantity: 1
    }
  },
  computed: {
    product(){
      return this.$store.state.products[this.$route.params.productHandle];
    },
    selectedVariant(){
      if(this.variants){
        return this.variants.find(variant => variant.id === this.selectedVariantId);
      }
      return null
    },
    selectedVariantPrice(){
      return this.selectedVariant ? this.selectedVariant.price : null
    },
    selectedVariantPriceReadable(){
      return this.selectedVariantPrice ? `$${this.selectedVariantPrice } USD` : null
    },
    title(){
      return this.product ? this.product.title : null
    },
    colors(){
      return this.$store.state.colorOptions[this.$route.params.productHandle]
    },
    options(){
      return this.product && this.product.options ? this.product.options : null
    },
    images(){
      if(this.product && this.product.images){
        return this.product.images;
      }
      return null
    },
    variants(){
      return this.product && this.product.variants ? this.product.variants : null
    },
    description(){
      return this.product ? this.product.descriptionHtml : null
    },
    selectedVariantIdDecoded(){
      return this.selectedVariantId ? atob(this.selectedVariantId).split('/').slice(-1)[0] : false;
    },
    showSizeSelector(){
      return this.product && this.product.options && this.product.options.find(option => option.name === 'Size');
    },
    buyButtonLabel(){
      if(this.selectedVariant){
        return `Add to cart - $${ this.total }`
      }else{
        return 'Select an Option';
      }
    },
    total(){
      return this.selectedVariant ? this.selectedVariant.price * this.quantity : null;
    },
    breadcrumbs(){
      const breadcrumbs = [];
      breadcrumbs.push({
        label: "Home",
        url: '/'
      });
      if(this.product){
        breadcrumbs.push({
          label: this.product.vendor,
          url: {
            name: "Collection",
            params: {
              collectionHandle: this.product.vendor.toLowerCase()
            }
          }
        });
        if(this.$route.query.tag){
          breadcrumbs.push({
            label: Utilities.tagReadable(this.$route.query.tag),
            url: {
              name: "TagInCollection",
              params: {
                tag: this.$route.query.tag,
                collectionHandle: this.product.vendor.toLowerCase()
              }
            }
          });
        }
        breadcrumbs.push({
          label: this.product.title
        });
      }

      return breadcrumbs;
    },
    showPlaceholders(){
      return this.product ? false : true
    }
  },
  watch: {
    product(){

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchProductColorData(to.params.productHandle);
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProductColorData(to.params.productHandle);
    next();
  },
  methods: {
    fetchProductColorData(productHandle){
      this.$store.dispatch('loadProduct', productHandle);
      this.$store.dispatch('loadProductColorOptions', productHandle);
    },
    selectColor(productHandle){
      this.$router.push({
        name: this.$route.name,
        params: {
          collection: this.$route.params.collection ? this.$route.params.collection : null,
          productHandle: productHandle
        }
      })
    },
    addToCart(event){
      event.preventDefault();
      if(this.selectedVariant){
        boosterCart.addToCart(event.currentTarget, event)
      }
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .breadcrumbs{
    display: none;
  }
  .product-images{
    margin-bottom: 1em;
  }
  .product-title{
    font-weight: 800;
    margin-bottom: 1em;
    font-size: 1.2em;
    .placeholder-content{
      width: 100%;
      height: 1.2em;
    }
  }
  .product-price{
    color: @gray1;
    font-weight: 800;
    margin-bottom: 1em;
    .placeholder-content{
      width: 50px;
    }
  }
  .product-color-selector{
    margin-bottom: 1em;
  }
  .product-size-selector{
    margin-bottom: 1em;
  }
  label{
    display: block;
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: 800;
    margin-bottom: 0.5em;
  }

  .buy-button{
    font-weight: 800;
    text-transform: uppercase;
    margin: 0;
  }
  .buy-button-container{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0.75rem;
    background: white;
    box-shadow: 0px 0px 20px #0005;
    .placeholder-content{
      height: 3em;
      width: 100%;
    }
  }

  .description table{
    font-size: 0.8em !important;
  }
  .description.placeholder-content{
    width: 100%;
  }

  @media(min-width: @secondbreakpoint){
    .breadcrumbs {
      display: block;
    }
    .product-page {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 40px;
    }
    .product-images{
      grid-column: span 7;
    }
    .buy-button-container{
      position: relative;
      padding: 0;
      box-shadow: none;
      margin-bottom: 1em;
    }
    .product-details{
      grid-column: span 5;
    }
  }

  @media(min-width: @thirdbreakpoint){
    .product-page{
      grid-gap: 70px;
    }
    .product-images{
      grid-column: span 8;
    }
    .product-details{
      grid-column: span 4;
    }
  }
</style>

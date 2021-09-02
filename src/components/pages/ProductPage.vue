<template>
  <Page :bottom-spacing="true" :top-spacing="false" class="full-width">
    <Strip :class="{placeholder: showPlaceholders, 'product-page-container': true}">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="product-page" data-v-sticky-container>
        <ProductPageImageGrid
          class="product-images"
          :images="images"
          :alt="title"
        />
        <div class="product-details">
          <div v-sticky="{topSpacing: 150, bottomSpacing:40}">
            <div class="product-title">
              {{ title }}
              <span class="placeholder-content" />
            </div>
            <div class="product-price">
              {{ priceReadable }}
              <span class="placeholder-content" />
            </div>
            <div v-show="colors && colors.length > 0">
              <ProductColorSelector
                :options="colors"
                :value="product && product.handle"
                :alt="title"
                @select="selectColor($event)"
              />
            </div>
            <ProductPageSizeSelector
              v-show="showSizeSelector"
              :options="options"
              :variants="variants"
              :selected-variant-id="selectedVariantId"
              :size-guide="sizeGuide"
              @select="selectedVariantId = $event"
              @clickShowSizeGuide="showSizeGuide=true"
            />
            <div v-if="soldOutMessage" class="note warning">
              <div>
                <IconSvg name="fire" />
                {{ soldOutMessage }}
              </div>
            </div>
            <FormAddToCart
              v-if="!soldOutMessage"
              :selectedVariantIdDecoded="selectedVariantIdDecoded"
              :selectedVariantId="selectedVariantId"
              :quantity="quantity"
              :buyButtonLabel="buyButtonLabel"
              :showPlaceholders="showPlaceholders"
              @changeQuantity="quantity=$event"
              @addToCart="$emit('addToCart', $event)"
            />
            <div v-if="!showSizeSelector && sizeGuide" class="note link" @click="showSizeGuide=true">
              <div>
                <IconSvg name="shirt-filled" />
                View Size Guide
              </div>
            </div>
            <div class="note" v-show="!showPlaceholders" :style="{background: $store.getters['brands/currentBrandColorLight']}">
              <div class="link" @click="showShippingDetails=true">
                <IconSvg name="truck" />
                <b>SPECIAL Flat Rate Shipping $4.00 in USA</b>
                <p v-if="$store.getters['customers/isOutsideShippingZone']">We ship to the United States and 12 US territories.</p>
                <p class="warning" v-if="$store.getters['customers/isOutsideShippingZone']">We do NOT ship anywhere outside the 50 United States and 12 US territories.</p>
              </div>
              <div>
                <IconSvg name="shirt-filled" />
                All products are made to order and are ready to ship in 3-6 business days.
              </div>
              <div>
                <IconSvg name="star" />
                30-day satisfaction guarantee
              </div>
            </div>
            <b v-show="description">DESCRIPTION:</b>
            <div v-html="description" class="description"/>
            <span class="description placeholder-content" />
            <span class="description placeholder-content" />
            <span class="description placeholder-content" />
            <span class="description placeholder-content" />
          </div>
        </div>
      </div>
    </Strip>

    <Strip class="related-products full-width">
      <div class="heading-1 center">You might like</div>
      <ProductCarousel :products="relatedProducts" :slide-width="400"/>
    </Strip>
    <Modal v-if="showShippingDetails" @close="showShippingDetails=false">
      <div class="modal-contents">
        <div class="heading-1">
          <IconSvg name="truck" />$4.00 Flat Rate Shipping
        </div>
        <p>
          Our special Flat Rate Shipping applies to shipments to
          <b>All 50 U.S. states plus the following U.S. territories:</b>
          America Samoa, Guam, Federated States of Micronesia, Marshall Islands, Northern Mariana Islands, Palau, Puerto Rico and the Virgin Islands.
        </p>
        <p>
          We do not currently ship outside if these locations, but will be expanded to more of the world soon. If
          you are interested <a href="mailto:support@player-wear.com?subject=Request: Support shipping to my area">email us</a>
          and let us know where you are at. We will be entering the markets with the most requests first.
        </p>
      </div>
    </Modal>
    <Modal v-if="showSizeGuide" @close="showSizeGuide=false">
      <div v-html="sizeGuide" class="modal-contents"/>
    </Modal>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from '../atoms/Page.vue';
import IconSvg from '../atoms/IconSvg.vue';
import Strip from '../atoms/Strip.vue';
import FormAddToCart from '../molecules/FormAddToCart.vue';
import Modal from '../molecules/Modal.vue';
import ProductPageImageGrid from '../molecules/ProductPageImageGrid.vue';
import Breadcrumbs from '../molecules/Breadcrumbs.vue';
import ProductColorSelector from '../molecules/ProductColorSelector.vue';
import ProductPageSizeSelector from '../molecules/ProductPageSizeSelector.vue';
import ProductCarousel from '../organisms/ProductCarousel.vue';

import VueStickyDirective from '@renatodeleao/vue-sticky-directive'

export default Vue.extend({
  metaInfo(){
    const titleParts = [this.title];
    if(this.$route.query.tag){
      titleParts.push(`| ${this.tagReadable(this.$route.query.tag)}`)
    }
    if(this.$store.getters['brands/isCurrentBrandThirdParty']){
      titleParts.push(`| Player Wear Official ${this.$store.getters['brands/currentBrandName']} Gear`);
    }else{
      titleParts.push(`| Player Wear Officially Licensed Merch`);
    }
    return {
      title: titleParts.join(' ')
    }
  },
  components: {
    Page,
    Strip,
    Breadcrumbs,
    Modal,
    IconSvg,
    ProductPageImageGrid,
    ProductColorSelector,
    ProductPageSizeSelector,
    ProductCarousel,
    FormAddToCart
  },
  directives: {
    sticky: VueStickyDirective
  },
  data(){
    return {
      showSizeGuide: false,
      showShippingDetails: false,
      selectedVariantId: null,
      quantity: 1
    }
  },
  computed: {
    product(){
      return this.$store.state.products.products[this.$route.params.productHandle];
    },
    relatedProducts(){
      return this.$store.getters.relatedProducts(this.$route.params.productHandle, this.$route.query.tag, 8);
    },
    selectedVariant(){
      if(this.variants){
        return this.variants.find(variant => variant.id === this.selectedVariantId);
      }
      return null
    },
    soldOutMessage(){
      if(this.selectedVariant && !this.selectedVariant.availableForSale){
        if(this.options.length > 1 || this.colors.length > 1){
          return 'This option is sold out.'
        }else{
          return 'SOLD OUT'
        }
      }
      return null;
    },
    selectedVariantPrice(){
      return this.selectedVariant ? Number(this.selectedVariant.price) : null
    },
    lowestVariantPrice(){
      return this.variants ? Math.min(...(this.variants.map(variant => Number(variant.price)))) : null
    },
    priceReadable(){
      const price = this.selectedVariantPrice || this.lowestVariantPrice;
      const priceString = Number.isInteger(price) ? price : Number(price).toFixed(2);
      return price ? `$${priceString} USD` : null;
    },
    title(){
      return this.product ? `${this.product.title}${this.selectedColor? ` - ${this.selectedColor.label}`: ''}` : ''
    },
    colors(){
      return this.$store.state.products.colorOptions[this.$route.params.productHandle] || []
    },
    selectedColor(){
      if(this.colors){
        return this.colors.find(color => color.handle === this.$route.params.productHandle)
      }
      return '';
    },
    options(){
      return this.product && this.product.options ? this.product.options : []
    },
    images(){
      if(this.product && this.product.images){
        return this.product.images
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
    sizeGuide(){
      if(this.product && this.product.metafields){
        const sizeGuide = this.product.metafields.find(metafield => metafield.key==='size_chart')
        if(sizeGuide){
          return sizeGuide.value;
        }
      }
      return null;
    },
    buyButtonLabel(){
      if(this.selectedVariant){
        return `Add to cart - $${ this.total }`
      }else if(this.showSizeSelector){
        return 'Select a Size';
      }else{
        return 'Select an Option';
      }
    },
    total(){
      const total = this.selectedVariant ? this.selectedVariant.price * this.quantity : null;
      return Number.isInteger(total) ? total : Number(total).toFixed(2)
    },
    breadcrumbs(){
      const breadcrumbs = [];
      if(this.product){
        breadcrumbs.push({
          label: this.$store.getters['brands/currentBrandTitle'],
          url: {
            name: "BrandHome",
            params: {
              collectionHandle: this.$store.getters['brands/currentBrandHandle']
            }
          }
        });
        if(this.$route.query.tag){
          if(this.$route.query.tag.includes('design')){
            breadcrumbs.push({
              label: 'Shop By Design',
              url: {
                name: "Designs",
                params: {
                  collectionHandle: this.$route.params.collectionHandle,
                  tag: this.$route.query.tag
                }
              }
            });
          }
          breadcrumbs.push({
            label: this.tagReadable(this.$route.query.tag.replace(this.$store.getters['brands/currentBrandTitle'].toLowerCase(),'')),
            url: {
              name: "TagInCollection",
              params: {
                tag: this.$route.query.tag,
                collectionHandle: this.$store.getters['brands/currentBrandHandle']
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
    variants:{
      immediate: true,
      handler(){
        if(this.variants && this.variants.length === 1 && !this.selectedVariantId){
          this.selectedVariantId = this.variants[0].id
        }
      }
    },
    'product.id': {
      immediate: true,
      handler(){
        if(this.product && this.product.id){
          // LOAD RELATED PRODUCTS BY VENDOR/TAG
          console.log('loading related products')
          this.$store.dispatch('load', {
            tag: this.$route.query.tag,
            vendor: this.product.vendor,
            limit: 10
          }).then(() => {
            console.log('got', this.relatedProducts)
            // LOAD MORE BY VENDOR ONLY
            if(this.$route.query.tag && this.relatedProducts.length < 10){
              console.log('loading more');
              this.$store.dispatch('load', {
                vendor: this.product.vendor,
                limit: 10
              })
            }
          })
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fetchProductColorData(to.params.productHandle);
      vm.$store.dispatch('customers/getGeoLocation');
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProductColorData(to.params.productHandle);
    next();
  },
  methods: {
    fetchProductColorData(productHandle){
      Promise.all([
        // Load the product details
        this.$store.dispatch('load', {
          handle: productHandle,
          limit: 1
        }),

        // Load product colors
        this.$store.dispatch('loadProductColorOptions', productHandle)
      ]).catch(e => {
        // ERROR LOADING PRODUCT
        console.log(e,'Error Loading Product')
        this.$router.replace({ name: 'MissingPage'});
      })
    },
    selectColor(productHandle){
      this.$router.push({
        name: this.$route.name,
        params: {
          collection: this.$route.params.collection ? this.$route.params.collection : null,
          productHandle: productHandle
        },
        query: this.$route.query
      })
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
  .VueCarousel{
    margin-right: -0.5em;
    margin-left: -0.5em;
  }
  .product-title{
    font-weight: 800;
    margin-bottom: 1em;
    font-size: 1.5em;
    line-height: 1.3em;
    .placeholder-content{
      width: 100%;
      height: 1.2em;
    }
  }
  .product-price{
    color: @gray2;
    font-weight: 800;
    margin-bottom: 1em;
    font-size: 1.2em;
    .placeholder-content{
      width: 50px;
    }
  }
  .product-color-selector{
    margin-bottom: 1em;
  }
  .product-size-selector{
    margin-bottom: 2em;
  }
  label{
    display: block;
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: 800;
    margin-bottom: 0.5em;
  }

  /deep/ .buy-button{
    font-weight: 800;
    text-transform: uppercase;
    margin: 0;
  }
  /deep/ .buy-button-container{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0.75rem;
    background: white;
    box-shadow: 0px 0px 20px #0005;
    display: flex;
    align-items: stretch;
    z-index: 3;
    > * + * {
      margin-left: 0.5em;
    }
    .placeholder-content{
      height: 3em;
      width: 100%;
    }
  }

  .note{
    padding: 0.3em 0;
    border-radius: 2px;
    background: #eee;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    > div{
      padding: 1em 1.25em;
      display: flex;
      gap: 0.4em;
      align-items: center;
      &:not(:last-child){
        border-bottom: 1px solid fade(@white, 40%);
      }
    }
    &.link:hover{
      color: @black;
      text-decoration: underline;
      cursor: pointer;
    }
    i, .icon, .icon-svg{
      font-size: 2em;
      vertical-align: middle;
      margin-right: 0.25em;
      flex-shrink: 0;
      &:before{
        margin-right: 0 !important;
        margin-left: 0 !important;
      }
    }
  }

  .description table{
    font-size: 0.8em !important;
  }
  .description.placeholder-content{
    width: 100%;
  }
  .related-products{
    margin-top: 4rem;
    padding: 4em 50px !important;
    box-sizing: border-box;
    background: #F3F3F3;
    /deep/ .product-image img {
      filter: brightness(90%) !important;
    }
  }

  .warning{
    color: @red;
    font-weight: bolder;
  }

  @media(min-width: @secondbreakpoint){
    .breadcrumbs {
      display: block;
    }
    .product-page {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 40px;
      padding-bottom: 5em;
    }
    .product-images{
      grid-column: span 7;
    }
    .buy-button-container{
      position: relative;
      padding: 0;
      box-shadow: none;
      margin-bottom: 2em;
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

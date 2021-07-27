<template>
  <div>
    <Strip class="full-width header-image">
      <img :src="assetUrl('home-header.png')" class="header-image"/>
    </Strip>
    <Strip class="tag-cards">
      <TagCard
        v-for="(tag, index) in mainCategories"
        :src="assetUrl(`tag-image-${tag.tag}.jpg`)"
        :key="index"
        :buttonLabel="tag.label"
        :tag="tag.tag"
      />
    </Strip>
    <Strip v-if="featuredProducts" class="featured-products full-width">
      <ProductCarousel :products="featuredProducts" :slide-width="400"/>
    </Strip>
    <Strip class="tag-cards-large">
      <TagCard
        :src="assetUrl(`tag-image-shirts.jpg`)"
        buttonLabel="T-Shirts"
        tag="shirts"
      />
      <TagCard
        :src="assetUrl(`tag-image-hats.jpg`)"
        buttonLabel="Hats"
        tag="hats"
      />
    </Strip>
    <Strip class="full-width header-image">
      <img :src="assetUrl('tag-hero-image-shoes.png')" class="header-image" loading="lazy"/>
    </Strip>
    <h1 class="center">DESIGNS</h1>
    <Strip class="designs">
      <div v-for="(design, index) in designs" :key="index">
        <router-link :to="{
          name: 'TagInCollection',
          params: {
            collectionHandle: design.split('-')[0],
            tag: `${design}-design`
          }
        }">
          <img :src="assetUrl(`design-${design}.jpg`)" loading="lazy"/>
        </router-link>
      </div>
    </Strip>
    <Strip v-if="featuredTShirts" class="featured-products full-width">
      <ProductCarousel :products="featuredTShirts" :slide-width="400"/>
    </Strip>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Strip from "../atoms/Strip.vue";
import TagCard from "../molecules/TagCard.vue";
import ProductCarousel from "../organisms/ProductCarousel.vue";
import Utilities from '../../utilities';

export default Vue.extend({
  components: {
    Strip,
    ProductCarousel,
    TagCard
  },
  data(){
    return {
      mainCategories: [
        {
          tag: 'shirts',
        },
        {
          tag: 'hats',
        },
        {
          tag: 'hoodies-and-jackets',
          label: 'Hoodies'
        },
        {
          tag: 'bags-and-backpacks',
          label: 'Bags'
        },
        {
          tag: 'shop-women',
        },
        {
          tag: 'more-merch'
        }
      ],
      designs: [
        'korg-on-repeat',
        'korg-kronos',
        'korg-in-3d',
        'vox-elevated',
        'vox-1957',
        'vox-lightning'
      ]
    }
  },
  computed:{
    featuredProducts(){
      return this.$store.getters.productsByTagAndVendor(
        'featured',
        this.$route.params.collectionHandle
      )
    },
    featuredTShirts(){
      return this.$store.getters.productsByTagAndVendor(
        'featured-t-shirt',
        this.$route.params.collectionHandle
      )
    }
  },
  beforeMount(){

    // Load featured products
    this.$store.dispatch('loadProductsByTagAndVendor', {
      first: 10,
      tag: 'featured',
      vendor: this.$route.params.collectionHandle ? this.$route.params.collectionHandle : null
    });

    // Load featured t-shirts
    this.$store.dispatch('loadProductsByTagAndVendor', {
      first: 10,
      tag: 'featured-t-shirt',
      vendor: this.$route.params.collectionHandle ? this.$route.params.collectionHandle : null
    });

  },
  methods:{
    assetUrl: filename => assetUrl + filename,
    tagReadable: tag => Utilities.tagReadable(tag)
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  section{
    margin-bottom: 2em;
  }

  .header-image{
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .tag-cards{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }
  .tag-cards-large{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2em;
  }
  .designs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .featured-products{
    box-sizing: border-box;
    background: #eee;
    /deep/ .VueCarousel-slide{
      padding: @pagePadding;
    }
    /deep/ .product-image img {
      filter: brightness(100%) !important;
    }
    /deep/ .product-card{
      padding-bottom: 1em;
    }
    border-bottom: 1em solid #eee;
    padding-bottom: 1em;
  }


  @media(min-width: @secondbreakpoint){
    section {
      margin-bottom: 6em;
    }
    .tag-cards-large{
      grid-template-columns: 1fr 1fr;
    }
    .designs{
      grid-template-columns: 1fr 1fr 1fr;
    }
    .featured-products{
       /deep/ .product-card{
        padding-bottom: 2em;
      }
      padding: 2em 50px !important;
    }
  }
  @media(min-width: @thirdbreakpoint){
    .tag-cards{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

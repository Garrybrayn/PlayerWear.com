<template>
  <div>
    <h1 class="meta">{{pageTitle}}</h1>
    <Strip :class="`full-width banner ${heroType}`" role="banner">
      <img v-if="heroType === 'image'" :src="assetUrl(`${brand}-home-header.jpg`)" :alt="pageTitle" />
      <video v-if="heroType === 'video'" autoplay loop muted playsinline>
        <source :src="`${heroSource.replace('.mp4','.webm')}`" type="video/webm"/>
        <source :src="`${heroSource}`" type="video/mp4"/>
      </video>
    </Strip>
    <Strip class="tag-cards narrow">
      <TagCard
        v-for="(tag, index) in topSixCategories"
        :src="assetUrl(`${brand}-${tag.tag}.jpg`)"
        :alt="tagReadable(`${brand} ${tag.tag}`)"
        :key="index"
        :buttonLabel="tag.label"
        :tag="tag.tag"
      />
    </Strip>
    <Strip v-if="featuredProducts" class="featured-products full-width">
      <ProductCarousel :products="featuredProducts" :slide-width="400" :show-product-title="false" :show-product-price="false" :show-product-color="false" show-product-icon="shopping-bag" :pagination-enabled="false"/>
    </Strip>
    <Strip class="tag-cards-large really-narrow">
      <TagCard
        v-for="(tag, index) in extraCategories"
        :src="assetUrl(`${brand}-${tag.tag}.jpg`)"
        :alt="tagReadable(`${brand} ${tag.tag}`)"
        :key="index"
        :buttonLabel="tag.label"
        :tag="tag.tag"
      />
    </Strip>
    <Strip class="full-width banner image mid-hero" role="banner">
      <router-link :to="$store.getters['brands/currentBrandPath']('sections.home.midHero.link') || '/'">
        <img :src="assetUrl(`${brand}-mid-hero.jpg`)" loading="lazy" :alt="pageTitle" />
        <div class="hero-overlay-container">
          <div class="hero-overlay">
            <div class="heading-1" >
              {{ $store.getters['brands/currentBrandPath']('sections.home.midHero.title') }}
            </div>
            <Button
              class="uppercase"
              :style="{ backgroundColor: $store.getters['brands/currentBrandColorLight'], color: 'black' }"
              :label="`${$store.getters['brands/currentBrandPath']('sections.home.midHero.buttonLabel')}`"
            />
          </div>
        </div>
      </router-link>
    </Strip>
    <span class="heading-1 center">DESIGNS</span>
    <Strip class="designs narrow">
      <div v-for="(design, index) in designsForBrand" :key="index">
        <router-link :to="{
          name: 'TagInCollection',
          params: {
            collectionHandle: design.split('-')[0],
            tag: `${design}-design`
          }
        }">
          <img :src="assetUrl(`${design}-design.jpg`)" loading="lazy" :alt="`${tagReadable(design)} T-Shirts, Hoodies, Hats, Bags & More`"/>
        </router-link>
      </div>
    </Strip>
    <Strip v-if="featuredTShirts" class="featured-shirts full-width">
      <ProductCarousel :products="featuredTShirts" :slide-width="400"/>
    </Strip>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Button from "../atoms/Button.vue";
import Strip from "../atoms/Strip.vue";
import TagCard from "../molecules/TagCard.vue";
import ProductCarousel from "../organisms/ProductCarousel.vue";
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  components: {
    Button,
    Strip,
    ProductCarousel,
    TagCard
  },
  data(){
    return {
      isMobileOrDesktop: 'mobile'
    }
  },
  computed:{
    pageTitle(){
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        return `${this.$store.getters['brands/currentBrandName']} T-Shirts, Hats, Hoodies | Player Wear Official ${this.$store.getters['brands/currentBrandName']} Gear`
      }else{
        return ``;
      }
    },
    pageDescription(){
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        return `Official ${this.$store.getters['brands/currentBrandName']} Merch | T-Shirts, Hats, Hoodies & More for Musicians & Music Lovers by PlayerWear.com`
      }else{
        return ``;
      }
    },
    heroType(){
      return this.$store.getters['brands/currentBrandPath']('sections.home.hero.type') === 'video' ? 'video' : 'image'
    },
    heroSource(){
      return this.assetUrl(this.heroType == 'video' ? `${this.brand}-hero-${this.isMobileOrDesktop}.mp4`:`${this.brand}-korg-hero.jpg`)
    },
    brand(){
      return this.$store.getters['brands/currentBrandHandle']
    },
    categories(){
      return this.$store.getters['brands/currentBrandPath']('sections.home.categories') || []
    },
    topSixCategories(){
      return this.categories.slice(0, 6);
    },
    extraCategories(){
      return this.categories.slice(6, 8);
    },
    featuredProducts(){
      return this.arrayShuffle(
        this.$store.getters.productsByTagAndVendor(
          'featured',
          this.$store.getters['brands/isCurrentBrandThirdParty'] ? this.brand : null,
          10
        )
      )
    },
    featuredTShirts(){
      return this.arrayShuffle(
        this.$store.getters.productsByTagAndVendor(
          'featured-t-shirt',
          this.$store.getters['brands/isCurrentBrandThirdParty'] ? this.brand : null,
          10
        )
      )
    },
    designsForBrand(){
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        return this.arrayShuffle(this.$store.getters['brands/currentBrandDesigns'])
      }
      return this.arrayShuffle(this.$store.getters['brands/allDesigns']);
    }
  },
  beforeMount(){

    // Load featured products
    this.$store.dispatch('load', {
      tag: 'featured AND -tag:featured-t-shirt',
      vendor: this.$route.params.collectionHandle ? this.$route.params.collectionHandle : 'all',
      limit: 10,
    });

    // Load featured t-shirts
    this.$store.dispatch('load', {
      limit: 10,
      tag: 'featured-t-shirt',
      vendor: this.$route.params.collectionHandle ? this.$route.params.collectionHandle : 'all'
    });
    window.addEventListener('resize', this.setWindowWidth)
    this.setWindowWidth();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWindowWidth)
  },
  methods: {
    setWindowWidth(){
      this.isMobileOrDesktop = window.innerWidth < '800' ? 'mobile' : 'desktop'
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  h1.meta {
    position: absolute;
    top: -10em;
    z-index: -1000;
  }

  section{
    margin-bottom: 2em;
  }

  .banner{
    position: relative;
    background: #eee;
    &.image{
      padding-top: 31%;
    }
    &.video{
      padding-top: 20%;
    }
    &.mid-hero{
      height: 80vw;
    }
    img, video{
      position: absolute;
      top: 0;
      width: 100%;
    }
    .hero-overlay-container{
      position: absolute;
      width: 100%;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
    }
    .hero-overlay{
      backdrop-filter: brightness(0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 2em 3em;
      .heading-1{
        color: white;
        text-transform: uppercase;
        text-align: center;
        line-height: 1em;
        font-size: 1.5em;
      }
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
    background: #000;
    padding: @pagePadding;
    /deep/ .VueCarousel-inner > *{
      margin-left: @pagePadding;
    }
    /deep/ .VueCarousel-slide{
      padding: 0;
    }
    /deep/ .product-image img {
      filter: brightness(100%) !important;
    }
  }

  .featured-shirts{
    box-sizing: border-box;
    background: #eee;
    /deep/ .product-image img {
      filter: brightness(100%) !important;
    }
    /deep/ .product-card{
      margin-bottom: 1em;
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
    .featured-shirts{
       /deep/ .product-card{
        margin-bottom: 2em;
      }
      padding: 2em 50px !important;
    }
    .hero-overlay{
      max-width: 60%;
    }
    .mid-hero{
      height: auto !important;
      .heading-1{
        font-size: 44px !important;
      }
    }
  }
  @media(min-width: @thirdbreakpoint){
    .tag-cards{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

<template>
  <div>
    <Strip class="full-width header-image">
      <img :src="assetUrl(`${brand}-home-header.jpg`)" class="header-image" :alt="pageTitle" :title="pageTitle"/>
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
    <Strip class="full-width header-image">
      <router-link :to="$store.getters['brands/currentBrandPath']('sections.home.midHero.link') || '/'">
        <img :src="assetUrl(`${brand}-mid-hero.jpg`)" class="header-image" loading="lazy" :alt="pageTitle" :title="pageTitle"/>
      </router-link>
    </Strip>
    <h1 class="center">DESIGNS</h1>
    <Strip class="designs narrow">
      <div v-for="(design, index) in designsForBrand" :key="index">
        <router-link :to="{
          name: 'TagInCollection',
          params: {
            collectionHandle: design.split('-')[0],
            tag: `${design}-design`
          }
        }">
          <img :src="assetUrl(`${design}-design.jpg`)" loading="lazy" :alt="`${tagReadable(design)} T-Shirts, Hoodies, Hats, Bags & More`" :title="`${tagReadable(design)} T-Shirts, Hoodies, Hats, Bags & More`"/>
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
import Strip from "../atoms/Strip.vue";
import TagCard from "../molecules/TagCard.vue";
import ProductCarousel from "../organisms/ProductCarousel.vue";
import Utilities from '../../utilities';

export default Vue.extend({
  metaInfo(){
    return {
      title: this.pageTitle
    }
  },
  components: {
    Strip,
    ProductCarousel,
    TagCard
  },
  computed:{
    pageTitle(){
      return `${this.$store.getters['brands/currentBrandName']} T-Shirts, Hoodies, Hats, Bags & More`;
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
      return Utilities.arrayShuffle(
        this.$store.getters.productsByTagAndVendor(
          'featured',
          this.$store.getters['brands/isCurrentBrandThirdParty'] ? this.brand : null,
          10
        )
      )
    },
    featuredTShirts(){
      return Utilities.arrayShuffle(
        this.$store.getters.productsByTagAndVendor(
          'featured-t-shirt',
          this.$store.getters['brands/isCurrentBrandThirdParty'] ? this.brand : null,
          10
        )
      )
    },
    designsForBrand(){
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        return Utilities.arrayShuffle(this.$store.getters['brands/currentBrandDesigns'])
      }
      return Utilities.arrayShuffle(this.$store.getters['brands/allDesigns']);
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
    background: #000;
    padding: @pagePadding;
    /deep/ .VueCarousel-inner{
      gap: @pagePadding;
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
  }
  @media(min-width: @thirdbreakpoint){
    .tag-cards{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

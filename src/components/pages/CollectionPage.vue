<template>
  <Page :bottom-spacing="true">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="collection-page">
      <div>
        <TagSelector
          :options="tagOptions"
          :value="$route.params.tag"
          role="navigation"
          aria-label="Category Navigation"
        />
        <TagSelector
          v-if="$store.getters['brands/isCurrentBrandHouseBrand']"
          :options="vendorOptions"
          :value="$route.params.collectionHandle"
          title="Brands"
          aria-label="Brand Navigation"
        />
      </div>
      <div style="display: flex; flex-direction: column; width: 100%;">
        <ProductGrid
          role="navigation"
          :products="productsForGrid"
        />
        <div class="loading">
          <ProgressSpinner class="center" v-if="!lastProductHasLoaded"/>
          <span class="bottom" v-if="lastProductHasLoaded" />
        </div>
      </div>
    </div>
  </Page>

</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Breadcrumbs from "../molecules/Breadcrumbs.vue";
import TagSelector from "../molecules/TagSelector.vue";
import ProductGrid from "../organisms/ProductGrid.vue";
import ProgressSpinner from "../atoms/ProgressSpinner.vue";

export default Vue.extend({
  metaInfo(){
    let titleParts = [];
    let currentTag = this.isDesignTag ? 'Logo' : this.tagReadable(this.$route.params.tag) || null;
    if(this.$store.getters['brands/isCurrentBrandThirdParty']){
      titleParts.push(this.$store.getters['brands/currentBrandName']);
      if(this.$route.name === 'Collection'){
        titleParts.push(`T-Shirts, Hats, Hoodies, Backpacks & more | Player Wear Official ${this.$store.getters['brands/currentBrandName']} Gear`);
      }else if(this.$route.name === 'TagInCollection'){
        if(this.isDesignTag){
          titleParts.push(`Logo T-Shirts, Hats, Hoodies, Backpacks & more | Player Wear Official ${this.$store.getters['brands/currentBrandName']} Gear`)
        }else{
          titleParts.push(`${currentTag} | Official ${this.$store.getters['brands/currentBrandName']} T-Shirts, Long Sleeve, Sweatshirts and More | Player Wear`)
        }
      }
    }else{
      if(this.$route.name === 'Collection'){
        titleParts.push('T-Shirts, Hats, Hoodies & More for Musicians. Player Wear officially licensed merch');
      }else if(this.$route.name === 'TagInCollection'){
        if(this.isDesignTag){
          titleParts.push(`Shirts for Musicians - Officially licensed t shirts, long sleeve, sweatshirts and more from your favorite brands`)
        }else{
          titleParts.push(`${currentTag} for Musicians - Officially licensed t shirts, long sleeve, sweatshirts and more from your favorite brands`)
        }
      }
    }
    return {
      title: titleParts.join(' ')
    }
  },
  components: {
    Page,
    Breadcrumbs,
    TagSelector,
    ProductGrid,
    ProgressSpinner
  },
  data(){
    return {
      loadNextPage: null,
      initialLoadFinished: false,
      tags: [
        'shirts',
        'womens-tops',
        'hoodies-and-jackets',
        'hats',
        'backpacks-and-bags',
        'shop-women',
        'shop-kids',
        'more-merch'
      ]
    }
  },
  computed: {
    tagOptions(){
      return this.tags.map(tag => {
        return {
          value: tag,
          label: this.tagReadable(tag),
          name: this.tagReadable(`${this.$route.params.collectionHandle} ${tag}`),
          link: {
            name: 'TagInCollection',
            params: {
              collectionHandle: this.$route.params.collectionHandle ? this.$route.params.collectionHandle : 'all',
              tag
            }
          },
          selected: this.$route.params.tag === tag
        }
      })
    },
    vendorOptions(){
      const options = this.$store.getters['brands/all']
        .filter(vendor => vendor.published)
        .map(vendor => {
          return {
            value: vendor.handle,
            label: vendor.title,
            name: `See All ${vendor.title} Products`,
            link: {
              name: this.$route.params.tag ? 'TagInCollection' : 'Collection',
              params: {
                collectionHandle: vendor.handle,
                tag: this.$route.params.tag
              }
            },
            selected: this.$route.params.collectionHandle === vendor.handle
          }
        })
        .sort((a,b)=>(a.label>b.label)?1:((b.label>a.label)?-1:0));

      if(this.$store.getters['brands/houseBrand'].handle === this.$route.params.collectionHandle){
        options.push({
          value: 'all',
          label: 'Shop All Brands',
          link: {
            name: this.$route.params.tag ? 'TagInCollection' : 'Collection',
            params: {
              collectionHandle: 'all',
              tag: this.$route.params.tag
            }
          },
        })
      }
      return options
    },
    productsForGrid(){
      if(this.initialLoadFinished && this.$store.getters.products.length > 0){
        const productsForGrid = this.$store.getters.products.filter(product => {

          let include = true;

          // Omit products if vendor is actually set
          if(this.$route.params.collectionHandle && this.$route.params.collectionHandle !== 'all' && this.tagify(product.vendor) !== this.$route.params.collectionHandle){
            include = false;
          }
          // Omit products by tags
          if(this.$route.params.tag && product.tags.find(tag => tag.value === this.$route.params.tag) === undefined){
            include = false;
          }
          // Omit products that aren't tagged with pw-global
          if(this.$route.params.collectionHandle === 'all' && !product.tags.find(tag => tag.value === 'pw-global')){
            include = false;
          }
          return include;
        })
        productsForGrid.sort((a, b) => (a.soldOut > b.soldOut) ? 1 : -1)
        return productsForGrid
      }
      return [];
    },
    lastProductHasLoaded(){
      return this.loadNextPage === false
    },
    isDesignTag(){
      return this.$route.params.tag &&  this.$route.params.tag.includes('design')
    },
    isInstrumentTag(){
      return this.$route.params.tag &&  this.$store.getters['brands/houseBrandInstrumentTags'].includes(this.$route.params.tag)
    },
    breadcrumbs(){
      const breadcrumbs = [];
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        breadcrumbs.push({
          label: this.$store.getters['brands/currentBrandTitle'],
          url: {
            name: "BrandHome",
            params: {
              collectionHandle: this.$route.params.collectionHandle
            }
          }
        });
      }else{
        breadcrumbs.push({
          label: this.$store.getters['brands/currentBrandTitle'],
          url: { name: "Home" }
        });
      }
      if(this.$route.params.tag){
        if(this.isDesignTag){
          breadcrumbs.push({
            label: 'Shop By Design',
            url: {
              name: "Designs",
              params: {
                collectionHandle: this.$route.params.collectionHandle
              }
            }
          });
        }
        breadcrumbs.push({
          label: this.tagReadable(this.$route.params.tag.replace(this.$store.getters['brands/currentBrandTitle'].toLowerCase(),''))
        });
      }

      return breadcrumbs;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to){
        this.initialLoadFinished = false;
        this.$store.dispatch('load', {
          tag: to.params.tag,
          vendor: to.params.collectionHandle,
          first: 6
        }).then(async loadNextPage => {

          // Initial load has finished.
          this.initialLoadFinished = true;
          this.loadNextPage = loadNextPage || false;

          if(this.shouldLoadNextPage()){
            // There's empty space and more content to load
            // Load the next page.
            this.loadNextPage = await this.loadNextPage() || false;
          }
        });
      }
    },
    lastProductHasLoaded:{
      immediate: true,
      handler(){
        if(this.lastProductHasLoaded && this.productsForGrid.length === 0){
          // There are zero products available on this page
          // redirect them to MissingPage
          this.$router.replace({name: 'MissingPage'});
        }
      }
    }
  },
  mounted(){

    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    shouldLoadNextPage(){
      return this.loadNextPage && (window.innerHeight + window.scrollY) >= (this.$el.clientHeight - (window.innerHeight / 2))
    },
    async onScroll(){
      if (this.shouldLoadNextPage()) {
        // Cache the function locally so it can't be fired again
        const loadNextPage = this.loadNextPage;
        this.loadNextPage = null;

        // Load the next page
        this.loadNextPage = (await loadNextPage()) || false;
      }
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .collection-page{
    display: flex;
    flex-direction: column;
  }

  .loading{
    width: 100%;
    height: 5vw;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .progress-spinner{
    transform: scale(2);
  }

  .bottom {
    width: 100px;
    border-bottom: 1px solid @gray4;
  }

  @media(min-width: @thirdbreakpoint){
    .collection-page{
      flex-direction: row;
    }
    .tag-selector{
      width: 220px;
      flex-shrink: 0;
    }
  }
</style>

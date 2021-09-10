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
        <TagSelector
          v-if="$store.getters['brands/isCurrentBrandHouseBrand']"
          :options="roleOptions"
          :value="$route.params.tag"
          title="Shop by Role"
          aria-label="Category Navigation"
        />
      </div>
      <div style="display: flex; flex-direction: column; width: 100%;">
        <ProductGrid
          role="navigation"
          :selected-tag="selectedTag"
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
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
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
      width: null,
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
    pageTitle(){
      let parts = [];
      let currentTag = this.isDesignTag ? 'Logo' : this.tagReadable(this.selectedTag) || null;
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        parts.push(this.$store.getters['brands/currentBrandName']);
        if(this.$route.name === 'Collection'){
          parts.push(`T-Shirts, Hats, Hoodies, Backpacks & more | Player Wear Official ${this.$store.getters['brands/currentBrandName']} Gear`);
        }else if(this.$route.name === 'TagInCollection'){
          if(this.isDesignTag){
            parts.push(`Logo T-Shirts, Hats, Hoodies, Backpacks & more | Player Wear Official ${this.$store.getters['brands/currentBrandName']} Gear`)
          }else{
            parts.push(`${currentTag} | Official ${this.$store.getters['brands/currentBrandName']} T-Shirts, Long Sleeve, Sweatshirts and More | Player Wear`)
          }
        }
      }else{
        // if(this.$route.name === 'Collection'){
        //   parts.push(``);
        // }else if(this.$route.name === 'TagInCollection'){
        //   if(this.isDesignTag){
        //     parts.push(``)
        //   }else{
        //     parts.push(``)
        //   }
        // }
      }
      return parts.join(' ')
    },
    pageDescription(){
      let parts = [];
      let currentTag = this.isDesignTag ? 'Logo' : this.tagReadable(this.selectedTag) || null;
      if(this.$store.getters['brands/isCurrentBrandThirdParty']){
        if(this.$route.name === 'Collection'){
          // parts.push();
        }else if(this.$route.name === 'TagInCollection'){
          if(this.isDesignTag){
            parts.push(`Your official source for ${this.$store.getters['brands/currentBrandName']} merch. Select from traditional, vintage and exclusive ${this.$store.getters['brands/currentBrandName']} designs, available on a wide range of products.`)
          }else{
            parts.push(`Your official source for ${this.$store.getters['brands/currentBrandName']} ${currentTag}. Select from a massive selection of ${this.$store.getters['brands/currentBrandName']} ${currentTag}, t-shirts, sweatshirts, hoodies and much more`)
          }
        }
      }else{
        // if(this.$route.name === 'Collection'){
        //   parts.push();
        // }else if(this.$route.name === 'TagInCollection'){
        //   if(this.isDesignTag){
        //     parts.push()
        //   }else{
        //     parts.push()
        //   }
        // }
      }
      return parts.join(' ')
    },
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
          selected: this.selectedTag === tag
        }
      })
    },
    roleOptions(){
      return this.$store.state.roles.roles.map(role => {
        return {
          value: `role-${role}`,
          label: this.tagReadable(role),
          name: this.tagReadable(role),
          link: {
            name: 'ShopByRole',
            params: { tag: `role-${role}` }
          },
          selected: this.selectedTag === `role-${role}`
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
              name: this.selectedTag ? 'TagInCollection' : 'Collection',
              params: {
                collectionHandle: vendor.handle,
                tag: this.isRoleTag ? 'shirts' : this.selectedTag
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
            name: this.selectedTag ? 'TagInCollection' : 'Collection',
            params: {
              collectionHandle: 'all',
              tag: this.selectedTag
            }
          },
        })
      }
      return options
    },
    productsForGrid(){
      if(this.initialLoadFinished && this.$store.getters['products/all'].length > 0){
        const collectionHandle = this.$route.params.collectionHandle;
        const tag = this.selectedTag;
        const isCollection = !!collectionHandle;

        const productsForGrid = this.$store.getters['products/all'].filter(product => {
          let include = true;

          if(isCollection){
            if(collectionHandle == 'all'){
              // THIS PAGE IS "ALL" COLLECTION
              // OMIT PRODUCTS NOT TAGGED WITH PW-GLOBAL
              if(this.$route.params.collectionHandle === 'all' && !product.tags.find(tag => tag.value === 'pw-global')){
                include = false;
              }
            }else{
              // THIS PAGE IS A VENDOR COLLECTION
              // ENSURE PRODUCT IS CORRECT VENDOR
              if(this.tagify(product.vendor) !== collectionHandle){
                // PRODUCT DOES NOT MATCH VENDOR. OMIT FROM LIST.
                include = false;
              }
            }
          }
          if(tag && product.tags.find(t=>t.value===tag) === undefined){
            // THIS PAGE IS FOR A TAG/CATEGORY
            // PRODUCT DOES NOT HAVE TAG. OMIT FROM LIST.
            include = false;
          }
          return include;
        })
        return productsForGrid
      }
      return [];
    },
    lastProductHasLoaded(){
      return this.loadNextPage === false
    },
    selectedTag(){
      return this.$route.params.tag;
    },
    isDesignTag(){
      return this.selectedTag &&  this.selectedTag.includes('design')
    },
    isRoleTag(){
      return this.selectedTag &&  this.selectedTag.includes('role')
    },
    isInstrumentTag(){
      return this.selectedTag &&  this.$store.getters['brands/houseBrandInstrumentTags'].includes(this.selectedTag)
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
      if(this.selectedTag){
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
        if(this.isRoleTag){
          breadcrumbs.push({
            label: 'Shop By Role'
          });
        }
        breadcrumbs.push({
          label: this.tagReadable(
            this.selectedTag
              .replace(this.$store.getters['brands/currentBrandTitle'].toLowerCase(),'')
            .replace('role', '')
          )
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
        this.$store.dispatch('products/load', {
          tag: this.selectedTag,
          vendor: to.params.collectionHandle,
          first: this.isDesktop() ? 6 : 4
        }).then(async loadNextPage => {
          // Initial load has finished.
          this.initialLoadFinished = true;
          this.loadNextPage = loadNextPage || false;
          console.log(this.shouldLoadNextPage())
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
          // this.$router.replace({name: 'MissingPage'});
        }
      }
    }
  },
  mounted(){
    if(process.client){
      this.width = window.innerWidth;
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }
  },
  beforeDestroy(){
    if(process.client){
      window.removeEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    shouldLoadNextPage(){
      if(process.client){
        return this.loadNextPage && (window.innerHeight + window.scrollY) >= (this.$el.clientHeight - (window.innerHeight))
      }else{
        return false;
      }
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

<template>
  <Page :bottom-spacing="true">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="collection-page">
      <div>
        <TagSelector :options="tagOptions" :value="$route.params.tag" role="navigation" aria-label="Category Navigation"/>
        <br />
        <TagSelector
          v-if="$store.getters['brands/isCurrentBrandHouseBrand']"
          title="Brands"
          :options="vendorOptions"
          :value="$route.params.collectionHandle"
        />
      </div>
      <div class="product-grid">
        <ProductCard v-for="(product, index) in productsForGrid" :key="index" :product="product" role="navigation" aria-label="Brand Navigation"/>
      </div>
    </div>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Utilities from "../../utilities";
import Breadcrumbs from "../molecules/Breadcrumbs.vue";
import TagSelector from "../molecules/TagSelector.vue";
import ProductCard from "../molecules/ProductCard.vue";

export default Vue.extend({
  metaInfo(){
    let title = '';
    if(this.$store.getters['brands/isCurrentBrandThirdParty']){
      title = this.$store.getters['brands/currentBrandName'];
    }
    const tag = String(Utilities.tagReadable(this.$route.params.tag)).replace(
      this.$store.getters['brands/currentBrandName'],''
    );
    if(tag){
      title += ` ${tag}`;
    }else{
      title += ` T-Shirts, Hoodies, Bags, Hats & More`;
    }
    return { title }
  },
  components: {
    Page,
    Breadcrumbs,
    TagSelector,
    ProductCard
  },
  data(){
    return {
      tags: [
        'shirts',
        'womens-tops',
        'hoodies-and-jackets',
        'backpacks-and-bags',
        'shop-women',
        'shop-kids',
        'more-merch'
      ]
    }
  },
  beforeMount(){
    this.$store.dispatch('loadCollectionWithProducts', this.$route.params.collectionHandle);
  },
  computed: {
    tagOptions(){
      return this.tags.map(tag => {
        return {
          value: tag,
          label: Utilities.tagReadable(tag),
          name: Utilities.tagReadable(`${this.$route.params.collectionHandle} ${tag}`),
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
      return this.$store.getters['brands/all'].map(vendor => {
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
    },
    productsForGrid(){
      if(this.$store.getters.products.length > 0){
        return this.$store.getters.products.filter(product => {
          let include = true;
          if(this.$route.params.collectionHandle && this.$route.params.collectionHandle !== 'all' && product.vendor.toLowerCase() !== this.$route.params.collectionHandle){
            include = false;
          }
          if(this.$route.params.tag && product.tags.find(tag => tag.value === this.$route.params.tag) === undefined){
            include = false;
          }
          return include;
        })
      }
      return [null, null, null, null, null];
    },
    breadcrumbs(){
      const breadcrumbs = [];
      if(this.$route.params.collectionHandle) {
        breadcrumbs.push({
          label: this.$store.getters['brands/currentBrandTitle'],
          url: {
            name: "BrandHome",
            params: {
              collectionHandle: this.$route.params.collectionHandle
            }
          }
        });
      }
      if(this.$route.params.tag){
        if(this.$route.params.tag.includes('design')){
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
          label: Utilities.tagReadable(this.$route.params.tag)
        });
      }

      return breadcrumbs;
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

  .product-grid{
    flex-grow: 1;
    display: grid;
    flex-wrap: wrap;
    grid-column-gap: 1em;
    grid-row-gap: 2em;
    grid-template-columns: 1fr 1fr;
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
  @media(min-width: @fourthbreakpoint){
    .product-grid{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

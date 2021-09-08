<template>
  <Page :top-spacing="true" :bottom-spacing="true" class="really-narrow-fixed">
    <h3>Oops... Missing Page 404.</h3>
    <h1>Looks like we missed a beat...</h1>
    <router-link class="image-container" :to="shopShirtsRoute">
      <img :src="imageUrl"/>
    </router-link>
    But check out our cool {{thirdPartyBrandName}} T-Shirts, hats, hoodies & more!
    <Button
      class="full-width"
      icon="shirt-filled"
      @click="shopShirts"
      :label="`Shop ${thirdPartyBrandName} Player Wear`"
    />
  </Page>
</template>
<script lang="ts">
import Vue from 'vue';
import Page from "../atoms/Page.vue";
import Button from "../atoms/Button.vue";
import pageMetaMixin from '../mixins/pageMetaMixin'

export default Vue.extend({
  mixins: [pageMetaMixin],
  data(){
    return {
      pageTitle: 'Missing Page 404'
    }
  },
  components: {
    Page,
    Button
  },
  computed:{
    imageUrl(){
      return this.assetUrl(Math.round(Math.random()) ? 'spinal-tap-kick-my-ass.gif' : 'spinal-tap-drummer.gif');
    },
    thirdPartyBrandName(){
      return this.$store.getters['brands/isCurrentBrandThirdParty'] ? this.$store.getters['brands/currentBrandName'] : null;
    },
    shopShirtsRoute(){
      return {
        name: this.$store.getters['brands/isCurrentBrandThirdParty'] ? 'BrandHome' : 'Home',
        params: {
          collectionHandle: this.$store.getters['brands/currentBrandHandle']
        }
      }
    }
  },
  methods: {
    shopShirts(){
      this.$router.push(this.shopShirtsRoute)
    }
  }
});
</script>
<style scoped lang="less">
  .image-container{
    display: block;
    width: 100%;
    padding-top: 50%;
    overflow: hidden;
    position: relative;
    margin: 0 auto 1em auto;
    border-radius: 3px;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    transform: scale(1.05);
  }
  button{
    font-size: 1.5em;
    font-weight: 600;
  }
</style>

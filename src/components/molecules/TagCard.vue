<template>
  <router-link class="tag-card" :to="route">
    <ProductImage :src="src" :alt="alt"/>
    <Button class="white" v-if="buttonLabelReadable">
      {{ buttonLabelReadable }}
    </Button>
  </router-link>
</template>
<script lang="ts">
import Vue from 'vue';

import ProductImage from "../atoms/ProductImage.vue";
import Button from "../atoms/Button.vue";
import Utilities from '../../utilities';
export default Vue.extend({
  props: {
    tag: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    buttonLabel: {
      type: String
    }
  },
  components: {
    Button,
    ProductImage
  },
  computed: {
    buttonLabelReadable(){
      return this.buttonLabel || Utilities.tagReadable(this.tag)
    },
    route(){
      return {
        name: "TagInCollection",
        params: {
          collectionHandle: this.$route.params.collectionHandle || 'all',
          tag: this.tag
        }
      };
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .tag-card{
    position: relative;
  }
  button{
    position: absolute;
    bottom: 1px;
    left: 50%;
    width: 80%;
    margin-left: -40%;
    font-weight: 800;
    text-transform: uppercase;
    padding: 0.5em;
    font-size: 0.9em;
  }


  @media(min-width: @firstbreakpoint){
    button {
      font-size: 1.2rem !important;
    }
  }

  @media(min-width: @thirdbreakpoint){
    button {
      padding: 0.75em;
      width: 70%;
      margin-left: -35%;
    }
  }
</style>

<template>
  <div class="header-container">
    <header>
      <aside class="left">
        <div :class="{hamburger: true, x:showMobileMenu}" @click="showMobileMenu=!showMobileMenu">
          <div />
          <div />
          <div />
        </div>
        <nav class="desktop-menu">
          <router-link v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.route" :class="menuItem.class">
            {{menuItem.title}}
          </router-link>
        </nav>
      </aside>
      <div class="logo-container">
        <router-link v-if="isThirdPartyBrand" class="third-party-brand-link" :to="{name: 'BrandHome', collectionHandle: this.brand}">
          <img :src="thirdPartyBrandLogoUrl"/>
        </router-link>
        <router-link :to="{name: 'Home'}" class="house-brand-link">
          <img :src="houseBrandLogoUrl"/>
        </router-link>
      </div>
      <aside class="right">

      </aside>
    </header>

    <transition name="fade">
      <div v-if="showMobileMenu" class="mobile-menu-container" @click="showMobileMenu=false">
        <nav class="mobile-menu" @click.stop>
          <router-link v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.route" :class="menuItem.class">
            {{menuItem.title}}
            <IconSvg v-if="menuItem.class && menuItem.class.includes('chevron')" name="chevron" />
          </router-link>
        </nav>
      </div>
    </transition>

  </div>
</template>
<script lang="ts">

import Vue from 'vue';
import IconSvg from '../atoms/IconSvg.vue';

export default Vue.extend({
  props: {
    brand: {
      type: String,
      required: true
    },
    isThirdPartyBrand: {
      type: Boolean,
      required: true
    }
  },
  components: {
    IconSvg
  },
  data(){
    return {
      showMobileMenu: false
    }
  },
  computed :{
    thirdPartyBrandLogoUrl(){
      return `${assetUrl}collection_logo_${this.brand}.png`;
    },
    houseBrandLogoUrl(){
      return `${assetUrl}collection_logo_player-wear.png`;
    },
    menuItems(){
      return [
        {
          title: 'Men',
          class: 'bold chevron',
          route: {
            name: 'Home'
          }
        },
        {
          title: 'Women',
          class: 'bold chevron',
          route: {
            name: 'Home'
          }
        }
      ]
    }
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  header{
    position: fixed;
    top: 0;
    height: @headerHeightMobile;
    width: 100%;
    background: black;
    color: white;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: @pagePadding;
    padding-right: @pagePadding;
    box-sizing: border-box;
  }

  .hamburger{
    position: relative;
    z-index: 2;
    width: 36px;
    height: 27px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-direction: column;
    &.x div{
      position: absolute;
      width: 100%;
      top: calc(50% - 2px);
      &:nth-child(1){
        transform: rotate(-45deg);
      }
      &:nth-child(2){
        opacity: 0;
      }
      &:nth-child(3){
        transform: rotate(45deg);
      }
    }
    div{
      height: 4px;
      border-radius: 2px;
      background: white;
      transition: transform 250ms;
    }
  }
  .mobile-menu-container{
    position: fixed;
    top:@headerHeightMobile;
    right:0;
    bottom:0;
    left:0;
    z-index: 1;
    background: #0005;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }
  .mobile-menu{
    background: white;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    a{
      display: flex;
      border-bottom:1px solid #0003;
      padding: 0.75em @pagePadding;
      text-decoration: none;
      color: black;
      line-height: 1.5rem !important;
      align-items: center;
      justify-content: space-between;
    }
  }

  nav a.bold{
    text-transform: uppercase;
    font-weight: 800;
  }

  aside{
    flex-grow: 1;
    gap: 2em;
    display: flex;
    flex-basis: 0;
    &.right{
      justify-content: flex-end;
    }
    a{
      color: white;
      text-decoration: none;
    }
  }
  .logo-container{
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    img{
      max-width: 190px;
      max-height: 40px;
      object-fit: contain;
    }
  }

  .third-party-brand .house-brand-link{
    display: none;
  }

  .desktop-menu {
    display: none;
    gap: 1.5em;
  }
  @media(min-width: @thirdbreakpoint){
    header{
      height: @headerHeightDesktop;
    }
    .hamburger {
      display: none;
    }
    .mobile-menu-container{
      display: none;
    }
    .logo-container img{
      max-width: 200px;
      max-height: 50px;
      object-fit: contain;
    }
    .third-party-brand-link{
      padding-top: 1em;
    }
    .third-party-brand .house-brand-link{
      display: block;
      img{
        max-width: 100px;
      }
    }
    .desktop-menu{
      display: flex;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 250ms;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

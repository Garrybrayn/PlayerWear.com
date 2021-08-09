<template>
  <div class="header-container">
    <header :style="styles">
      <div class="aside left">
        <div :class="{hamburger: true, x:showMobileMenu}" @click="showMobileMenu=!showMobileMenu">
          <div />
          <div />
          <div />
        </div>
        <nav class="desktop-menu" role="navigation" aria-label="Main Navigation">
          <div v-for="(menuItem, index) in menuItems" :key="index" :class="menuItem.class" @click="toggleMenu(index)">
            <span class="title">{{menuItem.title}}</span>
            <div v-if="menuItem.sections" :class="{
              'section-container': true,
              open: openMenuItemIndex === index,
              closed: openMenuItemIndex !== index
            }"
            @click.stop>
              <div v-for="(section, sectionIndex) in menuItem.sections" :key="sectionIndex" class="section">
                <span class="title">{{section.title}}</span>
                <router-link v-for="(child, childIndex) in section.children" :key="childIndex" :to="{
                  name: 'TagInCollection',
                  params: {
                    collectionHandle: $store.getters['brands/isCurrentBrandThirdParty'] ? $store.getters['brands/currentBrandHandle'] : 'all',
                    tag: child.tag
                  }
                }">
                  {{child.title}}
                </router-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="logo-container">
        <router-link v-if="$store.getters['brands/isCurrentBrandThirdParty']" class="third-party-brand-link" :to="{name: 'BrandHome', collectionHandle: $store.getters['brands/currentBrandHandle']}">
          <img :src="thirdPartyBrandLogoUrl" :alt="title" />
        </router-link>
        <router-link v-else :to="{name: 'Home'}" class="house-brand-link">
          <img :src="houseBrandLogoUrl" :alt="title" />
        </router-link>
      </div>
      <div class="aside right">
        <button @click="$emit('toggleCart')" aria-label="Search">
          <IconSvg name="magnifying-glass" />
          <span class="label">Search</span>
        </button>
        <button @click="$emit('toggleCart')" aria-label="View Shopping Cart">
          <i class="uil-shopping-cart icon">
            <span class="cart-item-count">{{ $store.getters['cart/uniqueItemCount']}}</span>
          </i>
          <span class="label">View Cart</span>
        </button>
      </div>
    </header>

    <transition name="fade">
      <div v-if="showMobileMenu" class="mobile-menu-container" @click="showMobileMenu=false">
        <nav class="mobile-menu" @click.stop role="navigation" aria-label="Main Navigation">
          <component
            v-for="(menuItem, index) in menuItems"
            :key="index" :class="menuItem.class"
            :is="menuItem.route ? 'router-link' : 'div'"
            :to="menuItem.route"
          >
            <span :class="{
              'menu-item': true,
              'has-children': menuItem.sections ? true : false,
              open: openMenuItemIndex === index,
              closed: openMenuItemIndex !== index
            }" @click="toggleMenu(index)">
              {{menuItem.title}}
              <IconSvg v-if="menuItem.sections || (menuItem.class && menuItem.class.includes('chevron'))" name="chevron" />
            </span>
            <nav class="mobile-menu" v-if="menuItem.sections" role="navigation" :aria-label="`${menuItem.title} Navigation`">
              <component
                v-for="(childItem, index) in menuItem.sections[0].children"
                :key="index" :class="childItem.class"
                :is="childItem.route ? 'router-link' : 'div'"
                :to="childItem.route"
              >
                <span class="menu-item">
                  {{childItem.title}}
                  <IconSvg v-if="childItem.class && childItem.class.includes('chevron')" name="chevron" />
                </span>
              </component>
            </nav>
          </component>
        </nav>
      </div>
    </transition>

  </div>
</template>
<script lang="ts">

import Vue from 'vue';
import IconSvg from '../atoms/IconSvg.vue';

export default Vue.extend({
  components: {
    IconSvg
  },
  data(){
    return {
      showMobileMenu: false,
      openMenuItemIndex: false,
      menuItems: [
        {
          title: 'Men',
          class: 'bold',
          open: false,
          sections: [
            {
              title: 'Men',
              children: [
                {
                  title: 'Shirts',
                  tag: 'shirts'
                },
                {
                  title: 'Hoodies & Jackets',
                  tag: 'hoodies-and-jackets'
                },
                {
                  title: 'Hats',
                  tag: 'hats'
                }
              ]
            },
            {
              title: 'More Merch',
              children: [
                {
                  title: 'Backpacks & Bags',
                  tag: 'backpacks-and-bags'
                },
                {
                  title: 'Hats',
                  tag: 'hats'
                },
                {
                  title: 'Drinkware',
                  tag: 'drinkware'
                },
                {
                  title: 'Phone Cases',
                  tag: 'phone-cases'
                },
                {
                  title: 'Stickers',
                  tag: 'stickers'
                },
                {
                  title: 'See all Specialty Merch',
                  tag: 'more-merch'
                }
              ]
            }
          ],
        },
        {
          title: 'Women',
          class: 'bold',
          open: false,
          sections: [
            {
              title: 'Women',
              children: [
                {
                  title: "Women's Tops",
                  tag: 'womens-tops'
                },
                {
                  title: "Unisex Shirts",
                  tag: 'shirts'
                },
                {
                  title: 'Hoodies & Jackets',
                  tag: 'hoodies-and-jackets'
                },
                {
                  title: 'Hats',
                  tag: 'hats'
                }
              ]
            },
            {
              title: 'More Merch',
              children: [
                {
                  title: 'Backpacks & Bags',
                  tag: 'backpacks-and-bags'
                },
                {
                  title: 'Hats',
                  tag: 'hats'
                },
                {
                  title: 'Drinkware',
                  tag: 'drinkware'
                },
                {
                  title: 'Phone Cases',
                  tag: 'phone-cases'
                },
                {
                  title: 'Stickers',
                  tag: 'stickers'
                },
                {
                  title: 'See all Specialty Merch',
                  tag: 'more-merch'
                }
              ]
            }
          ],
        }
      ]
    }
  },
  computed :{
    title(){
      return this.$store.getters['brands/currentBrandName'];
    },
    thirdPartyBrandLogoUrl(){
      return `${assetUrl}${this.$store.getters['brands/currentBrandHandle']}-logo.svg`;
    },
    houseBrandLogoUrl(){
      return this.$store.getters['brands/isCurrentBrandThirdParty'] ? `${assetUrl}collection_logo_player-wear-simplified.png` : `${assetUrl}collection_logo_player-wear.png`;
    },
    styles(){
      const styles = {
        borderBottomColor: this.$store.getters['brands/currentBrandColor']
      }
      if(this.$store.getters['brands/currentBrandHeaderBackgroundImage']){
        styles.backgroundImage = `url(${assetUrl}${this.$store.getters['brands/currentBrandHeaderBackgroundImage']})`;
      }
      return styles
    }
  },
  watch: {
    $route(){
      this.openMenuItemIndex = false;
    }
  },
  methods: {
    toggleMenu(index){
      if(this.openMenuItemIndex && this.openMenuItemIndex === index){
        // close it
        this.openMenuItemIndex = false
      }else{
        this.openMenuItemIndex = index
      }
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
    border-bottom-width: 2px;
    border-bottom-style: solid;
    box-shadow: 0px 0px 3px #0008;
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
    text-transform: none;
    font-weight: 600;
    a{
      display: block;
      text-decoration: none;
    }
  }
  .menu-item{
    display: grid;
    border-bottom:1px solid #0003;
    padding: 0.75em @pagePadding;
    text-decoration: none;
    color: black;
    line-height: 1.5rem !important;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 1fr 1em;

    &.open .chevron{
      transform: rotate(90deg);
    }
    .chevron{
      transition: transform 200ms;
    }
  }
  .closed + .mobile-menu{
    display: none;
  }

  .mobile-menu .mobile-menu .menu-item{
    padding-left: calc(@pagePadding * 2);
    color: gray;
  }

  .bold, .title{
    text-transform: uppercase;
    font-weight: 700;
  }

  .aside{
    flex-grow: 1;
    gap: 1em;
    display: flex;
    flex-basis: 0;
    &.right{
      justify-content: flex-end;
      button{
        background: transparent;
        margin:0;
        padding: 0;
        color: white;
        border: none;
        position: relative;
      }
      .icon{
        font-size: 1.4rem;
        vertical-align: middle;
      }
      .label{
        display: none;
      }
      .cart-item-count{
        position: absolute;
        right: -0.5em;
        font-size: 11px;
        background: white;
        border:2px solid black;
        border-radius: 1.5rem;
        color: black;
        padding: 0.2em 0.3em;
        font-weight: 700;
        font-style: normal;
      }
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
    height: 45px;
    width: 111px;
    img{
      max-width: 111px;
      max-height: 45px;
      object-fit: contain;
      height: 100%;
      width: 100%;
      display: block;
      margin:0 auto;
    }
  }

  .third-party-brand .house-brand-link{
    display: none;
  }


  .desktop-menu {
    display: none;
    gap: 1.5em;
    .section-container{
      position: absolute;
      background: white;
      top: 100px;
      left: 0;
      right: 0;
      width: 100%;
      box-sizing: border-box;
      color: black;
      display: flex;
      padding: 1.5em @pagePadding 2em @pagePadding;
      gap: 3.5em;
      font-weight: 600;
      text-transform: none;
      border-bottom: 1px solid #0002;
      box-shadow: 0px 0px 200px #0004;
      &.closed{
        top: auto;
        bottom: 100vh;
        opacity: 0;
      }
      &.open{
        top: 100px;
        bottom: auto;
        opacity: 1;
      }
    }
    .title{
      cursor: pointer;
    }
    .section{
      padding-left: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }
    a{
      color: black;
    }
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
    .logo-container {
        width: 360px;
        height: 80px;
        img{
          max-width: 360px;
          max-height: 80px;
          object-fit: contain;
        }
    }
    .third-party-brand .house-brand-link{
      display: block;
      img{
        margin-top: 5px;
        max-width: 169px;
      }
    }
    .desktop-menu{
      display: flex;
      gap: 3.5em;
      margin-left: 1.5em;
    }
    .aside.right{
      .icon{
        font-size: 1.75rem;
      }
      button:last-child{
        margin-right: 2em;
      }
      .cart-item-count{
        font-size: 0.8rem;
      }
    }
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity 250ms;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .korg header{
    background-image: var(--asssetUrl)
  }
</style>

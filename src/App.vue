<template>
  <div id="vue-app">
    <router-view/>
  </div>
</template>
<style lang="less">
#vue-app{
  font-family: 'Open Sans';
  line-height: 1.5em;
}
  .placeholder-content{
    min-height: 1em;
    background: #eee;
    border-radius: 2px;
    display: none;
  }
  .placeholder .placeholder-content{
    display: inline-block;
  }
  h1, h2{
    text-transform: uppercase;
    &.center{
      text-align: center
    }
  }
</style>

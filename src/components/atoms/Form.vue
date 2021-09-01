<template>
  <div class="form-container">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
<style scoped lang="less">
  @import '../../less/variables';

  .form-container.grid{
    display: grid;
    column-gap: 1.5em;
  }

  input[type=text], input[type=email], input[type=password], select, textarea{
    width: 100%;
    padding: 0.5em 1em;
    font: inherit;
    color: @black;
    box-sizing: border-box;
    border: 1px solid @gray3;
    border-radius: 3px;
    outline: none;
  }
  .input-container{
    margin-bottom: 1em;
    label{
      margin-bottom: 0.25em;
      display: block;
    }
  }
  a{
    &:hover{
      text-decoration: underline;
    }
    &:after, &:before {
      content: '';
      margin:0 0.2em;
    }
    &:first-child:before{
      margin: 0;
    }
  }
  p{
    margin-bottom: 1em;
  }
  .link-list span{
    padding: 0 0.25em;
    line-height: 1em;
    color: @gray3;
  }
  button{
    margin-bottom: 1em !important;
  }
  .error{
    margin-bottom: 1em;
  }

  @media(min-width: @secondbreakpoint){
    input[type=text], input[type=email], input[type=password]{
      font-size: 1.1em;
    }
    .grid{
      grid-template-columns: 50% 50%;
      .input-container{
        grid-column: span 2;
        &.half{
          grid-column: span 1;
        }
      }
    }
  }
</style>

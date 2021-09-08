<template>
  <div class="modal" @click="$emit('close')">
    <Button class="round" icon="x" @click="$emit('close')" label="close"/>
    <div @click.stop>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

import Button from '../atoms/Button.vue';
export default Vue.extend({
  components: {
    Button
  }
});
</script>
<style scoped lang="less">
  @import '../../less/variables';
  .modal{
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 12;
  }
  .modal-contents{
    background: white;
    padding: 1em 1.5em;
    max-width: 600px;
    box-sizing: border-box;
  }
  button{
    position: absolute;
    z-index: 100;
    top:0;
    right:0;
    margin: 1em;
    align-self: flex-end;
    justify-self: flex-end;
    background: white;
    color: black;
  }
  @media(min-width:@secondbreakpoint){
    .modal-contents{
      padding: 2em 3em;
    }
  }
</style>

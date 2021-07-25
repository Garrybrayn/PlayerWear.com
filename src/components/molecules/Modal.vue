<template>
  <div class="modal">
    <Button class="round" icon="x" @click="$emit('close')">Close</Button>
    <slot />
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
  .modal{
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 12;
  }
  button{
    position: absolute;
    z-index: 100;
    top:0;
    right:0;
    margin: 1em;
    align-self: flex-end;
    justify-self: flex-end;
  }
</style>

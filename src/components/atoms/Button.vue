<template>
  <button
    :class="classes"
    :style="style"
    type="button"
    @click="onClick"
  >
    <IconSvg
      v-if="icon"
      :name="icon"
    />
    {{ label }}
    <slot />
  </button>
</template>
<script lang="ts">
import Vue from 'vue'
import IconSvg from './IconSvg.vue'

export default Vue.extend({
  name: 'Button',
  components: {
    IconSvg
  },
  props: {
    label: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'medium'
    },
    icon: {
      type: String,
      default: ''
    },
    hasChevron: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object, null],
      default: null
    }
  },
  computed: {
    classes () {
      return {
        button: true,
        'has-chevron': this.hasChevron,
        disabled: this.disabled === true,
        small: this.size === 'small',
        medium: this.size === 'medium',
        large: this.size === 'large',
        warning: this.warning
      }
    },
    style () {
      if (this.backgroundColor) {
        return `background:${this.backgroundColor}`
      }
      return ''
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
})

</script>
<style scoped lang="less">

  @import '../../less/variables';

  button {
    background: @black;
    font: inherit;
    padding: 0.75em 1.75em;
    border-radius: 2px;
    cursor: pointer;
    font-weight: 500;
    outline: none;
    margin-top: 1em;
    margin-bottom: 1em;
    position: relative;
    border: 0;
    color: #fff;
    white-space: nowrap;
      box-sizing: border-box;
    &.full-width{
      width: 100%;
      padding: 0.75em .5em;
    }
    &.link{
      color: @gray1;
      background: transparent;
      padding: .4rem 0.75rem;
      &:hover, &:active {
        color: @black;
      }
      &.warning {
        color: @red;
        background: transparent;
        &:hover, &:active{
          color: @white;
        }
      }
    }
    &.primary {
      background: @black;
      &:hover, &:active {
        background: darken(@black, 5%)
      }
      .icon {
        height: 1.5em;
        width: 1.5em;
      }
    }
    &.uppercase{
      text-transform: uppercase;
      font-weight: 700;
    }

    &.secondary {
      background: @black;
      color: @gray3;
      &:hover, &:active {
        opacity: 0.8;
      }
      .icon {
        height: 1.5em;
        width: 1.5em;
      }
    }

    &.white {
      background: @white;
      color: @black;
      box-shadow: 0px 0px 2 em rgba(0,0,0,0.03);
      &:hover{
        background: @white;
        color: @black;
      }
      &:active {
        background: @gray3;
      }
      .icon {
        height: 1.5em;
        width: 1.5em;
      }
    }
    &.disabled {
      background: @gray2;
      color: @white;
      cursor: not-allowed;
      &:hover, &:active{
        background: @gray2;
        color: @gray5;
      }
    }
    &.outline{
      background: transparent;
      border: 1px solid @black;
    }
    &.round{
      border-radius: 100px;
    }

    &.block{
      width: 100%;
    }

    &.warning {
      color: @red;
    }
    &.has-chevron {
      padding-right: 2.5rem;
    }
    &.small {
      font-size: 80%;
    }
    &.medium {

    }
    &.large {
      font-size: 120%;
    }
    &.circle{
      height: 2.5em;
      width: 2.5em;
      padding: 0;
      border-radius: 50%;
      margin: 0;
      .icon {
        margin-right: revert;
      }
    }
    &.rotate-icon-90 .icon{
      transform: rotate(90deg);
    }
    &.rotate-icon-180 .icon{
      transform: rotate(180deg);
    }
    &.rotate-icon-270 .icon{
      transform: rotate(270deg);
    }
  }

  .icon {
    margin-right: 0.25em;
  }

  .has-chevron:after {
    content: '';
    border-top: 1px solid;
    border-right: 1px solid;
    border-color: currentColor;
    display: inline-block;
    height: 0.75rem;
    width: 0.75rem;
    transform: rotate(45deg);
    position: absolute;
    right: 1.5em;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>

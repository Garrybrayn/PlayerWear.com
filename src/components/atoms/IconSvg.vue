<template>
  <div :class="classes">
    <slot />
    <svg
      v-if="name==='chevron'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        class="fill"
        d="M36.2,9c-2.6-2.5-6.7-2.4-9.2,0.2s-2.4,6.7,0.2,9.2v0L59,49.2L27,82.3c-2.5,2.6-2.4,6.7,0.2,9.2c2.6,2.5,6.7,2.4,9.2-0.2
				l36.5-37.8c1.2-1.3,1.9-2.9,1.8-4.7c0-1.7-0.7-3.4-2-4.6L36.2,9z"
      />
    </svg>
    <svg v-if="name==='shopping-bag'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" id="footer-sample-full" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="iconify iconify--uil"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zm-9-1a2 2 0 0 1 4 0v1h-4zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2z" fill="currentColor"></path></svg>
    <svg
      v-if="name==='star'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        class="fill"
        d="M93.6,35.9l-8.2-0.2l-21.4-0.4l-4.3-12.5L57,15.1l-2.7-7.7c0,0,0,0,0,0c-2.4-6.9-6.3-6.9-8.7,0c0,0,0,0,0,0
	L43,15.1l-2.7,7.7l-4.3,12.5l-21.4,0.4l-8.2,0.2c-7.3,0.1-8.5,3.9-2.7,8.3c0,0,0,0,0,0l6.5,4.9l6.5,4.9l10.6,8L21,82.6l-2.4,7.8
	c-2.1,7,1.1,9.3,7,5.1c0,0,0,0,0,0l6.7-4.7l6.7-4.7L50,78.6l10.9,7.6l6.7,4.7l6.7,4.7c0,0,0,0,0,0c6,4.1,9.1,1.8,7-5.1l-8.6-28.3
	l17.1-12.9l6.5-4.9C102.1,39.8,100.9,36.1,93.6,35.9z"
      />
    </svg>
    <svg
      v-if="name==='chainlink'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        class="fill"
        d="M50.6,32.8l17.5-17.5l0,0c1.1-1.1,2.4-1.9,3.8-2.5c1.4-0.6,2.8-0.8,4.3-0.8s2.9,0.3,4.3,0.8c1.4,0.6,2.6,1.4,3.8,2.5l0,0
				c1.1,1.1,1.9,2.4,2.5,3.8c0.6,1.4,0.8,2.8,0.8,4.3c0,1.5-0.3,2.9-0.8,4.3c-0.6,1.4-1.4,2.6-2.5,3.8L65.1,50.5v0
				c-1.1,1.1-2.4,1.9-3.8,2.5c-1.4,0.6-2.8,0.8-4.3,0.8c-1.5,0-2.9-0.3-4.3-0.8c-1.4-0.6-2.6-1.4-3.8-2.5c-2.1-2.1-5.6-2.1-7.8,0
				s-2.1,5.6,0,7.8c2.2,2.2,4.7,3.8,7.4,4.9c2.7,1.1,5.6,1.6,8.4,1.6c2.9,0,5.7-0.5,8.4-1.6c2.7-1.1,5.2-2.7,7.4-4.9l0,0L92,39.1l0,0
				c2.2-2.2,3.8-4.7,4.9-7.4c1.1-2.7,1.6-5.6,1.6-8.4c0-2.9-0.5-5.7-1.6-8.4c-1.1-2.7-2.7-5.2-4.9-7.4l0,0c-2.2-2.2-4.7-3.8-7.4-4.9
				c-2.7-1.1-5.6-1.6-8.4-1.6c-2.9,0-5.7,0.5-8.4,1.6c-2.7,1.1-5.2,2.7-7.4,4.9L42.8,25c-2.1,2.1-2.1,5.6,0,7.8S48.5,34.9,50.6,32.8z"
      />
      <path
        class="fill"
        d="M50.2,67.4L32.7,84.9l0,0c-1.1,1.1-2.4,1.9-3.8,2.5c-1.4,0.6-2.8,0.8-4.3,0.8c-1.5,0-2.9-0.3-4.3-0.8
				c-1.4-0.6-2.6-1.4-3.8-2.5l0,0c-1.1-1.1-1.9-2.4-2.5-3.8c-0.6-1.4-0.8-2.8-0.8-4.3c0-1.5,0.3-2.9,0.8-4.3c0.6-1.4,1.4-2.6,2.5-3.8
				l0,0l19.1-19.1c1.1-1.1,2.4-1.9,3.8-2.5c1.4-0.6,2.8-0.8,4.3-0.8c1.5,0,2.9,0.3,4.3,0.8c1.4,0.6,2.6,1.4,3.8,2.5
				c2.1,2.1,5.6,2.1,7.8,0c2.1-2.1,2.1-5.6,0-7.8c-2.2-2.2-4.7-3.8-7.4-4.9c-2.7-1.1-5.6-1.6-8.4-1.6c-2.9,0-5.7,0.5-8.4,1.6
				c-2.7,1.1-5.2,2.7-7.4,4.9L8.8,61l0,0c-2.2,2.2-3.8,4.7-4.9,7.4c-1.1,2.7-1.6,5.6-1.6,8.4c0,2.9,0.5,5.7,1.6,8.4
				C5,88,6.6,90.5,8.8,92.7l0,0c2.2,2.2,4.7,3.8,7.4,4.9c2.7,1.1,5.6,1.6,8.4,1.6s5.7-0.5,8.4-1.6c2.7-1.1,5.2-2.7,7.4-4.9L58,75.2
				c2.1-2.1,2.1-5.6,0-7.8S52.4,65.3,50.2,67.4z"
      />
    </svg>

    <svg
      v-if="name==='cart'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        class="fill"
        d="M30.1,30.4c-0.5-1.7-0.9-3.3-1.2-4.4c-1.1-3.7-2.7-6.8-4.9-9.1c-1.1-1.1-2.4-2.1-3.9-2.7c-1.4-0.6-3-1-4.6-1
	c-2.1,0-4.2,0.6-6,1.6c-1.9,1-3.6,2.5-5.2,4.3c-1.5,1.7-1.3,4.2,0.4,5.7c1.7,1.5,4.2,1.3,5.7-0.4c1.1-1.2,2.1-2,3-2.5
	c0.9-0.5,1.6-0.6,2.2-0.6c0.5,0,0.9,0.1,1.3,0.3c0.7,0.3,1.4,0.9,2.2,2c0.8,1.1,1.6,2.6,2.1,4.7c1.5,5.3,4.8,17.2,7.7,27.6
	c1.4,5.2,2.8,10.1,3.8,13.7c0.1,0.2,0.1,0.4,0.2,0.6c-1.1-0.5-2.4-0.8-3.7-0.8c-5,0-9.1,4.1-9.1,9.1c0,5,4.1,9.1,9.1,9.1
	c5,0,9.1-4.1,9.1-9.1c0,0,0,0,0,0h34.9c0,0,0,0,0,0c0,5,4.1,9.1,9.1,9.1c5,0,9.1-4.1,9.1-9.1c0-5-4.1-9.1-9.1-9.1
	c-1.5,0-2.8,0.4-4,1H41.1c-0.3-1-0.6-2.2-1-3.6c10.2-2.1,40.3-8.3,45-9.3c5.7-1.2,10.9-8,11.5-13.9c0.6-5.9,1.4-13,1.4-13H30.1z"
      />
    </svg>

    <svg
      v-if="name==='plus'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <rect x="43.5" class="fill" width="13.1" height="100"/>
      <rect x="0" y="43.5" class="fill" width="100" height="13.1"/>
    </svg>

    <svg
      v-if="name==='x'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        class="fill"
        d="M59.4,50.5l37.7-37.7c2.5-2.5,2.5-6.7,0-9.2c-2.5-2.5-6.7-2.5-9.2,0L50.2,41.3L12.6,3.7c-2.5-2.5-6.7-2.5-9.2,0
	s-2.5,6.7,0,9.2l37.7,37.7L3.4,88.2c-2.5,2.5-2.5,6.7,0,9.2c2.5,2.5,6.7,2.5,9.2,0l37.7-37.7l37.7,37.7c2.5,2.5,6.7,2.5,9.2,0
	c2.5-2.5,2.5-6.7,0-9.2L59.4,50.5z"
      />
    </svg>

    <svg
      v-if="name==='chevron-arrow'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        class="fill"
        d="M96.9,45.9L69.6,19.5c-1.9-1.9-5-1.8-6.9,0.1c-1.9,1.9-1.8,5,0.1,6.9l18.9,18.3H7.6c-2.6,0-4.7,2.1-4.7,4.7s2.1,4.7,4.7,4.7
        H82L62.7,74.2c-1.9,1.9-1.8,5,0.1,6.9c1.9,1.9,5,1.8,6.9-0.1L97,52.8c0.9-0.9,1.4-2.2,1.4-3.5C98.4,48,97.8,46.8,96.9,45.9z"
      />
    </svg>

    <svg
      v-if="name==='magnifying-glass'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        class="fill"
        d="M97.7,87.8L79.6,69.6c4.5-6.8,7.1-14.9,7.1-23.6c0-5.9-1.2-11.6-3.4-16.7c-3.3-7.7-8.7-14.3-15.6-18.9
	c-6.9-4.6-15.1-7.3-24-7.3c-5.9,0-11.6,1.2-16.7,3.4C19.2,9.7,12.7,15.2,8,22c-4.6,6.8-7.3,15.1-7.3,24c0,5.9,1.2,11.6,3.4,16.7
	c3.3,7.7,8.7,14.3,15.6,18.9c6.8,4.6,15.1,7.3,24,7.3c5.9,0,11.6-1.2,16.7-3.4c4.5-1.9,8.7-4.6,12.3-7.9l17.6,17.6
	c2.1,2.1,5.4,2.1,7.5,0C99.8,93.3,99.8,89.9,97.7,87.8z M61.7,72.9c-5.2,3.5-11.4,5.5-18.1,5.5c-4.5,0-8.7-0.9-12.6-2.5
	c-5.8-2.4-10.7-6.6-14.2-11.7C13.4,59,11.3,52.8,11.3,46c0-4.5,0.9-8.7,2.5-12.6c2.4-5.8,6.6-10.7,11.7-14.2
	c5.2-3.5,11.4-5.5,18.1-5.5c4.5,0,8.7,0.9,12.6,2.5C62,18.7,67,22.8,70.5,28C73.9,33.1,76,39.3,76,46c0,4.5-0.9,8.7-2.5,12.6
	C71,64.4,66.9,69.4,61.7,72.9z"
      />
    </svg>

    <svg
      v-if="name==='selfie'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <circle
        class="fill"
        cx="49.5"
        cy="37.7"
        r="20.3"
      />
      <path
        class="fill"
        d="M85,15C76.1,6,63.7,0.5,50,0.5C36.3,0.5,23.9,6,15,15C6,23.9,0.5,36.3,0.5,50C0.5,63.7,6,76.1,15,85
		c8.9,9,21.3,14.5,35,14.5c13.7,0,26.1-5.5,35-14.5c8.9-8.9,14.5-21.3,14.5-35C99.5,36.3,94,23.9,85,15z M49.5,63.8
		c-11.5,0-22.1,3.7-30.7,10c-5-6.6-8-14.8-8-23.8c0-10.8,4.4-20.6,11.5-27.7c7.1-7.1,16.9-11.5,27.7-11.5c10.8,0,20.6,4.4,27.7,11.5
		c7.1,7.1,11.5,16.9,11.5,27.7c0,9.2-3.1,17.5-8.4,24.2C72.1,67.7,61.3,63.8,49.5,63.8z"
      />
    </svg>
    <svg v-if="name==='trash'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" id="footer-sample-full" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16" class="iconify iconify--bi"><g fill="currentColor"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path></g></svg>
    <svg v-if="name==='fire'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" id="footer-sample-full" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024" class="iconify iconify--ant-design"><path d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8c-1.4 1.5-3 1.9-4.1 2c-1.1.1-2.8-.1-4.3-1.5c-1.4-1.2-2.1-3-2-4.8c3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9c-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 0 1-47.5 46.1a352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9z" fill="currentColor"></path></svg>
    <svg v-if="name==='shirt'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" id="footer-icon-name" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path d="M245.398 61.3L195.97 33.053l-.06-.03a7.978 7.978 0 0 0-.486-.247c-.078-.037-.154-.077-.232-.111c-.15-.065-.304-.12-.457-.176c-.1-.037-.198-.077-.297-.11c-.12-.037-.243-.066-.365-.1c-.139-.037-.277-.077-.416-.106c-.086-.018-.175-.03-.263-.045a7.978 7.978 0 0 0-.533-.081c-.07-.008-.142-.01-.213-.015a7.935 7.935 0 0 0-.59-.03c-.019 0-.037-.003-.057-.003h-32a8 8 0 0 0-8 8a24 24 0 0 1-48 0a8 8 0 0 0-8-8H64c-.026 0-.05.004-.076.004a7.921 7.921 0 0 0-.505.025c-.098.007-.197.01-.294.021c-.151.017-.302.044-.453.07c-.114.018-.228.033-.34.057c-.118.025-.233.06-.35.09c-.143.037-.287.072-.427.117c-.086.027-.17.062-.254.093c-.168.06-.334.12-.496.19c-.073.032-.144.07-.216.105c-.169.08-.337.161-.499.252l-.06.03L10.602 61.3A16.008 16.008 0 0 0 4.23 82.347l18.404 36.808A15.912 15.912 0 0 0 36.944 128H56v80a16.018 16.018 0 0 0 16 16h112a16.018 16.018 0 0 0 16-16v-80h19.056a15.911 15.911 0 0 0 14.31-8.845l18.405-36.809a16.008 16.008 0 0 0-6.373-21.047zM36.944 112L18.54 75.19L56 53.786V112zM184 208H72V48h16.804a40.005 40.005 0 0 0 78.392 0H184zm35.056-96H200V53.785l37.46 21.406z" fill="currentColor"></path></svg>
    <svg v-if="name==='shirt-filled'" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tshirt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-tshirt fa-w-20 fa-2x"><path fill="currentColor" d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z" class=""></path></svg>
    <svg v-if="name==='truck'" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="truck" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" ><path fill="currentColor" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z" class=""></path></svg>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
/* eslint max-len: "off" */
export default Vue.extend({
  props: {
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    classes () {
      const classes = {
        'icon-svg': true,
        icon: true
      }
      classes[this.name] = true
      return classes
    }
  }
})
</script>
<style scoped lang="less">

	.icon-svg{
		display: inline-block;
		vertical-align: middle;
    color: inherit;
    height: 1em;
    width: 1em;
		&.rotate, &.rotate-180{
			transform: rotate(180deg);
		}
		&.rotate-45{
			transform: rotate(45deg);
		}
		svg{
			vertical-align: super;
		}
    &.inline {
      height: 1em;
      width: 1em;
    }
    &.x2{
      height: 2em;
      width: 2em;
    }
    &.x3{
      height: 3em;
      width: 3em;
    }
    &.x4{
      height: 4em;
      width: 4em;
    }
    &.x5{
      height: 5em;
      width: 5em;
    }
    &.x6{
      height: 6em;
      width: 6em;
    }
	}

	.fill, .st0 {
		fill: currentColor;
	}
	.stroke {
		fill: transparent;
		stroke: currentColor;
		stroke-linecap:round;
		stroke-linejoin:round;
		stroke-miterlimit:10;
	}
	.icon-accent {
		fill: transparent;
	}
	.path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 0;
		&.circle {
			fill: transparent;
			stroke: green;
			-webkit-animation: dash .9s ease-in-out;
			animation: dash .9s ease-in-out;
		}
		&.line {
			fill: transparent;
			stroke: green;
			stroke-dashoffset: 1000;
			-webkit-animation: dash .9s .35s ease-in-out forwards;
			animation: dash .9s .35s ease-in-out forwards;
		}
		&.check {
			fill: transparent;
			stroke: green;
			stroke-dashoffset: -100;
			-webkit-animation: dash-check .9s .35s ease-in-out forwards;
			animation: dash-check .9s .35s ease-in-out forwards;
		}
	}

  .google{
    .st0{fill:#EB4535;}
    .st1{fill:#557EBF;}
    .st2{fill:#F9BC15;}
    .st3{fill:#36A852;}
  }
  .instagram .fill {
    fill: url(#rg)
  }
	@-webkit-keyframes dash {
		0% {
			stroke-dashoffset: 1000;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}
	@keyframes dash {
		0% {
			stroke-dashoffset: 1000;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}
	@-webkit-keyframes dash-check {
		0% {
			stroke-dashoffset: -100;
		}
		100% {
			stroke-dashoffset: 900;
		}
	}
	@keyframes dash-check {
		0% {
			stroke-dashoffset: -100;
		}
		100% {
			stroke-dashoffset: 900;
		}
	}

</style>

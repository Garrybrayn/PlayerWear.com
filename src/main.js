import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import Utilities from './utilities';

if(process.client){
  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function(newNode, referenceNode) {
    try {
      return insertBefore.bind(this)(newNode, referenceNode);
    } catch(e) {
      console.error(`Insert Error: ${e}`);
    }
  }
}

Vue.config.productionTip = false;

Vue.mixin({
  data(){
    return {
      isSrr: false
    }
  },
  watch: {
    '$route':{
      immediate: true,
      handler(to, from){
        // coming from nowhere.
        // That means this is the initial route
        // which means it was rendered on the server
        this.isSsr = to && !from;
      }
    }
  },
  methods: {
    assetUrl: Utilities.assetUrl,
    tagReadable: Utilities.tagReadable,
    tagify: Utilities.tagify,
    escape: Utilities.escape,
    arrayShuffle: Utilities.arrayShuffle,
    isDesktop: () => {
      if(process.server){
        return false;
      }else{
        return window.innerWidth > 600
      }
    },
  }
})

export async function createApp ({beforeApp = () => {}, afterApp = () => {}} = {}) {
  const store = createStore()
  const router = createRouter(store)
  await beforeApp({ router, store, })
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })
  const result = {
    app,
    router,
    store,
  }
  await afterApp(result)
  return result
}

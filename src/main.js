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
  methods: {
    assetUrl: Utilities.assetUrl,
    tagReadable: Utilities.tagReadable,
    tagify: Utilities.tagify,
    escape: Utilities.escape,
    arrayShuffle: Utilities.arrayShuffle,
    isDesktop: () => {
      if(process.client){
        window.innerWidth > 600
      }else{
        return true;
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

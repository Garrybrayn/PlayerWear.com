import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Utilities from './utilities';

const insertBefore = Node.prototype.insertBefore;
Node.prototype.insertBefore = function(newNode, referenceNode) {
  try {
    return insertBefore.bind(this)(newNode, referenceNode);
  } catch(e) {
    console.error(`Insert Error: ${e}`);
  }
}

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    assetUrl: Utilities.assetUrl,
    tagReadable: Utilities.tagReadable,
    tagify: Utilities.tagify,
    escape: Utilities.escape,
    arrayShuffle: Utilities.arrayShuffle
  }
})

window.playerwear = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#vue-app');

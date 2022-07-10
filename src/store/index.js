import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import ModPlay from './play'
import ModSession from './session'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    session: ModSession,
    play: ModPlay
  },
  plugins: [
    vuexLocal.plugin
  ],
})

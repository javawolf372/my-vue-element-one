import Vue from 'vue'
import Vuex from 'vuex'
import common from '@/store/modules/common'
import demo from '@/store/modules/demo'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    demo
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})

export default store

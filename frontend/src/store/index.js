import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.js'
import transactions from './transactions.js'
import spending from './spending.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
   auth,
   transactions,
   spending,
  }
})

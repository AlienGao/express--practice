import Vue from "vue";
import Vuex from "vuex";
export const STORE_TOKEN = 'STORE_TOKEN'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    [STORE_TOKEN](state, payload) {
      state.token = payload
    }
  },
  actions: {
    storeToken({ commit }, products) {
      console.log(products, 'products')
      commit('STORE', products)
    }
  },
  modules: {},
});

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: "",
    reqAllFilms: true,
    reqPopular: false,
  },

  getters: {
    search(state) {
      return state.search;
    },
    reqAllFilms(state) {
      return state.reqAllFilms;
    },
    reqPopular(state) {
      return state.reqPopular;
    },
  },

  mutations: {
    setSearch(state, item) {
      state.search = item;
    },
    setReqAllFilms(state, item) {
      state.reqAllFilms = item;
    },
    setReqPopular(state, item) {
      state.reqPopular = item;
    },
  },
  actions: {
  },
})

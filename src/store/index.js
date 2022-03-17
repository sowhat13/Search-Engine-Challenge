import { createStore } from "vuex";

export default createStore({
  state: {
    searchResultPage: 1,
  },
  mutations: {
    UPDATE_SEARCH_RESULT_PAGE(state, value) {
      state.searchResultPage = value;
    },
  },
  actions: {
    updateSearchResultPage({ commit }, value) {
      commit("UPDATE_SEARCH_RESULT_PAGE", value);
    },
  },
  modules: {},
});

const getters = {
  preloader: state => state.preloader,
};

const actions = {
  setPreloader({ commit }, preloader) {
    commit('receivePreloader', preloader);
  },
};

const state = {
  preloader: true,
};

const mutations = {
  receivePreloader(State, preloader) {
    state.preloader = preloader;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

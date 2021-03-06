import Vue from 'vue';

const getters = {
  categories: state => state.categories,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getCategories({ commit, rootState }, catalogId) {
    commit('receiveStatus', 'on-request');
    Vue.http.get(`http://admin.pasabahcecatalogues.com/api/${rootState.lang.lang.url}/${catalogId}/categories`).then((response) => {
      const Response = response;
      commit('receiveCategories', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveCategories', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  categories: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveCategories(State, categories) {
    state.categories = categories;
  },
  receiveStatus(State, status) {
    state.status = status;
  },
  receiveResponse(State, response) {
    state.response = response;
  },
  receiveReset(State) {
    const innerState = State;
    innerState.categories = {};
    innerState.status = 'non-request';
    innerState.response = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

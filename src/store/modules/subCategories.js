import Vue from 'vue';

const getters = {
  subCategories: state => state.subCategories,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getSubCategories({ commit, rootState }, categoryId) {
    commit('receiveStatus', 'on-request');
    Vue.http.get(`http://admin.pasabahcecatalogues.com/api/${rootState.lang.lang.url}/${categoryId}/subCategories`).then((response) => {
      const Response = response;
      commit('receiveSubCategories', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveSubCategories', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  subCategories: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveSubCategories(State, subCategories) {
    state.subCategories = subCategories;
  },
  receiveStatus(State, status) {
    state.status = status;
  },
  receiveResponse(State, response) {
    state.response = response;
  },
  receiveReset(State) {
    const innerState = State;
    innerState.subCategories = {};
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

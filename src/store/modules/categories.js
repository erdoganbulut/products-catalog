import Vue from 'vue';

const getters = {
  categories: state => state.categories,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getCategories({ commit }, catalogId) {
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/en/${catalogId}/categories`).then((response) => {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import Vue from 'vue';

const getters = {
  subCategories: state => state.subCategories,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getSubCategories({ commit }, categoryId) {
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/en/${categoryId}/subCategories`).then((response) => {
      const Response = response;
      if (typeof val !== 'undefined') Response.body = window.$lodash.filter(JSON.parse(JSON.stringify(Response.body)), { categorieId: parseInt(val, 10) });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

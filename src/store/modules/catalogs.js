import Vue from 'vue';

const getters = {
  catalogs: state => state.catalogs,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getCatalog({ commit, rootState }) {
    commit('receiveStatus', 'on-request');
    Vue.http.get(`http://admin.pasabahcecatalogues.com/api/${rootState.lang.lang.url}/Catalogs`).then((response) => {
      const Response = response;
      commit('receiveCatalogs', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveCatalogs', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
};

const state = {
  catalogs: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveCatalogs(State, catalogs) {
    state.catalogs = catalogs;
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

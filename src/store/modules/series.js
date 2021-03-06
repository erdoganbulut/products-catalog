import Vue from 'vue';

const getters = {
  series: state => state.series,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getSeries({ commit, rootState }, subCategoryId) {
    Vue.http.get(`http://admin.pasabahcecatalogues.com/api/${rootState.lang.lang.url}/${subCategoryId}/series`).then((response) => {
      const Response = response;
      commit('receiveSeries', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveSeries', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
  resetSeries({ commit }) {
    commit('receiveReset');
  },
};

const state = {
  series: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveSeries(State, series) {
    state.series = series;
  },
  receiveStatus(State, status) {
    state.status = status;
  },
  receiveResponse(State, response) {
    state.response = response;
  },
  receiveReset(State) {
    const innerState = State;
    innerState.series = {};
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

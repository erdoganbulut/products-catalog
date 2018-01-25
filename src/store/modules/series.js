import Vue from 'vue';

const getters = {
  series: state => state.series,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getSeries({ commit, rootState }, subCategoryId) {
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/${rootState.lang.lang.url}/${subCategoryId}/series`).then((response) => {
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
    state.series = {};
    state.status = 'non-request';
    state.response = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

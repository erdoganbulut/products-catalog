import Vue from 'vue';

const getters = {
  series: state => state.series,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getSeries({ commit }) {
    Vue.http.get('http://5a404fa1d033de001230a4a3.mockapi.io/series').then((response) => {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import Vue from 'vue';

const getters = {
  functions: state => state.functions,
  functionsAll: state => state.functionsAll,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getFunctions({ commit, rootState }, subCategoryId) {
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/${rootState.lang.lang.url}/${subCategoryId}/functions`).then((response) => {
      const Response = response;
      commit('receiveFunctionsAll', Response.body);
      commit('receiveFunctions', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveFunctionsAll', {});
      commit('receiveFunctions', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
  resetFunctions({ commit }) {
    commit('receiveReset');
  },
};

const state = {
  functions: {},
  functionsAll: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveFunctionsAll(State, functionsAll) {
    state.functionsAll = functionsAll;
  },
  receiveFunctions(State, functions) {
    state.functions = functions;
  },
  receiveStatus(State, status) {
    state.status = status;
  },
  receiveResponse(State, response) {
    state.response = response;
  },
  receiveReset(State) {
    state.functions = {};
    state.functionsAll = {};
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

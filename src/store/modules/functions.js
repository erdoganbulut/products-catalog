import Vue from 'vue';

const filterFunctions2selectedSubCats = (arr, subCats) => {
  let Arr = JSON.parse(JSON.stringify(arr));
  Arr = window.$lodash.filter(Arr, (o) => {
    return subCats.indexOf(o.subCategoryId.toString()) >= 0
  });
  return Arr;
};

const getters = {
  functions: state => state.functions,
  functionsAll: state => state.functionsAll,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getFunctions({ commit }) {
    Vue.http.get('http://5a404fa1d033de001230a4a3.mockapi.io/functions').then((response) => {
      const Response = response;
      commit('receiveFunctionsAll', Response.body);
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveFunctionsAll', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
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
  receiveFunctions(State, subCats) {
    state.functions = filterFunctions2selectedSubCats(state.functionsAll, subCats);
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

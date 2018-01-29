import Vue from 'vue';

const getters = {
  inners: state => state.inners,
  innersAll: state => state.innersAll,
  status: state => state.status,
  response: state => state.response,
};

const actions = {
  getInners({ commit, rootState }, subCategoryId) {
    commit('receiveStatus', 'on-request');
    Vue.http.get(`http://bline.digital/pasabahce2018/Backend/public/api/${rootState.lang.lang.url}/${subCategoryId}/innertypes`).then((response) => {
      const Response = response;
      commit('receiveInnersAll', window.$lodash.orderBy(Response.body, ['name']));
      commit('receiveInners', window.$lodash.orderBy(Response.body, ['name']));
      commit('receiveStatus', 'done');
      commit('receiveResponse', Response);
    }, (response) => {
      const Response = response;
      commit('receiveInnersAll', {});
      commit('receiveInners', {});
      commit('receiveStatus', 'error');
      commit('receiveResponse', Response);
    });
  },
  resetFunctions({ commit }) {
    commit('receiveReset');
  },
};

const state = {
  inners: {},
  innersAll: {},
  status: 'non-request',
  response: {},
};

const mutations = {
  receiveInnersAll(State, innersAll) {
    state.innersAll = innersAll;
  },
  receiveInners(State, inners) {
    state.inners = inners;
  },
  receiveStatus(State, status) {
    state.status = status;
  },
  receiveResponse(State, response) {
    state.response = response;
  },
  receiveReset(State) {
    state.inners = {};
    state.innersAll = {};
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

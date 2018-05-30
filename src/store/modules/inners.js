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
    Vue.http.get(`http://admin.pasabahcecatalogues.com/api/${rootState.lang.lang.url}/${subCategoryId}/innertypes`).then((response) => {
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
    const innerState = State;
    innerState.inners = {};
    innerState.innersAll = {};
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
